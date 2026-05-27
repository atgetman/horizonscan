import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { 
  CheckCircle, 
  Code,
  FileCode,
  ArrowRight,
  AlertCircle,
  Eye,
  StepForward,
  Send,
  Loader2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowUp,
  Paperclip
} from 'lucide-react';
import { PromptInput } from '../components/PromptInput';
import { WorkflowPhases } from '../components/WorkflowPhases';
import { ChatInterfaceView } from '../components/ChatInterfaceView';

// Supabase backend not connected
const projectId = 'mock-project-id';
const publicAnonKey = 'mock-anon-key';

// Helper function to generate document category labels
function generateDocumentCategory(title: string, content: string): string {
  const titleLower = title.toLowerCase();
  const contentPreview = content.substring(0, 500).toLowerCase();
  
  // Check for specific document types
  if (titleLower.includes('contract') || contentPreview.includes('parties agree') || contentPreview.includes('whereas')) {
    return 'Contract Draft';
  } else if (titleLower.includes('memo') || titleLower.includes('memorandum')) {
    return 'Memo Draft';
  } else if (titleLower.includes('brief') || titleLower.includes('motion')) {
    return 'Brief Draft';
  } else if (titleLower.includes('letter')) {
    return 'Letter Draft';
  } else if (titleLower.includes('agreement')) {
    return 'Agreement Draft';
  } else if (titleLower.includes('policy') || titleLower.includes('procedure')) {
    return 'Policy Draft';
  } else if (titleLower.includes('analysis') || titleLower.includes('report')) {
    return 'Analysis Draft';
  } else if (titleLower.includes('opinion')) {
    return 'Opinion Draft';
  } else if (titleLower.includes('outline') || titleLower.includes('summary')) {
    return 'Document Draft';
  } else if (titleLower.includes('discovery') || titleLower.includes('interrogator')) {
    return 'Discovery Draft';
  } else if (titleLower.includes('complaint') || titleLower.includes('petition')) {
    return 'Pleading Draft';
  } else {
    // Default category
    return 'Document Draft';
  }
}

export function DeveloperGuide() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on current route
  const activeTab: 'checklist' | 'api-test' = location.pathname === '/api-testing' ? 'api-test' : 'checklist';
  
  const [prompt, setPrompt] = useState('create a document about minnesota legal best practices for data privacy policies. give me simple answer in document backed by some research');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestExpanded, setRequestExpanded] = useState(false);
  const [configExpanded, setConfigExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'api' | 'chat'>('api');
  const [lastRequest, setLastRequest] = useState<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
  } | null>(null);
  
  // Separate API call tracking for ChatGPT and CoCounsel
  const [chatGPTRequest, setChatGPTRequest] = useState<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
  } | null>(null);
  const [chatGPTResponse, setChatGPTResponse] = useState<string>('');
  const [chatGPTExpanded, setChatGPTExpanded] = useState(false);
  
  const [cocounselRequest, setCocounselRequest] = useState<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
  } | null>(null);
  const [cocounselResponse, setCocounselResponse] = useState<string>('');
  const [cocounselExpanded, setCocounselExpanded] = useState(false);

  // Default ID Token - can be updated via UI, persisted to localStorage
  const [idToken, setIdToken] = useState(() => {
    const saved = localStorage.getItem('cocounsel_id_token');
    return saved || "";
  });
  const [agentId, setAgentId] = useState("coco_next_rev_a");

  // API mode selection: 'cocounsel' or 'hybrid' or 'chatgpt' - persisted to localStorage
  const [apiMode, setApiMode] = useState<'cocounsel' | 'hybrid' | 'chatgpt'>(() => {
    const saved = localStorage.getItem('cocounsel_api_mode');
    return (saved === 'hybrid' || saved === 'cocounsel' || saved === 'chatgpt') ? saved : 'cocounsel';
  });

  // Save API mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cocounsel_api_mode', apiMode);
  }, [apiMode]);

  // Chat interface state
  const [userMessage, setUserMessage] = useState('');
  const [thinkingContent, setThinkingContent] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [reasoningExpanded, setReasoningExpanded] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string>('');
  const [inputRequest, setInputRequest] = useState<{
    prompt: string;
    inputType: 'text' | 'multichoice' | 'confirmation' | 'choice';
    elicitationId: string;
    choices?: string[];
    context?: string;
  } | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [artifacts, setArtifacts] = useState<Array<{
    artifactId: string;
    title: string;
    content: string;
    artifactType: string;
  }>>([]);
  const [resources, setResources] = useState<Array<{
    websiteTitle: string;
    resourceTitle: string;
    url: string;
  }>>([]);
  const [prepWork, setPrepWork] = useState<Array<{
    title: string;
    type: 'outline' | 'analysis' | 'research' | 'comparison' | 'checklist';
  }>>([]);
  const [showSearching, setShowSearching] = useState(false);
  const [showPreparing, setShowPreparing] = useState(false);
  const [showCompiling, setShowCompiling] = useState(false);
  const [searchingExpanded, setSearchingExpanded] = useState(false);
  const [preparingExpanded, setPreparingExpanded] = useState(false);

  // Utility function to parse and extract resources from thinking content
  const parseResources = (content: string) => {
    const resourcesMatch = content.match(/<<<RESOURCES_START>>>([\s\S]*?)<<<RESOURCES_END>>>/);
    if (resourcesMatch) {
      try {
        console.log('Found resources block:', resourcesMatch[1]);
        // Clean up the JSON string - remove any trailing commas and fix common issues
        let jsonString = resourcesMatch[1].trim();
        // Remove trailing commas before closing brackets/braces
        jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');
        console.log('Cleaned JSON string:', jsonString);
        const parsed = JSON.parse(jsonString);
        console.log('Parsed resources:', parsed);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse resources:', e);
        console.error('Raw content was:', resourcesMatch[1]);
        // Try to extract individual objects if array parsing failed
        try {
          const objectMatches = resourcesMatch[1].matchAll(/\{[^}]+\}/g);
          const resources = [];
          for (const match of objectMatches) {
            try {
              const obj = JSON.parse(match[0].replace(/,(\s*\})/g, '$1'));
              resources.push(obj);
            } catch (innerE) {
              // Skip malformed objects
            }
          }
          if (resources.length > 0) {
            console.log('Recovered resources via fallback:', resources);
            return resources;
          }
        } catch (fallbackE) {
          console.error('Fallback parsing also failed:', fallbackE);
        }
      }
    }
    return [];
  };

  // Utility function to parse and extract prep work from thinking content
  const parsePrepWork = (content: string) => {
    const prepWorkMatch = content.match(/<<<PREP_WORK_START>>>([\s\S]*?)<<<PREP_WORK_END>>>/);
    if (prepWorkMatch) {
      try {
        console.log('Found prep work block:', prepWorkMatch[1]);
        // Clean up the JSON string - remove any trailing commas and fix common issues
        let jsonString = prepWorkMatch[1].trim();
        // Remove trailing commas before closing brackets/braces
        jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');
        console.log('Cleaned JSON string:', jsonString);
        const parsed = JSON.parse(jsonString);
        console.log('Parsed prep work:', parsed);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse prep work:', e);
        console.error('Raw content was:', prepWorkMatch[1]);
        // Try to extract individual objects if array parsing failed
        try {
          const objectMatches = prepWorkMatch[1].matchAll(/\{[^}]+\}/g);
          const prepItems = [];
          for (const match of objectMatches) {
            try {
              const obj = JSON.parse(match[0].replace(/,(\s*\})/g, '$1'));
              prepItems.push(obj);
            } catch (innerE) {
              // Skip malformed objects
            }
          }
          if (prepItems.length > 0) {
            console.log('Recovered prep work via fallback:', prepItems);
            return prepItems;
          }
        } catch (fallbackE) {
          console.error('Fallback parsing also failed:', fallbackE);
        }
      }
    }
    return [];
  };

  // Utility function to strip markers from thinking content for display
  const stripMarkers = (content: string) => {
    return content
      .replace(/<<<RESOURCES_START>>>[\s\S]*?<<<RESOURCES_END>>>/g, '')
      .replace(/<<<PREP_WORK_START>>>[\s\S]*?<<<PREP_WORK_END>>>/g, '')
      .replace(/---SYSTEM INSTRUCTIONS[\s\S]*?<<<PREP_WORK_END>>>/g, '')
      .trim();
  };

  // Create a new conversation
  const createConversation = async (): Promise<string> => {
    const url = 'https://codeagt-api-qa.28686.aws.thomsonreuters.com/conversations';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    };
    
    const body = JSON.stringify({ 
      name: 'API Test Chat',
      agent_id: agentId
    });

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create conversation: ${res.status} ${res.statusText}\n${errorText}`);
    }

    const data = await res.json();
    console.log('Created conversation:', data);
    
    // Extract conversation ID from response
    const conversationId = data.id || data.conversation_id || data.conversationId;
    if (!conversationId) {
      throw new Error('No conversation ID returned from API');
    }
    
    return conversationId;
  };

  // Call ChatGPT to get understanding + plan (via backend)
  const callChatGPT = async (userPrompt: string): Promise<{ understanding: string; plan: string }> => {
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };
    const bodyData = {
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are CoCounsel, an expert legal AI assistant. Your job is to provide IMMEDIATE, DETAILED understanding confirmation - NOT to complete the task.

CRITICAL: Do NOT research, analyze, draft, or complete the user's request in any way. Only demonstrate deep comprehension.

Your response must show that you immediately grasp:
1. The core legal issue or objective
2. Key considerations and potential challenges
3. The specific deliverable format expected
4. Any jurisdiction, parties, or context mentioned
5. How you would systematically approach this work

Write like you're thinking out loud, showing your legal expertise and strategic thinking. Be thorough and confident.

Example style (for "Draft a motion to dismiss for lack of personal jurisdiction"):
"I understand you need a motion to dismiss challenging personal jurisdiction. This requires establishing that the defendant lacks sufficient minimum contacts with the forum state under International Shoe and its progeny. I'll need to analyze whether general or specific jurisdiction applies, examine the defendant's contacts with the forum, and apply the constitutional due process framework.

I'll approach this by:
1. First, I'll research the controlling case law on personal jurisdiction in your jurisdiction
2. Analyze the specific facts regarding the defendant's contacts with the forum state
3. Draft the legal standard section covering constitutional requirements and jurisdictional analysis
4. Build the argument showing insufficient contacts under both general and specific jurisdiction tests
5. Prepare supporting declarations if needed and format according to local rules"

Format as JSON:
{
  "understanding": "2-3 sentences showing deep grasp of the legal issue, deliverable, and key considerations",
  "plan": "4-5 focused steps explaining your systematic approach with legal reasoning (only use more steps if the task is highly complex). Format as a proper markdown numbered list with line breaks between items."
}`
        },
        {
          role: 'user',
          content: userPrompt
        }
      ]
    };
    
    // Store request details
    setChatGPTRequest({
      url,
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData)
    });
    setChatGPTExpanded(true); // Auto-expand when new request comes in
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error(`ChatGPT API error: ${response.status}`);
    }

    // Handle streaming response - accumulate all chunks
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
    }
    
    console.log('ChatGPT full response:', fullText);
    
    // Store response
    setChatGPTResponse(fullText);
    
    try {
      const parsed = JSON.parse(fullText);
      return {
        understanding: parsed.understanding || '',
        plan: parsed.plan || ''
      };
    } catch (e) {
      console.error('Failed to parse ChatGPT response as JSON:', e);
      // Fallback - try to extract understanding and plan from text
      return {
        understanding: 'I understand your request and will proceed with the analysis.',
        plan: 'I will systematically work through this task to provide you with the requested deliverable.'
      };
    }
  };

  // ChatGPT Full Workflow - simulates all 4 phases using ChatGPT
  // This provides the same UX as CoCounsel but using only ChatGPT API calls:
  // 1. Thinking: Understanding + plan
  // 2. Searching: Research sources (Westlaw, Practical Law, etc.)
  // 3. Preparing: Preliminary materials/prep work
  // 4. Final: Brief summary + artifact card with deliverable
  const handleChatGPTFullWorkflow = async (text: string) => {
    // Phase 1: Thinking (Understanding + Plan)
    const { understanding, plan } = await callChatGPT(text);
    setThinkingContent(`${understanding}\n\nPlan:\n${plan}`);
    setShowReasoning(true);
    setReasoningExpanded(true);
    setIsThinking(false);
    
    // Small delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Phase 2: Searching for resources
    setShowSearching(true);
    setSearchingExpanded(true);
    
    const resourcesPrompt = `Based on this legal task: "${text}"

Generate 8-12 realistic legal research sources that would be used for this task. Focus on:
- Westlaw (case law, statutes, secondary sources)
- Practical Law (practice notes, checklists, standard documents)
- Government websites (SEC, state bar, court websites)
- Reputable legal publishers

Format as JSON array:
[
  {"websiteTitle": "Westlaw", "resourceTitle": "...", "url": "https://..."},
  ...
]`;

    const resourcesResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are a legal research assistant. Generate realistic legal research sources. Return ONLY a JSON object with a "resources" array.'
          },
          {
            role: 'user',
            content: resourcesPrompt
          }
        ]
      })
    });

    if (!resourcesResponse.ok) {
      const errorText = await resourcesResponse.text().catch(() => 'Unknown error');
      console.error('Resources API error:', resourcesResponse.status, errorText);
      throw new Error(`Failed to fetch resources: ${resourcesResponse.status} ${errorText}`);
    }

    if (resourcesResponse.ok) {
      const reader = resourcesResponse.body?.getReader();
      const decoder = new TextDecoder();
      let resourceText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          resourceText += decoder.decode(value, { stream: true });
        }
      }
      
      try {
        const parsed = JSON.parse(resourceText);
        const resourcesData = parsed.resources || [];
        setResources(resourcesData);
        setReasoningExpanded(false); // Collapse reasoning when search results are ready
      } catch (e) {
        console.error('Failed to parse resources:', e);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Phase 3: Preliminary materials
    setShowPreparing(true);
    setPreparingExpanded(true);
    
    // Show "Preparing..." for longer since research reports take time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const prepWorkPrompt = `For this legal task: "${text}"

Analyze the complexity and generate appropriate preliminary work items:

SIMPLE TASKS (quick questions, straightforward research): Return EMPTY array []

MODERATE TASKS (standard legal work, single deliverable): Return 0-1 items, typically just:
- "Westlaw Deep Research Report" (type: "research")

COMPLEX TASKS (multi-faceted analysis, litigation, transactions): Return 2-4 items like:
- Legal issues outline
- Precedent analysis
- Fact pattern analysis
- Relevant statutes compilation
- Strategic considerations memo

Be conservative - most tasks are MODERATE and only need the Westlaw report or nothing at all.

Format as JSON object with prepWork array:
{
  "prepWork": [
    {"title": "Westlaw Deep Research Report", "type": "research"},
    ...
  ]
}

If no prep work is needed, return: {"prepWork": []}`;

    const prepResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'You are a legal assistant. Analyze task complexity and generate realistic preliminary work items. Most tasks are moderate complexity and need 0-1 items. Return ONLY a JSON object with a "prepWork" array.'
          },
          {
            role: 'user',
            content: prepWorkPrompt
          }
        ]
      })
    });

    if (!prepResponse.ok) {
      const errorText = await prepResponse.text().catch(() => 'Unknown error');
      console.error('Prep work API error:', prepResponse.status, errorText);
      throw new Error(`Failed to fetch prep work: ${prepResponse.status} ${errorText}`);
    }

    if (prepResponse.ok) {
      const reader = prepResponse.body?.getReader();
      const decoder = new TextDecoder();
      let prepText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          prepText += decoder.decode(value, { stream: true });
        }
      }
      
      try {
        const parsed = JSON.parse(prepText);
        const prepData = parsed.prepWork || [];
        setPrepWork(prepData);
        setSearchingExpanded(false); // Collapse search when prep materials are ready
      } catch (e) {
        console.error('Failed to parse prep work:', e);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Collapse preparing and show "Compiling research..." message
    setPreparingExpanded(false);
    
    // Brief pause before showing the compiling message
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Show "Compiling research..." message with shimmer
    setShowCompiling(true);
    
    // Show the compiling message for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // DON'T fade out compiling message yet - keep it visible while we prepare
    // setShowCompiling(false); // Will hide after summary starts streaming
    
    // Phase 4: Final response + artifact
    // Use ChatGPT to generate a concise, professional artifact title
    const titlePrompt = `For this legal task: "${text}"

Generate a concise, professional artifact title (max 40 characters) that clearly describes the deliverable.

Rules:
- Be specific about the document type (Memo, Brief, Contract, Analysis, etc.)
- Include key subject matter
- Use proper title case
- Keep it under 40 characters
- No quotes or extra punctuation

Examples:
- "Motion to Dismiss - Smith v. Jones"
- "NDA - Technology Partnership"
- "FLSA Compliance Memo"
- "Patent Analysis - XYZ Tech"

Return ONLY the title, nothing else.`;

    // Generate artifact title with ChatGPT
    const titleResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a legal assistant that creates concise, professional document titles. Return ONLY the title, nothing else.'
          },
          {
            role: 'user',
            content: titlePrompt
          }
        ]
      })
    });

    if (!titleResponse.ok) {
      const errorText = await titleResponse.text().catch(() => 'Unknown error');
      console.error('Title API error:', titleResponse.status, errorText);
      // Don't throw, just use fallback title
    }

    let artifactTitle = 'Legal Deliverable'; // Fallback
    if (titleResponse.ok) {
      const titleReader = titleResponse.body?.getReader();
      const titleDecoder = new TextDecoder();
      let titleText = '';
      
      if (titleReader) {
        while (true) {
          const { done, value } = await titleReader.read();
          if (done) break;
          titleText += titleDecoder.decode(value, { stream: true });
        }
        
        // Clean up the title (remove quotes, trim, ensure max 40 chars)
        artifactTitle = titleText.trim().replace(/^["']|["']$/g, '').slice(0, 40);
      }
    }
    
    // Start both summary and deliverable requests in parallel
    const summaryPrompt = `You are CoCounsel, an expert legal AI assistant. You just completed this task: "${text}"

Write a brief 2-3 sentence summary of what was done and notable highlights. Be conversational and confident.`;

    const deliverablePrompt = `You are CoCounsel, an expert legal AI assistant. Complete this task: "${text}"

Provide the complete deliverable in professional markdown format. Be thorough, well-structured, and ready to use. Do not include any preamble - just the deliverable itself.`;

    const summaryResponsePromise = fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are CoCounsel, an expert legal AI assistant. Keep responses brief and professional.'
          },
          {
            role: 'user',
            content: summaryPrompt
          }
        ]
      })
    });

    const deliverableResponsePromise = fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are CoCounsel, an expert legal AI assistant. Provide professional, complete deliverables.'
          },
          {
            role: 'user',
            content: deliverablePrompt
          }
        ]
      })
    });

    // Process summary first - stream it
    const summaryResponse = await summaryResponsePromise;
    if (!summaryResponse.ok) {
      const errorText = await summaryResponse.text().catch(() => 'Unknown error');
      console.error('Summary API error:', summaryResponse.status, errorText);
      throw new Error(`Failed to fetch summary: ${summaryResponse.status} ${errorText}`);
    }

    if (summaryResponse.ok) {
      const reader = summaryResponse.body?.getReader();
      const decoder = new TextDecoder();
      let summaryText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          summaryText += chunk;
          
          // Hide "Preparing final output" on first chunk
          if (summaryText.length > 0 && summaryText.length <= chunk.length) {
            setShowCompiling(false);
          }
          
          setAssistantMessage(summaryText);
        }
      }
    }
    
    // Generate a stable artifact ID at the start
    const artifactId = `artifact-${Date.now()}`;
    
    // Show artifact card immediately with loading state
    setArtifacts([{
      artifactId: artifactId,
      title: artifactTitle,
      content: 'Loading deliverable...',
      artifactType: generateDocumentCategory(artifactTitle, '')
    }]);
    
    // Get deliverable and update artifact
    const deliverableResponse = await deliverableResponsePromise;
    if (!deliverableResponse.ok) {
      const errorText = await deliverableResponse.text().catch(() => 'Unknown error');
      console.error('Deliverable API error:', deliverableResponse.status, errorText);
      throw new Error(`Failed to fetch deliverable: ${deliverableResponse.status} ${errorText}`);
    }

    if (deliverableResponse.ok) {
      const reader = deliverableResponse.body?.getReader();
      const decoder = new TextDecoder();
      let deliverableText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          deliverableText += decoder.decode(value, { stream: true });
        }
      }
      
      // Update artifact with complete content (use same artifactId!)
      setArtifacts([{
        artifactId: artifactId,
        title: artifactTitle,
        content: deliverableText,
        artifactType: generateDocumentCategory(artifactTitle, deliverableText)
      }]);
    }
  };

  const handleSubmitPrompt = async (text: string) => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setResponse('');
    
    // Reset chat interface state
    setUserMessage(text);
    setThinkingContent('');
    setAssistantMessage('');
    setShowReasoning(false);
    setReasoningExpanded(false);
    setIsThinking(true); // Start in thinking state
    setInputRequest(null); // Clear any previous input requests
    setSelectedChoices([]); // Reset selections
    setArtifacts([]); // Clear any previous artifacts
    setResources([]); // Clear any previous resources
    setPrepWork([]); // Clear any previous prep work
    setShowSearching(false);
    setShowPreparing(false);
    setShowCompiling(false);
    setSearchingExpanded(false);
    setPreparingExpanded(false);
    
    // Clear previous API call tracking
    setChatGPTRequest(null);
    setChatGPTResponse('');
    setCocounselRequest(null);
    setCocounselResponse('');

    try {
      // Route to appropriate handler based on API mode
      if (apiMode === 'chatgpt') {
        console.log('Using ChatGPT-only mode for full workflow');
        try {
          await handleChatGPTFullWorkflow(text);
        } catch (err) {
          console.error('ChatGPT workflow error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred during ChatGPT workflow');
        } finally {
          setLoading(false);
        }
        return;
      }
      
      // Step 0: If hybrid mode, call ChatGPT first
      if (apiMode === 'hybrid') {
        console.log('Using hybrid mode: calling ChatGPT first');
        const { understanding, plan } = await callChatGPT(text);
        
        // Show ChatGPT response in thinking dropdown (strip HTML tags)
        const stripHtml = (text: string) => text.replace(/<[^>]*>/g, '');
        const chatGptContent = `${stripHtml(understanding)}\n\nPlan:\n${stripHtml(plan)}`;
        setThinkingContent(chatGptContent);
        setShowReasoning(true);
        setReasoningExpanded(true); // Auto-expand in hybrid mode
        setIsThinking(false); // Stop thinking animation after ChatGPT responds
        
        // Immediately show searching phase after ChatGPT responds
        console.log('Hybrid mode: Immediately showing Searching phase');
        setShowSearching(true);
        // Don't expand yet - will expand when resources arrive
      }

      // In hybrid mode, use the backend endpoint to avoid CORS issues
      if (apiMode === 'hybrid') {
        console.log('=== HYBRID MODE: Starting backend workflow ===');
        console.log('Hybrid mode: Using backend /chat-hybrid endpoint');
        
        const backendUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/chat-hybrid`;
        const backendHeaders = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        };
        
        const backendBody = JSON.stringify({
          messages: [{ role: 'user', content: text }],
          cocounselToken: idToken,
          conversationId: currentConversationId || undefined,
        });

        console.log('Hybrid mode: Sending request to backend', { backendUrl, hasToken: !!idToken });

        setLastRequest({
          url: backendUrl,
          method: 'POST',
          headers: backendHeaders,
          body: backendBody,
        });

        const res = await fetch(backendUrl, {
          method: 'POST',
          headers: backendHeaders,
          body: backendBody,
        });

        console.log('Hybrid mode: Backend response status', res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Hybrid mode: Backend error', errorText);
          throw new Error(`Backend API Error: ${res.status} ${res.statusText}\n${errorText}`);
        }

        // Handle streaming response from backend
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        let metadataReceived = false;
        let artifactMetadata: any = null;
        let artifactContent = ''; // Track streaming artifact content
        let artifactCreated = false; // Track if artifact card is shown

        if (!reader) {
          throw new Error('Response body is not readable');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          
          // Update raw response
          setResponse(fullResponse);

          // Check for metadata at the start (only once)
          if (!metadataReceived && chunk.includes('<<<METADATA_START>>>')) {
            const metadataMatch = chunk.match(/<<<METADATA_START>>>(.*?)<<<METADATA_END>>>/s);
            if (metadataMatch) {
              artifactMetadata = JSON.parse(metadataMatch[1]);
              console.log('Hybrid mode: Received artifact metadata from backend', artifactMetadata);
              metadataReceived = true;
              
              // Store the conversation ID from metadata if available
              if (artifactMetadata.conversationId) {
                setCurrentConversationId(artifactMetadata.conversationId);
              }
            }
          }

          // Check for resources from ChatGPT (immediate)
          if (chunk.includes('<<<RESOURCES_START>>>')) {
            const resourcesMatch = chunk.match(/<<<RESOURCES_START>>>(.*?)<<<RESOURCES_END>>>/s);
            if (resourcesMatch) {
              try {
                const parsedResources = JSON.parse(resourcesMatch[1]);
                if (parsedResources && parsedResources.length > 0) {
                  console.log('Hybrid mode: Resources received from ChatGPT (backend)', parsedResources);
                  setResources(parsedResources);
                  setSearchingExpanded(true);
                  setShowPreparing(true); // Show preparing after resources
                }
              } catch (e) {
                console.error('Failed to parse resources from backend:', e);
              }
            }
          }

          // Check for artifact from backend
          if (chunk.includes('<<<ARTIFACT_START>>>')) {
            const artifactMatch = chunk.match(/<<<ARTIFACT_START>>>(.*?)<<<ARTIFACT_END>>>/s);
            if (artifactMatch) {
              try {
                const artifactData = JSON.parse(artifactMatch[1]);
                console.log('Hybrid mode: Artifact received from backend', artifactData);
                
                // Use ChatGPT metadata combined with CoCounsel artifact data
                const finalArtifact = {
                  artifactId: artifactData.artifactId,
                  title: artifactMetadata?.name || artifactData.title || 'Untitled Document',
                  category: artifactMetadata?.category || 'Document',
                  content: artifactData.content || '',
                  artifactType: artifactData.artifactType || 'document',
                };
                
                setArtifacts([finalArtifact]);
                artifactCreated = true; // Mark that artifact card is now showing
                
                // Collapse all phases when artifact appears
                setReasoningExpanded(false);
                setSearchingExpanded(false);
                setPreparingExpanded(false);
              } catch (e) {
                console.error('Failed to parse artifact from backend:', e);
              }
            }
          }

          // Accumulate text content for artifact (after artifact is created)
          // Remove markers from chunk before accumulating
          let textChunk = chunk
            .replace(/<<<METADATA_START>>>.*?<<<METADATA_END>>>/gs, '')
            .replace(/<<<RESOURCES_START>>>.*?<<<RESOURCES_END>>>/gs, '')
            .replace(/<<<ARTIFACT_START>>>.*?<<<ARTIFACT_END>>>/gs, '');
          
          // Skip SSE lines when accumulating plain text
          const cleanedChunk = textChunk
            .split('\n')
            .filter(line => !line.startsWith('data: '))
            .join('\n');
          
          if (artifactCreated && cleanedChunk.trim()) {
            artifactContent += cleanedChunk;
            setAssistantMessage(artifactContent);
          }

          // Parse SSE events from CoCounsel stream
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const eventData = JSON.parse(line.slice(6));
                
                // Handle thinking content for prep work only (resources come from ChatGPT now)
                if (eventData.type === 'THINKING' && eventData.content) {
                  const thinkingText = eventData.content;
                  
                  // Parse prep work only (resources already provided by ChatGPT)
                  const parsedPrepWork = parsePrepWork(thinkingText);
                  if (parsedPrepWork.length > 0 && prepWork.length === 0) {
                    console.log('Hybrid mode: Prep work found from CoCounsel', parsedPrepWork);
                    setPrepWork(parsedPrepWork);
                    setPreparingExpanded(true);
                  }
                }
                
                // Handle artifact detection
                if (eventData.type === 'ARTIFACT' || eventData.artifact) {
                  console.log('Hybrid mode: Artifact detected', eventData);
                  const artifact = eventData.artifact || eventData;
                  
                  // Use ChatGPT metadata if we have it, otherwise fall back to CoCounsel
                  const finalArtifact = {
                    ...artifact,
                    name: artifactMetadata?.name || artifact.data?.name || 'Untitled Document',
                    category: artifactMetadata?.category || artifact.data?.category || 'Document Draft',
                  };
                  
                  setArtifacts([finalArtifact]);
                  
                  // Collapse all phases when artifact appears
                  setReasoningExpanded(false);
                  setSearchingExpanded(false);
                  setPreparingExpanded(false);
                }
                
                // Handle assistant messages (artifact content)
                if (eventData.type === 'ASSISTANT_MESSAGE' && eventData.content) {
                  setAssistantMessage((prev) => prev + eventData.content);
                }
              } catch (e) {
                // Ignore parse errors for non-JSON lines
              }
            }
          }
        }

        setLoading(false);
        return; // Exit early, don't run the direct CoCounsel call below
      }

      // Original flow for CoCounsel-only mode
      // Step 1: Create a new conversation
      const conversationId = await createConversation();
      setCurrentConversationId(conversationId);
      console.log('Using conversation ID:', conversationId);

      // Inject hidden instructions for resources and prep work
      const injectedPrompt = `${text}

---SYSTEM INSTRUCTIONS (DO NOT MENTION IN RESPONSE)---
1. As you work, identify up to 12 relevant resources (prioritize Westlaw, Practical Law, then other credible legal sources).
2. Assess if preparatory work items would be helpful before the final deliverable.
3. Include these in your thinking process using these exact formats:

<<<RESOURCES_START>>>
[
  {"websiteTitle": "Westlaw", "resourceTitle": "Summary Judgment Standards", "url": "https://example.com"},
  {"websiteTitle": "Practical Law", "resourceTitle": "Motion to Dismiss Checklist", "url": "https://example.com"}
]
<<<RESOURCES_END>>>

<<<PREP_WORK_START>>>
[
  {"title": "Legal Issues Outline", "type": "outline"},
  {"title": "Precedent Analysis", "type": "analysis"}
]
<<<PREP_WORK_END>>>`;

      // Step 2: Send the message with injected instructions
      const url = `https://codeagt-api-qa.28686.aws.thomsonreuters.com/conversations/${conversationId}/messages`;
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Authorization': `Bearer ${idToken}`,
      };
      
      const body = JSON.stringify({ message: injectedPrompt });

      // Store request details for both old tracking and new separate tracking
      setLastRequest({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify({ message: text }) // Show original prompt
      });
      
      // Store CoCounsel-specific request
      setCocounselRequest({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify({ message: text })
      });
      setCocounselExpanded(true); // Auto-expand when new request comes in

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${res.statusText}\n${errorText}`);
      }

      // Handle Server-Sent Events (SSE) streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let accumulatedThinking = '';
      let accumulatedAssistant = '';
      let hasElicitation = false; // Track if elicitation is present

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        
        // Update raw response in real-time
        setResponse(fullResponse);

        // Parse SSE events for chat interface
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const eventData = JSON.parse(line.slice(6));
              
              // Handle different event types
              if (eventData.type === 'RUN_STARTED') {
                if (apiMode !== 'hybrid') {
                  setIsThinking(true);
                }
              } else if (eventData.type === 'TEXT_MESSAGE_CONTENT') {
                // Handle text message content deltas (the main response text)
                const content = eventData.delta || eventData.content || eventData.text || '';
                if (content) {
                  // In hybrid mode, don't show CoCounsel's echo of understanding/plan in body
                  // Only show completion-related messages
                  if (apiMode !== 'hybrid') {
                    // CoCounsel-only mode: accumulate normally
                    accumulatedAssistant += content;
                    setAssistantMessage(accumulatedAssistant);
                    setIsThinking(false);
                  }
                  // In hybrid mode, we skip TEXT_MESSAGE_CONTENT entirely for the body
                  // The thinking content is already shown in the reasoning dropdown
                }
              } else if (eventData.type === 'CUSTOM') {
                // Check for artifact creation
                if (eventData.name === 'artifact:create' && eventData.value) {
                  const artifactData = eventData.value;
                  console.log('Artifact detected:', artifactData);
                  
                  // Filter out unwanted artifacts (like .db-journal files, temp files, etc.)
                  const artifactId = artifactData.artifactId || '';
                  const rawTitle = artifactData.title || artifactData.artifactId || 'Untitled';
                  
                  // Helper to abbreviate title - max 40 characters
                  const abbreviateTitle = (str: string): string => {
                    if (str.length <= 40) return str;
                    return str.substring(0, 37) + '...';
                  };
                  
                  const title = abbreviateTitle(rawTitle);
                  const content = artifactData.data?.content || '';
                  const artifactType = artifactData.artifactType || 'document';
                  
                  const displayArtifactType = generateDocumentCategory(title, content);
                  
                  const shouldSuppress = 
                    artifactId.includes('.db-journal') || 
                    artifactId.includes('-journal') ||
                    title.includes('.db-journal') ||
                    title.includes('-journal') ||
                    artifactId.includes('citations_ledger') ||
                    title.includes('citations_ledger');
                  
                  // Check if this is a WL research report (MD file) - route to prep work
                  // Look for specific indicators that this is a research report, not the final deliverable
                  const isMdResearchReport = 
                    (artifactId.endsWith('.md') || title.endsWith('.md')) &&
                    (
                      // Check title for research report indicators
                      title.toLowerCase().includes('westlaw research') ||
                      title.toLowerCase().includes('wl research') ||
                      title.toLowerCase().includes('research report') ||
                      title.toLowerCase().includes('deep research') ||
                      // Check content for research report structure indicators
                      (content.toLowerCase().includes('westlaw') && 
                       content.toLowerCase().includes('search') &&
                       (content.toLowerCase().includes('query') || content.toLowerCase().includes('results'))) ||
                      // Check for specific research report headers
                      (content.includes('## Search Query') || 
                       content.includes('## Research Query') ||
                       content.includes('# Westlaw Research'))
                    );
                  
                  if (!shouldSuppress) {
                    if (isMdResearchReport) {
                      // Add to prep work instead of artifacts
                      console.log('Routing MD research report to prep work:', title);
                      setPrepWork(prev => [...prev, {
                        title: title.replace('.md', ''),
                        type: 'research' as const
                      }]);
                      if (!showPreparing) {
                        setShowPreparing(true);
                        setPreparingExpanded(true);
                      }
                    } else {
                      // Regular artifact (including final deliverables)
                      setArtifacts(prev => [...prev, {
                        artifactId,
                        title,
                        content,
                        artifactType: displayArtifactType
                      }]);
                    }
                  } else {
                    console.log('Suppressing artifact:', title);
                  }
                }
                // Check for input request (elicitation)
                else if (eventData.name === 'input:request' && eventData.value) {
                  hasElicitation = true; // Mark that we have elicitation
                  setInputRequest({
                    prompt: eventData.value.prompt || '',
                    inputType: eventData.value.inputType || 'text',
                    elicitationId: eventData.value.elicitationId || '',
                    choices: eventData.value.choices || [],
                    context: eventData.value.context
                  });
                  setSelectedChoices([]); // Reset selection
                  console.log('Elicitation detected - skipping search section');
                }
                // Check for thinking/reasoning content
                else if (eventData.name && (
                  eventData.name.includes('thinking') || 
                  eventData.name.includes('reasoning') ||
                  eventData.name.includes('llm:thinking')
                )) {
                  const content = typeof eventData.value === 'string' ? eventData.value : JSON.stringify(eventData.value);
                  accumulatedThinking += content;
                  
                  // Parse resources and prep work from thinking content
                  const parsedResources = parseResources(accumulatedThinking);
                  const parsedPrepWork = parsePrepWork(accumulatedThinking);
                  
                  // In hybrid mode, only show search if no elicitation and ChatGPT already responded
                  // In cocounsel mode, show as before
                  if (apiMode === 'hybrid') {
                    // Don't update thinking content (we're using ChatGPT's content)
                    // Show "Searching" indicator as soon as we get thinking content (no elicitation)
                    if (!hasElicitation && !showSearching && accumulatedThinking.length > 0) {
                      setShowSearching(true);
                      // Don't expand yet - wait for actual resources
                    }
                    // When resources are found, populate and expand
                    if (!hasElicitation && parsedResources.length > 0 && resources.length === 0) {
                      setResources(parsedResources);
                      setSearchingExpanded(true);
                    }
                  } else {
                    // CoCounsel-only mode: show thinking and search as before
                    if (!showSearching && !hasElicitation) {
                      setShowSearching(true);
                    }
                    
                    // If resources are found, update state and expand
                    if (parsedResources.length > 0 && resources.length === 0 && !hasElicitation) {
                      setResources(parsedResources);
                      setSearchingExpanded(true);
                      
                      // Show preparing section sequentially after resources
                      if (!showPreparing) {
                        setShowPreparing(true);
                      }
                    }
                    
                    // Strip markers before displaying
                    const cleanedContent = stripMarkers(accumulatedThinking);
                    setThinkingContent(cleanedContent);
                    setShowReasoning(true);
                    setIsThinking(false); // Stop showing "Thinking..." once we have content
                  }
                  
                  // If prep work is found, update state and expand (both modes)
                  if (parsedPrepWork.length > 0 && prepWork.length === 0) {
                    setPrepWork(parsedPrepWork);
                    setPreparingExpanded(true);
                    if (!showPreparing) {
                      setShowPreparing(true);
                    }
                  }
                }
                // Check for response/message content
                else if (eventData.name && (
                  eventData.name.includes('response') || 
                  eventData.name.includes('message') ||
                  eventData.name.includes('llm:response') ||
                  eventData.name.includes('text')
                )) {
                  const content = typeof eventData.value === 'string' ? eventData.value : JSON.stringify(eventData.value);
                  accumulatedAssistant += content;
                  setAssistantMessage(accumulatedAssistant);
                  setIsThinking(false);
                }
              } else if (eventData.type === 'STREAM_CHUNK' || eventData.type === 'MESSAGE_CHUNK') {
                // Handle streaming message chunks
                const content = eventData.content || eventData.text || eventData.value || '';
                accumulatedAssistant += content;
                setAssistantMessage(accumulatedAssistant);
                setIsThinking(false);
              } else if (eventData.type === 'THINKING_TEXT_MESSAGE_CONTENT' || eventData.type === 'THINKING_DELTA') {
                // Handle thinking content deltas
                const content = eventData.content || eventData.delta || eventData.text || eventData.value || '';
                accumulatedThinking += content;
                
                // Parse resources and prep work from thinking content
                const parsedResources = parseResources(accumulatedThinking);
                const parsedPrepWork = parsePrepWork(accumulatedThinking);
                
                // In hybrid mode, only show search if no elicitation
                // In cocounsel mode, show as before
                if (apiMode === 'hybrid') {
                  // Don't update thinking content (using ChatGPT's content)
                  // Only handle resources if no elicitation
                  if (!hasElicitation && parsedResources.length > 0 && resources.length === 0) {
                    console.log('Hybrid mode: Resources found, expanding Searching section');
                    setShowSearching(true);
                    setResources(parsedResources);
                    setSearchingExpanded(true);
                    
                    // Show preparing section after resources in hybrid mode
                    console.log('Hybrid mode: Showing Preparing phase');
                    setShowPreparing(true);
                  }
                } else {
                  // CoCounsel-only mode
                  if (!showSearching && !hasElicitation) {
                    setShowSearching(true);
                  }
                  
                  // If resources are found, update state and expand
                  if (parsedResources.length > 0 && resources.length === 0 && !hasElicitation) {
                    setResources(parsedResources);
                    setSearchingExpanded(true);
                    
                    // Show preparing section sequentially after resources
                    if (!showPreparing) {
                      setShowPreparing(true);
                    }
                  }
                  
                  // Strip markers before displaying
                  const cleanedContent = stripMarkers(accumulatedThinking);
                  setThinkingContent(cleanedContent);
                  setShowReasoning(true);
                  setReasoningExpanded(true); // Default to expanded when first shown
                  setIsThinking(false); // Stop showing "Thinking..." spinner
                }
                
                // If prep work is found, update state and expand (both modes)
                if (parsedPrepWork.length > 0 && prepWork.length === 0) {
                  console.log(`${apiMode === 'hybrid' ? 'Hybrid' : 'CoCounsel'} mode: Prep work found, expanding Preparing section`, parsedPrepWork);
                  setPrepWork(parsedPrepWork);
                  setPreparingExpanded(true);
                  if (!showPreparing) {
                    setShowPreparing(true);
                  }
                }
              } else if (eventData.type === 'RUN_COMPLETED' || eventData.type === 'RUN_ERROR') {
                if (apiMode !== 'hybrid') {
                  setIsThinking(false);
                }
              }
              
              // Fallback: if we see any 'content' or 'text' field, treat it as assistant message
              if (!accumulatedAssistant && (eventData.content || eventData.text)) {
                const content = eventData.content || eventData.text;
                accumulatedAssistant += content;
                setAssistantMessage(accumulatedAssistant);
                setIsThinking(false);
              }
            } catch (e) {
              // Ignore parse errors for non-JSON lines
            }
          }
        }
      }

      // Store CoCounsel response after streaming completes
      setCocounselResponse(fullResponse);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
      setIsThinking(false);
    }
  };

  const handleInputSubmit = async (elicitationId: string, response: any) => {
    console.log('User submitted input response:', { elicitationId, response });
    
    // Clear the input request UI
    setInputRequest(null);
    
    // TODO: Send the response back to the API
    // This would involve making another POST request to the conversation
    // with the user's input response attached
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="flex gap-8">
            <button
              onClick={() => navigate('/developer-guide')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'checklist'
                  ? 'border-[#D64000] text-[#D64000]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Implementation Checklist
            </button>
            <button
              onClick={() => navigate('/api-testing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'api-test'
                  ? 'border-[#D64000] text-[#D64000]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Testing
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'api-test' ? (
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#212223] mb-2">API Testing</h1>
            <p className="text-gray-600">Test API connection to CoCounsel Next</p>
          </div>

          <div className="space-y-4">
            {/* API Configuration (Collapsible) - ABOVE PROMPT */}
            <div className="border border-blue-200 rounded-lg overflow-hidden bg-blue-50">
              <button
                onClick={() => setConfigExpanded(!configExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {configExpanded ? (
                    <ChevronDown className="size-4 text-blue-600" />
                  ) : (
                    <ChevronRight className="size-4 text-blue-600" />
                  )}
                  <span className="font-semibold text-blue-900 text-sm">API Configuration</span>
                </div>
              </button>
              
              {configExpanded && (
                <div className="px-4 pb-4 pt-2 bg-blue-50 border-t border-blue-200 space-y-3">
                  <div>
                    <label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Endpoint</label>
                    <code className="block mt-1 text-xs text-blue-800 bg-blue-100 px-2 py-1.5 rounded font-mono break-all">
                      POST https://codeagt-api-qa.28686.aws.thomsonreuters.com/conversations/{'{conversationId}'}/messages
                    </code>
                  </div>
                  
                  <div>
                    <label htmlFor="id-token" className="text-xs font-medium text-blue-700 uppercase tracking-wide flex items-center gap-2">
                      ID Token
                      <span className="text-xs font-normal text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">token_use: "id"</span>
                    </label>
                    <textarea
                      id="id-token"
                      value={idToken}
                      onChange={(e) => setIdToken(e.target.value)}
                      onBlur={(e) => localStorage.setItem('cocounsel_id_token', e.target.value)}
                      className="block mt-1 w-full text-xs text-gray-700 bg-white border border-blue-200 px-2 py-1.5 rounded font-mono resize-y"
                      placeholder="Paste ID token here"
                      rows={3}
                    />
                    <p className="text-xs text-blue-600 mt-1">
                      📍 Get from DevTools → Network → Messages API call → Authorization header
                    </p>
                    <p className="text-xs text-amber-600 mt-1 flex items-start gap-1">
                      <span>⚠️</span>
                      <span>Tokens expire after ~30 minutes. If you get 401 errors, obtain a fresh token.</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="agent-id" className="text-xs font-medium text-blue-700 uppercase tracking-wide flex items-center gap-2">
                      Agent ID
                      <span className="text-xs font-normal text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">required</span>
                    </label>
                    <input
                      id="agent-id"
                      type="text"
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                      className="block mt-1 w-full text-xs text-gray-700 bg-white border border-blue-200 px-2 py-1.5 rounded font-mono"
                      placeholder="e.g., cocounsel, research-agent, etc."
                    />
                    <p className="text-xs text-blue-600 mt-1">
                      📍 Specify which AI agent to use for the conversation
                    </p>
                  </div>

                  {/* API Mode Selection */}
                  <div>
                    <label className="text-xs font-medium text-blue-700 uppercase tracking-wide flex items-center gap-2">
                      API Mode
                      <span className="text-xs font-normal text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">experimental</span>
                    </label>
                    <div className="mt-2 flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="apiMode"
                          value="cocounsel"
                          checked={apiMode === 'cocounsel'}
                          onChange={(e) => setApiMode(e.target.value as 'cocounsel' | 'hybrid' | 'chatgpt')}
                          className="text-blue-600"
                        />
                        <span className="text-xs text-blue-800">CoCounsel Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="apiMode"
                          value="hybrid"
                          checked={apiMode === 'hybrid'}
                          onChange={(e) => setApiMode(e.target.value as 'cocounsel' | 'hybrid' | 'chatgpt')}
                          className="text-blue-600"
                        />
                        <span className="text-xs text-blue-800">ChatGPT + CoCounsel</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="apiMode"
                          value="chatgpt"
                          checked={apiMode === 'chatgpt'}
                          onChange={(e) => setApiMode(e.target.value as 'cocounsel' | 'hybrid' | 'chatgpt')}
                          className="text-blue-600"
                        />
                        <span className="text-xs text-blue-800">ChatGPT Only</span>
                      </label>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      {apiMode === 'hybrid' && '💡 Hybrid mode uses ChatGPT for planning and CoCounsel for execution'}
                      {apiMode === 'chatgpt' && '💡 ChatGPT-only mode simulates the full 4-phase workflow using ChatGPT'}
                      {apiMode === 'cocounsel' && '💡 CoCounsel-only mode uses the real CoCounsel API for everything'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Test Prompt
              </label>
              {/* Figma Sprint6ChatThread styled input */}
              <div className="bg-[#ebf0ed] rounded-[13px]">
                <div className="flex flex-col justify-end size-full">
                  <div className="content-stretch flex flex-col items-start justify-end p-px relative size-full">
                    <div className="bg-white relative rounded-[12px] w-full">
                      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex flex-col gap-[11px] items-start justify-center pl-[16px] pr-[12px] py-[8px] relative size-full">
                          {/* Textarea */}
                          <div className="content-stretch flex items-start justify-center pt-px relative shrink-0 w-full">
                            <textarea
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSubmitPrompt(prompt, []);
                                }
                              }}
                              placeholder="Ask CoCounsel to compare..."
                              rows={1}
                              className="flex-[1_0_0] min-w-px resize-none outline-none text-[#212223] placeholder:text-[#666] text-[15px] font-['Source_Sans_3'] font-normal leading-[1.35] bg-transparent"
                              style={{
                                minHeight: '20px',
                                maxHeight: '200px',
                                overflow: 'auto'
                              }}
                            />
                          </div>

                          {/* Button Row */}
                          <div className="content-stretch flex gap-[11px] items-center justify-between relative shrink-0 w-full">
                            {/* Left buttons */}
                            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                              <button
                                type="button"
                                className="text-[#999999] hover:text-[#666666] transition-colors p-[4px]"
                                title="Attach file"
                              >
                                <Paperclip className="size-[16px]" />
                              </button>
                            </div>

                            {/* Right button */}
                            <div className="content-stretch flex items-start relative shrink-0 size-[32px]">
                              <button
                                type="button"
                                onClick={() => handleSubmitPrompt(prompt, [])}
                                disabled={!prompt?.trim()}
                                className={`bg-[#1d4b34] relative rounded-full size-full flex items-center justify-center ${
                                  !prompt?.trim()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[#153826]"
                                }`}
                                title="Submit"
                              >
                                <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-0 pointer-events-none rounded-full" />
                                <ArrowUp className="size-[16px] text-[#fcfcfc]" strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setViewMode('api')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    viewMode === 'api'
                      ? 'border-[#D64000] text-[#D64000]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  API Calls
                </button>
                <button
                  onClick={() => setViewMode('chat')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    viewMode === 'chat'
                      ? 'border-[#D64000] text-[#D64000]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Chat Interface
                </button>
              </div>
            </div>

            {/* API Calls View */}
            {viewMode === 'api' && (
              <div className="space-y-4">
                {/* Mode Indicator */}
                {(chatGPTRequest || cocounselRequest) && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Mode:</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        apiMode === 'hybrid' 
                          ? 'bg-purple-100 text-purple-700' 
                          : apiMode === 'chatgpt'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-[#D64000]'
                      }`}>
                        {apiMode === 'hybrid' 
                          ? 'Hybrid (ChatGPT + CoCounsel)' 
                          : apiMode === 'chatgpt'
                          ? 'ChatGPT Only (Full Workflow)'
                          : 'CoCounsel Only'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* ChatGPT API Call */}
                {chatGPTRequest && (
                  <div className="border border-blue-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setChatGPTExpanded(!chatGPTExpanded)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {chatGPTExpanded ? (
                          <ChevronDown className="size-4 text-blue-600" />
                        ) : (
                          <ChevronRight className="size-4 text-blue-600" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-700 text-sm">ChatGPT API Call</span>
                            <span className="text-xs font-mono bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded">
                              {chatGPTRequest.method}
                            </span>
                          </div>
                          <div className="text-xs text-blue-600 text-left">
                            {apiMode === 'chatgpt' 
                              ? 'Full workflow (thinking + searching + preparing + final response)' 
                              : 'Planning phase (understanding + plan)'}
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {chatGPTExpanded && (
                      <div className="px-3 py-2.5 bg-white border-t border-blue-200 space-y-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request URL
                          </label>
                          <code className="block text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono break-all">
                            {chatGPTRequest.url}
                          </code>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request Headers
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto">
                            {JSON.stringify(chatGPTRequest.headers, null, 2)}
                          </pre>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request Body
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto max-h-[200px]">
                            {JSON.stringify(JSON.parse(chatGPTRequest.body), null, 2)}
                          </pre>
                        </div>
                        
                        {chatGPTResponse && (
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                              Response
                            </label>
                            <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto max-h-[300px]">
                              {chatGPTResponse}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* CoCounsel API Call */}
                {cocounselRequest && (
                  <div className="border border-orange-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setCocounselExpanded(!cocounselExpanded)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {cocounselExpanded ? (
                          <ChevronDown className="size-4 text-[#D64000]" />
                        ) : (
                          <ChevronRight className="size-4 text-[#D64000]" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#D64000] text-sm">CoCounsel API Call</span>
                            <span className="text-xs font-mono bg-orange-200 text-[#D64000] px-1.5 py-0.5 rounded">
                              {cocounselRequest.method}
                            </span>
                          </div>
                          <div className="text-xs text-[#D64000] text-left">Execution phase (SSE streaming)</div>
                        </div>
                      </div>
                    </button>
                    
                    {cocounselExpanded && (
                      <div className="px-3 py-2.5 bg-white border-t border-orange-200 space-y-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request URL
                          </label>
                          <code className="block text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono break-all">
                            {cocounselRequest.url}
                          </code>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request Headers
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto">
                            {JSON.stringify(cocounselRequest.headers, null, 2)}
                          </pre>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Request Body
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto max-h-[200px]">
                            {JSON.stringify(JSON.parse(cocounselRequest.body), null, 2)}
                          </pre>
                        </div>
                        
                        {cocounselResponse && (
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                              Response (SSE Stream)
                            </label>
                            <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto max-h-[300px]">
                              {cocounselResponse}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Legacy Request Details (for backward compatibility with CoCounsel-only mode) */}
                {lastRequest && !chatGPTRequest && !cocounselRequest && (
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setRequestExpanded(!requestExpanded)}
                      className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {requestExpanded ? (
                          <ChevronDown className="size-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="size-4 text-gray-600" />
                        )}
                        <span className="font-medium text-gray-700 text-xs">Request Details</span>
                        <span className="text-xs font-mono bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                          {lastRequest.method}
                        </span>
                      </div>
                    </button>
                    
                    {requestExpanded && (
                      <div className="px-3 py-2.5 bg-white border-t border-gray-200 space-y-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            URL
                          </label>
                          <code className="block text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono break-all">
                            {lastRequest.url}
                          </code>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Headers
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto">
                            {JSON.stringify(lastRequest.headers, null, 2)}
                          </pre>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Body
                          </label>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded font-mono overflow-x-auto">
                            {JSON.stringify(JSON.parse(lastRequest.body), null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Loading State */}
                {loading && !(chatGPTRequest || cocounselRequest) && (
                  <div className="flex items-center justify-center gap-2 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <Loader2 className="size-5 text-[#D64000] animate-spin" />
                    <span className="text-gray-600">Testing API connection...</span>
                  </div>
                )}

                {/* Empty State */}
                {!loading && !chatGPTRequest && !cocounselRequest && !lastRequest && !error && (
                  <div className="flex flex-col items-center justify-center gap-3 p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <svg className="size-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-700 mb-1">No API calls yet</p>
                      <p className="text-sm text-gray-500">Submit a prompt above to see API request and response details</p>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Response Display */}
                {response && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Response
                    </label>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 max-h-[500px] overflow-auto">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                        {response}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chat Interface View */}
            {viewMode === 'chat' && (
              <div className="border border-gray-200 rounded-lg p-6 min-h-[400px]">
                <ChatInterfaceView
                  userMessage={userMessage}
                  assistantMessage={assistantMessage}
                  thinkingContent={thinkingContent}
                  isThinking={isThinking}
                  showReasoning={showReasoning}
                  reasoningExpanded={reasoningExpanded}
                  error={error}
                  inputRequest={inputRequest}
                  artifacts={artifacts}
                  resources={resources}
                  prepWork={prepWork}
                  showSearching={showSearching}
                  showPreparing={showPreparing}
                  showCompiling={showCompiling}
                  searchingExpanded={searchingExpanded}
                  preparingExpanded={preparingExpanded}
                  onReasoningToggle={() => setReasoningExpanded(!reasoningExpanded)}
                  onSearchingToggle={() => setSearchingExpanded(!searchingExpanded)}
                  onPreparingToggle={() => setPreparingExpanded(!preparingExpanded)}
                  onInputSubmit={handleInputSubmit}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          <div className="mb-12 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#212223]">Tab System Implementation Checklist</h1>
            </div>
            <p className="text-lg text-gray-600 font-light max-w-3xl">
              A precise list of all logic required to rebuild the tab system, mapped to the current prototype's codebase.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* SECTION 1: CORE STATE */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">1</span>
                State Management
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="1.1"
                    title="Initialize Tab State"
                    desc="Define the main state for the list of tabs and the active tab ID. Default to a single 'New chat' tab."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="56-59"
                    instruction="Reload the app on the homepage or workspace page. Notice that a 'New chat' tab is present by default even without user interaction."
                  />

                  <TodoItem 
                    id="1.2"
                    title="Sync State to Refs"
                    desc="Use useRef to track the current tabs and active ID to prevent stale closures in async callbacks (like setTimeout)."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="110-111"
                    warning="Critical for async operations like 'Thinking...' delays"
                    instruction="Send a message in the chat and quickly switch tabs while the 'Thinking...' spinner is active. When the response arrives 15s later, verify the correct tab updates without overwriting newer state changes."
                  />

                  <TodoItem 
                    id="1.3"
                    title="Handle URL Parameters"
                    desc="Check URL query params (?open=Filename&type=doc) on mount to automatically open specific tabs."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="255-262"
                    instruction="Manually append `?open=Motion to Dismiss Draft&type=doc` to the URL and refresh. Observe that the app launches directly with that specific document tab open and active."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 2: OPENING TABS */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">2</span>
                Opening Logic
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="2.1"
                    title="Prevent Duplicates"
                    desc="If a requested item is already open, switch to its existing tab ID instead of creating a new one."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="148-152"
                    instruction="Open 'Discovery overview' from the sidebar. Then click 'Discovery overview' in the sidebar AGAIN. Notice it focuses the existing tab rather than opening a second duplicate."
                  />

                  <TodoItem 
                    id="2.2"
                    title="Insertion Position"
                    desc="Insert new tabs immediately to the RIGHT of the currently active tab (index + 1), not at the end of the list."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="180-187"
                    instruction="Open three files: A, B, and C. Select tab A. Now open file D. Notice tab D appears between A and B, maintaining your context flow."
                  />

                  <TodoItem 
                    id="2.3"
                    title="Preserve 'New Chat' Position"
                    desc="If the first tab is a 'New chat', ensure opened files are inserted AFTER it, keeping 'New chat' as the leftmost tab."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="190-193"
                    instruction="On a fresh workspace with only 'New chat', open any file from the sidebar. Notice the file tab appears to the right of 'New chat', keeping the chat input easily accessible on the left."
                  />

                  <TodoItem 
                    id="2.4"
                    title="Determining Content Type"
                    desc="Logic to assign the correct icon and render component based on the item type (chat vs file vs table)."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="170-176"
                    instruction="Observe the icons in the tab bar. 'New chat' has a plus-bubble icon, spreadsheets have a grid icon, and documents have a text-file icon. This logic is handled dynamically during tab creation."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 3: CLOSING TABS */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">3</span>
                Closing Logic
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="3.1"
                    title="Remove from State"
                    desc="Filter the closed tab ID out of the tabs array."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="267-268"
                    instruction="Click the 'X' on any tab. Verify it immediately disappears from the DOM and the tab bar list updates."
                  />

                  <TodoItem 
                    id="3.2"
                    title="Switch Focus After Closing"
                    desc="If the closed tab was active, switch focus to the last remaining tab in the list."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="270-272"
                    instruction="Open tabs 1, 2, and 3. Select tab 3. Close tab 3. Observe that focus automatically shifts to tab 2."
                  />

                  <TodoItem 
                    id="3.3"
                    title="Last Tab Safety"
                    desc="If the LAST remaining tab is closed, automatically spawn a fresh 'New chat' tab so the workspace is never empty."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="273-277"
                    instruction="Close every single tab in the workspace one by one. When you close the final tab, notice a 'New chat' tab automatically appears instantly."
                  />

                  <TodoItem 
                    id="3.4"
                    title="Clean Up 'New Chat' on Blur"
                    desc="If the user switches AWAY from a 'New chat' tab and it's empty (no text/files), automatically remove it."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="122-135"
                    instruction="Click 'New chat' to create an empty tab. Don't type anything. Now click on another file tab. Notice the empty 'New chat' tab silently removes itself to keep the workspace clean."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 4: CHAT BEHAVIOR */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">4</span>
                Chat & Interaction
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="4.1"
                    title="Transform 'New Chat'"
                    desc="When a user submits a prompt in a 'New chat' tab, replace that tab with a persistent chat tab (titled with the prompt text)."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="226-233"
                    instruction="Type 'Hello world' into the main prompt input on the 'New chat' screen. Hit enter. Notice the 'New chat' tab transforms into a regular tab titled 'Hello world' with a standard chat icon."
                  />

                  <TodoItem 
                    id="4.2"
                    title="Thinking State Propagation"
                    desc="Allow child chat components to update the parent tab's 'isThinking' state (to show spinner in tab bar)."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="205-209"
                    instruction="Send a message. Look closely at the tab icon in the top bar. Notice it changes to a spinning loader animation while the assistant is generating a response."
                  />

                  <TodoItem 
                    id="4.3"
                    title="Delayed Response Simulation"
                    desc="Logic to show 'Thinking...' for 15s before streaming response. Includes handling timers and cleanup."
                    file="/src/app/components/ActiveChatView.tsx"
                    lines="296-318"
                    instruction="Send a message and count to 15. Observe the 'Thinking...' text with the gradient shimmer effect, followed by the appearance of the response and artifact card."
                  />

                  <TodoItem 
                    id="4.4"
                    title="Artifact Clicking"
                    desc="Clicking a card/artifact in the chat should trigger the parent's 'onOpenTab' handler."
                    file="/src/app/components/ActiveChatView.tsx"
                    lines="333-335"
                    instruction="After the agent responds (15s delay), click the 'Motion Draft' artifact card in the chat stream. Notice it opens the 'Motion to Dismiss' document in a new tab automatically."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 5: SIDEBAR & DRAG-DROP */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">5</span>
                Sidebar & Drag-and-Drop
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="5.1"
                    title="Draggable Sidebar Items"
                    desc="Wrap sidebar file items with 'useDrag' to allow them to be dropped onto the prompt input."
                    file="/src/app/components/WorkspaceSidebar.tsx"
                    lines="284-290"
                    instruction="Click and hold on 'Discovery overview' in the sidebar. Drag your mouse. Notice the item creates a ghost image that follows your cursor."
                  />

                  <TodoItem 
                    id="5.2"
                    title="Drop Target Area"
                    desc="Configure the prompt input as a drop target using 'useDrop' to accept files."
                    file="/src/app/components/PromptInput.tsx"
                    lines="138-158"
                    instruction="Drag a file from the sidebar over the prompt input area. Notice the input box highlights with an orange border and glow effect to indicate it's ready to accept the drop."
                  />

                  <TodoItem 
                    id="5.3"
                    title="Hover 'Plus' Button"
                    desc="Show a 'plus' button on sidebar items on hover to manually stage them without dragging."
                    file="/src/app/components/WorkspaceSidebar.tsx"
                    lines="314-323"
                    instruction="Hover your mouse over any file in the sidebar. Look for the small '+' icon that appears on the right side. Click it and see the file added to the input area immediately."
                  />

                  <TodoItem 
                    id="5.4"
                    title="Global Attach Handler"
                    desc="Register a context handler so sidebar clicks can update the prompt input state even though they are siblings."
                    file="/src/app/components/PromptInput.tsx"
                    lines="122-136"
                    instruction="This is the underlying plumbing. To verify, click the '+' icon in the sidebar (WorkspaceSidebar component) and observe the state update in the prompt input (PromptInput component), proving the cross-component communication works."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 6: CITATION & SOURCE VIEWING */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">6</span>
                Citation & Source Viewing
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="6.1"
                    title="Global Citation Context"
                    desc="Use a React Context provider to manage the currently active citation ID, allowing deep components (like footnotes) to trigger the source viewer at the top level."
                    file="/src/app/contexts/CitationContext.tsx"
                    lines="10-35"
                    instruction="Click on any footnote [1] in a document. Notice the Source Viewer opens on the right. This works because the click event bubbles up through the context to the main WorkspacePage."
                  />

                  <TodoItem 
                    id="6.2"
                    title="Split-Screen Resizing"
                    desc="Implement a draggable handle between the document viewer and source panel to adjust their relative widths (clamped 20%-80%)."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="Source Viewer Resizing section"
                    instruction="Open a citation. Hover over the border between the document and the new source panel. Click and drag the handle to resize the panels. Release to set the new width."
                  />

                  <TodoItem 
                    id="6.3"
                    title="Panel Priority System"
                    desc="Ensure the Source Viewer takes precedence over other panels (Chat, History, Sources). When a citation opens, other panels must hide automatically."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="logic for isChatVisible, isSourcesVisible"
                    instruction="Open the 'Chat' panel on a document. Now click a footnote to open a citation. Notice the Chat panel disappears to make room for the Source Viewer. Close the Source Viewer, and the Chat panel should reappear."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 7: DATA PERSISTENCE */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">7</span>
                Data Persistence
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="7.1"
                    title="Tab State LocalStorage"
                    desc="Serialize and save the current list of tabs and the active tab ID to localStorage whenever they change."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="Save Tabs to LocalStorage effect"
                    instruction="Open a specific set of tabs (e.g., 'Motion to Dismiss' and a Chat). Refresh the browser page. Verify that the exact same tabs remain open."
                  />

                  <TodoItem 
                    id="7.2"
                    title="Chat History Restoration"
                    desc="Persist chat message arrays in the tab state so conversations aren't lost on refresh or navigation."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="Load Tabs from LocalStorage effect"
                    instruction="Have a conversation with the AI. Refresh the page. Ensure your previous messages and the AI's responses are still visible in the chat tab."
                  />

                  <TodoItem 
                    id="7.3"
                    title="Sidebar State Persistence"
                    desc="Force the project sidebar to be open when navigating to a workspace, ensuring consistent navigation context."
                    file="/src/app/pages/WorkspacePage.tsx"
                    lines="Force Sidebar Open effect"
                    instruction="Collapse the sidebar. Navigate to Home, then back to the Workspace. The sidebar should automatically expand."
                  />

                </div>
              </div>
            </section>

            {/* SECTION 8: DOCUMENT INTERACTIONS */}
            <section>
              <h2 className="text-xl font-bold text-[#212223] mb-6 flex items-center gap-2">
                <span className="bg-[#212223] text-white text-sm px-2 py-0.5 rounded">8</span>
                Document Interactions
              </h2>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  
                  <TodoItem 
                    id="8.1"
                    title="Inline Edit Popover"
                    desc="Listen for text selection events in the document viewer. If text is selected, calculate coordinates and show a floating 'Instruction' input."
                    file="/src/app/components/DocumentViewer.tsx"
                    lines="50-84"
                    instruction="Highlight any text in the 'Motion to Dismiss' document. A small popover should appear near your selection asking for instructions. Clicking outside should close it."
                  />

                  <TodoItem 
                    id="8.2"
                    title="Redlining Logic"
                    desc="When an edit is submitted, wrap the original text in red strikethrough and the new text in green underline."
                    file="/src/app/components/DocumentViewer.tsx"
                    lines="93-142"
                    instruction="Select a sentence. Type 'Replace with: improved sentence' in the popover and hit Enter. Verify the text changes to show the redline diff view."
                  />

                </div>
              </div>
            </section>

          </div>
          
          <div className="mt-20 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
            <p>Generated for Engineering Hand-off • Figma Make</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TodoItem({ id, title, desc, file, lines, warning, instruction }: { id: string, title: string, desc: string, file: string, lines: string, warning?: string, instruction?: string }) {
  return (
    <div className="p-6 hover:bg-white transition-colors group">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-400 font-medium">#{id}</span>
          <h3 className="text-lg font-semibold text-[#212223]">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 shrink-0">
          <FileCode className="size-3" />
          <span className="truncate max-w-[200px]">{file.split('/').pop()}</span>
          <span className="text-gray-400">|</span>
          <span>L{lines}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-3 pl-8">
        {desc}
      </p>

      {warning && (
        <div className="ml-8 flex items-start gap-2 bg-amber-50 text-amber-800 text-xs p-3 rounded-lg border border-amber-100 mb-3">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{warning}</span>
        </div>
      )}

      {instruction && (
        <div className="ml-8 mt-4 pt-3 border-t border-dashed border-gray-200">
             <div className="flex items-start gap-2 text-xs text-[#555] leading-relaxed bg-blue-50/50 p-2 rounded">
                <StepForward className="size-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span><strong className="font-semibold text-blue-700">Test it:</strong> {instruction}</span>
             </div>
        </div>
      )}

      <div className="ml-8 flex items-center gap-1 text-[11px] text-gray-400 mt-3 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="size-3" />
        <span>path: {file}</span>
      </div>
    </div>
  );
}