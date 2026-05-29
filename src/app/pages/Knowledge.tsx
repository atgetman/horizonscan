import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Search, Plus, Star, Info, ScanText, GitCompare, Sheet, SquarePen, MailPlus, Scale, ListTree, Edit, LayoutDashboard, Lightbulb, Sparkles, HelpCircle, FileText, ChevronRight, MessageCircleQuestion, Sliders, FileBadge, Brain, Blocks, Share2, TestTube2, PanelLeftClose, MoreHorizontal, Share, Trash2, Beaker, LayoutGrid, Table, ChevronDown, Download, MessageSquare, Pencil, Bell } from "lucide-react";
import { PromptDrawer } from "../components/PromptDrawer";
import { MultiSelect } from "../components/MultiSelect";
import { SingleSelect } from "../components/SingleSelect";
import { CardDropdownMenu } from "../components/CardDropdownMenu";
import { Toggle } from "../components/ui/SegmentedToggle";
import { NewSkillModal } from "../components/NewSkillModal";
import { EditSkillModal } from "../components/EditSkillModal";
import { ShareSkillModal } from "../components/ShareSkillModal";
import { ShareConfirmationModal } from "../components/ShareConfirmationModal";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { SkillDeletedModal } from "../components/SkillDeletedModal";

import { ImportSkillModal } from "../components/ImportSkillModal";
import { Toast } from "../components/Toast";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { clsx } from "clsx";
import { MonitoringListView } from "../components/monitoring/MonitoringListView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useMonitoring } from "../contexts/MonitoringContext";

import docThumbnail from "../../imports/Screenshot_2026-05-02_at_2.41.06 PM.png";

type TaskType = 'drafting' | 'analysis' | 'research' | 'summarization' | 'multi-doc-research' | 'communication';
type PracticeArea = 'litigation' | 'corporate' | 'general' | 'contracts';
type SectionType = 'dashboard' | 'instructions' | 'model-documents' | 'prompts' | 'custom-skills' | 'question-sets' | 'monitoring-alerts';
type ScopeType = 'personal' | 'firm';
type SkillType = 'output-guideline' | 'capability' | 'content-tool' | 'directing';

interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  promptText: string;
  files: { id: string; name: string; type: string }[];
  taskType: TaskType;
  practiceArea: PracticeArea;
  iconName?: string;
  iconColor?: string;
}

interface Skill {
  id: string;
  name: string;
  type: SkillType;
  practiceArea: string;
  dateSaved: string;
  lastTested: string | null;
  author: string;
  purpose?: string;
  content?: string;
  scope: 'personal' | 'firm';
  sharedToFirm?: 'pending' | 'approved';
  sharedWorkspaces?: { id: string; name: string }[];
  tested?: boolean;
}

// Helper function to get icon and solid color for prompt (matching Figma design)
const getPromptIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();

  // AI Jurisdiction Surveys - Orange
  if (title === 'AI Jurisdiction Surveys') {
    return {
      Icon: Scale,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }

  // Agreement Clause Drafting - Blue
  if (title === 'Agreement Clause Drafting') {
    return {
      Icon: SquarePen,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }

  // AI-Assisted Research US - Orange
  if (title === 'AI-Assisted Research US') {
    return {
      Icon: Scale,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }

  // Allegation Summary Email - Blue
  if (title === 'Allegation Summary Email') {
    return {
      Icon: MailPlus,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }

  // Amendment Term Analysis - Green/Teal
  if (title === 'Amendment Term Analysis') {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  // Argument and Counterargument Table - Green/Teal
  if (title === 'Argument and Counterargument Table') {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  // Argument Outline - Blue
  if (title === 'Argument Outline') {
    return {
      Icon: ListTree,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }

  // Authority Analysis Table - Green/Teal
  if (title === 'Authority Analysis Table') {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  // Bulk Opinion Summary - Cyan
  if (title === 'Bulk Opinion Summary') {
    return {
      Icon: ScanText,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  // Claim Identification and Analysis - Green/Teal
  if (title === 'Claim Identification and Analysis') {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  // Claim Summary - Cyan
  if (title === 'Claim Summary') {
    return {
      Icon: ScanText,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  // Claims Explorer - Orange
  if (title === 'Claims Explorer') {
    return {
      Icon: Scale,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }

  // Compare Documents - Cyan
  if (title === 'Compare Documents') {
    return {
      Icon: GitCompare,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  // Compare Opinions - Cyan
  if (title === 'Compare Opinions') {
    return {
      Icon: GitCompare,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  // Contract Provision Analysis - Green/Teal
  if (title === 'Contract Provision Analysis') {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  // Default fallback based on type
  if (lowerTitle.includes('research') || lowerTitle.includes('survey') || lowerTitle.includes('explorer')) {
    return {
      Icon: Scale,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-500',
      borderTopColor: 'border-t-amber-500'
    };
  }

  if (lowerTitle.includes('compare')) {
    return {
      Icon: GitCompare,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  if (lowerTitle.includes('summary')) {
    return {
      Icon: ScanText,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }

  if (lowerTitle.includes('analysis')) {
    return {
      Icon: Sheet,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }

  if (lowerTitle.includes('drafting')) {
    return {
      Icon: SquarePen,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }

  // Default fallback
  return {
    Icon: Sheet,
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-600',
    borderTopColor: 'border-t-gray-600'
  };
};

const INITIAL_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Memo Routing — Personal Doctrine',
    type: 'output-guideline',
    practiceArea: 'General Practice',
    dateSaved: '2026-03-20T00:00:00Z',
    lastTested: null,
    author: 'You',
    scope: 'personal',
    uploadedDocuments: [
      { name: 'Memo Format Guidelines.pdf', size: 125000, type: 'application/pdf' }
    ],
    purpose: 'Load when deciding whether to produce a formal memo vs. a direct answer. My rule: if the attorney will file it, send it to a client, or attach it to a matter — it\'s a memo. If they\'re asking me a question to think through — it\'s an answer. Do NOT load for research retrieval requests (\'find cases on X\') or scope-limited requests (\'just the key point\').',
    content: `---
name: Memo Routing — Personal Doctrine
type: output_guideline
version: 1.0.0
practice_area: General Practice
description: "Load when deciding whether to produce a formal memo vs. a direct answer. My rule: if the attorney will file it, send it to a client, or attach it to a matter — it's a memo. If they're asking me a question to think through — it's an answer. Do NOT load for research retrieval requests ('find cases on X') or scope-limited requests ('just the key point')."
triggers:
- memorandum
- formal analysis
- draft a memo
- write up the analysis
---

# Memo Routing — Personal Doctrine

## My rule
The format follows the destination, not the complexity.
A complex answer can stay conversational.
A simple point can be a memo if it's going on file.

## Positive triggers
- "Memo to file"
- "Something I can send to the partner"
- "Analysis to attach to the matter"
- "Formal write-up"

## Negative triggers (answer directly, no memo)
- "Quick question"
- "What's the rule on X"
- "Find me cases on Y"
- "Just the key point"

## Format gate
Before drafting any memo: ask — is this going somewhere, or is this helping them think?
Going somewhere → CREAC memo.
Helping them think → direct answer.

## Quality check
- [ ] Does the Brief Answer lead with yes/no/likely?
- [ ] Does every legal proposition have a [@case.slug.N] citation?
- [ ] Does every fact trace to a [@doc.filename.N] citation?
- [ ] Is the CREAC structure visible (C → R → E → A → C per issue)?`,
  },
  {
    id: '2',
    name: 'Memo Writing — Output Framework',
    type: 'output-guideline',
    practiceArea: 'General Practice',
    dateSaved: '2026-05-12T00:00:00Z',
    lastTested: null,
    author: 'You',
    scope: 'personal',
    uploadedDocuments: [],
    purpose: 'Apply this skill when writing formal memos or direct answers. Guides tone, scope, and structure based on destination.',
    content: `---
name: Memo Writing — Output Framework
type: output_guideline
version: 1.0.0
practice_area: General Practice
description: "Apply this skill when writing formal memos or direct answers. Guides tone, scope, and structure based on destination."
triggers:
- draft memo
- write answer
- legal analysis
- client communication
---

# Memo Writing — Output Framework

## Steps

### 1. Identify the destination
Determine where the output is going. If it will be filed with a court, sent to a client, or attached to a matter — route to memo. If the attorney is asking a question to think something through — route to direct answer.

### 2. Check for exclusions
Do not load this skill for research retrieval requests ("find cases on X") or scope-limited requests ("just the key point"). Pass those through without routing.

### 3. Apply tone and scope
For memos: structure formally with headings, citations, and a clear legal issue statement. For direct answers: respond conversationally and concisely, professional but not stiff.

### 4. Enforce content boundaries
Regardless of output format, never include legal advice or opinions. Stick to analysis, summary, and explanation only.

### 5. Confirm jurisdiction framing
Apply federal law as the default jurisdictional lens for all client communications unless the matter specifies otherwise.`,
  },
  {
    id: '3',
    name: 'SaaS Limitation of Liability - Personal Doctrine',
    type: 'output-guideline',
    practiceArea: 'Commercial Contracts',
    dateSaved: '2026-03-15T00:00:00Z',
    lastTested: null,
    author: 'You',
    scope: 'personal',
    uploadedDocuments: [
      { name: 'SaaS Liability Cap Examples.docx', size: 78000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
  },
  {
    id: '4',
    name: 'Contract Risk Scoring',
    type: 'capability',
    practiceArea: 'Commercial Contracts',
    dateSaved: '2026-03-18T00:00:00Z',
    lastTested: null,
    author: 'You',
    scope: 'personal',
    uploadedDocuments: [
      { name: 'Risk Scoring Matrix.xlsx', size: 52000, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    ],
  },
  {
    id: '5',
    name: 'Indemnification Clause Library',
    type: 'content-tool',
    practiceArea: 'Commercial Contracts',
    dateSaved: '2026-03-20T00:00:00Z',
    lastTested: null,
    author: 'You',
    scope: 'personal',
    uploadedDocuments: [
      { name: 'Standard Indemnification Clauses.docx', size: 45000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { name: 'IP Indemnification Examples.pdf', size: 230000, type: 'application/pdf' }
    ],
    content: `# Indemnification Clause Library — Content Tool

## Type
content_tool

## Purpose
Provides ready-to-use indemnification clause templates for various contexts.

## Templates

### Standard Mutual Indemnification
\`\`\`
Each party ("Indemnifying Party") shall indemnify, defend, and hold harmless the other party and its officers, directors, employees, and agents ("Indemnified Parties") from and against any third-party claims, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) the Indemnifying Party's breach of this Agreement; (b) the Indemnifying Party's negligence or willful misconduct; or (c) any claim that the Indemnifying Party's materials infringe any intellectual property right of a third party.
\`\`\`

### Vendor-Favorable IP Indemnification
\`\`\`
Vendor shall indemnify and defend Customer against any third-party claim alleging that the Service, as provided by Vendor and used in accordance with this Agreement, infringes any United States patent, copyright, or trademark. Vendor's obligations under this Section shall not apply to claims arising from: (i) modifications to the Service not made by Vendor; (ii) combination of the Service with materials not provided by Vendor; (iii) Customer's continued use after notice of alleged infringement; or (iv) Customer-provided content or data.
\`\`\`

### Customer Data Indemnification
\`\`\`
Customer shall indemnify and hold harmless Vendor from any claims arising out of or related to Customer Data, including any claim that Customer Data infringes or misappropriates any third-party intellectual property rights or violates any applicable law or regulation. This indemnification obligation shall survive termination of this Agreement.
\`\`\`

### Broad Vendor Indemnification (Customer-Favorable)
\`\`\`
Vendor shall indemnify, defend, and hold harmless Customer and its affiliates, and their respective officers, directors, employees, agents, successors, and assigns from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees and court costs) arising out of or relating to: (a) any breach of Vendor's representations, warranties, or obligations under this Agreement; (b) any negligent or wrongful act or omission of Vendor or its personnel; (c) any claim that the Services or Deliverables infringe any intellectual property right; (d) any unauthorized access to or breach of Customer Data in Vendor's possession or control; or (e) any violation of applicable law by Vendor in connection with performance under this Agreement.
\`\`\`

## Usage Notes
- Always review indemnification in conjunction with limitation of liability provisions
- Ensure carve-outs align with the specific transaction context
- Consider insurance requirements as backstop for indemnification obligations`
  },
  {
    id: '6',
    name: 'Master Services Agreement - Firm Standard Positions',
    type: 'output-guideline',
    practiceArea: 'Commercial Contracts',
    dateSaved: '2024-01-15T00:00:00Z',
    lastTested: null,
    author: 'Sarah Mitchell',
    scope: 'firm',
    uploadedDocuments: [
      { name: 'Firm MSA Template v3.2.docx', size: 185000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
  },
  {
    id: '7',
    name: 'Litigation Hold - Trigger Checklist',
    type: 'capability',
    practiceArea: 'Litigation',
    dateSaved: '2024-02-20T00:00:00Z',
    lastTested: null,
    author: 'James Okafor',
    scope: 'firm',
    uploadedDocuments: [
      { name: 'Lit Hold Procedures.pdf', size: 92000, type: 'application/pdf' }
    ],
  },
  {
    id: '8',
    name: 'SaaS Vendor Risk - Due Diligence Framework',
    type: 'content-tool',
    practiceArea: 'Commercial Contracts',
    dateSaved: '2024-03-05T00:00:00Z',
    lastTested: null,
    author: 'Rachel Torres',
    scope: 'firm',
    uploadedDocuments: [
      { name: 'Vendor DD Questionnaire.docx', size: 156000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ],
  },
];

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'AI Jurisdiction Surveys',
    description: 'Get a survey of the law across jurisdictions based on a legal research question',
    tags: ['Client-Facing'],
    isFavorite: false,
    promptText: 'Please provide a comprehensive survey of the law across different jurisdictions regarding: [LEGAL QUESTION]',
    files: [],
    taskType: 'research',
    practiceArea: 'general',
  },
  {
    id: '2',
    title: 'Agreement Clause Drafting',
    description: 'Create a specific clause for a given agreement type',
    tags: [],
    isFavorite: false,
    promptText: 'Draft a [CLAUSE TYPE] clause for a [AGREEMENT TYPE] that addresses the following requirements: [REQUIREMENTS]',
    files: [],
    taskType: 'drafting',
    practiceArea: 'contracts',
  },
  {
    id: '3',
    title: 'AI-Assisted Research US',
    description: 'Get relevant answers to legal research questions with links to Westlaw authority',
    tags: ['Internal'],
    isFavorite: false,
    promptText: 'Research the following legal question and provide relevant answers with citations to Westlaw authority: [QUESTION]',
    files: [],
    taskType: 'research',
    practiceArea: 'general',
  },
  {
    id: '4',
    title: 'Allegation Summary Email',
    description: 'Compose email explaining allegations and defense steps to client',
    tags: ['Client-Facing', 'Urgent'],
    isFavorite: true,
    promptText: 'Draft a professional email to the client summarizing the allegations and outlining the recommended defense strategy.',
    files: [],
    taskType: 'communication',
    practiceArea: 'litigation',
  },
  {
    id: '5',
    title: 'Amendment Term Analysis',
    description: 'Understand contract terms relating to amending and modifying an agreement',
    tags: ['Due Diligence'],
    isFavorite: true,
    promptText: 'Analyze the amendment and modification provisions in the attached contract and explain their implications.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'contracts',
  },
  {
    id: '6',
    title: 'Argument and Counterargument Table',
    description: 'Visualize arguments and corresponding counterarguments',
    tags: ['Trial Prep'],
    isFavorite: true,
    promptText: 'Create a table showing the main arguments and corresponding counterarguments for this legal matter.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '7',
    title: 'Argument Outline',
    description: 'Breakdown all arguments made within the provided documents',
    tags: ['Trial Prep'],
    isFavorite: true,
    promptText: 'Provide a detailed outline of all arguments presented in the attached documents.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
    iconName: 'ListTree',
    iconColor: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
  {
    id: '8',
    title: 'Authority Analysis Table',
    description: 'Create a list of case law, statutes, and other precedent cited in a litigation document',
    tags: ['Motion Practice'],
    isFavorite: false,
    promptText: 'Extract and analyze all legal authorities cited in the attached litigation document.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '9',
    title: 'Bulk Opinion Summary',
    description: 'Summarize court holdings and their effects on cases',
    tags: ['Case Law Research'],
    isFavorite: false,
    promptText: 'Provide summaries of the court holdings and their potential impact on similar cases.',
    files: [],
    taskType: 'summarization',
    practiceArea: 'litigation',
  },
  {
    id: '10',
    title: 'Claim Identification and Analysis',
    description: 'Determine claims against defendants and outline supporting facts',
    tags: ['Discovery'],
    isFavorite: false,
    promptText: 'Identify all claims against the defendants and outline the supporting facts for each claim.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '11',
    title: 'Claim Summary',
    description: "Create a formatted summary of a pleading's claims",
    tags: [],
    isFavorite: false,
    promptText: 'Summarize all claims presented in the pleading in a clear, structured format.',
    files: [],
    taskType: 'summarization',
    practiceArea: 'litigation',
  },
  {
    id: '12',
    title: 'Claims Explorer',
    description: 'Find potential claims for your fact pattern and highlight specific statutory, common law, and constitutional cause...',
    tags: ['Case Assessment', 'Internal'],
    isFavorite: false,
    promptText: 'Analyze the fact pattern and identify all potential claims including statutory, common law, and constitutional causes of action.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '13',
    title: 'Compare Documents',
    description: 'Compare documents side by side to identify differences',
    tags: ['Due Diligence'],
    isFavorite: false,
    promptText: 'Compare the attached documents and identify all significant differences and changes.',
    files: [],
    taskType: 'multi-doc-research',
    practiceArea: 'general',
  },
  {
    id: '14',
    title: 'Compare Opinions',
    description: 'Compare substantive analysis in court opinions',
    tags: ['Case Law Research'],
    isFavorite: false,
    promptText: 'Compare the substantive legal analysis in the attached court opinions and highlight key differences.',
    files: [],
    taskType: 'multi-doc-research',
    practiceArea: 'litigation',
  },
  {
    id: '15',
    title: 'Contract Provision Analysis',
    description: 'Identify and group provisions or clause by topic',
    tags: ['Due Diligence'],
    isFavorite: false,
    promptText: 'Analyze the contract and organize all provisions by topic or clause type.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'contracts',
  },
];

export function Knowledge() {
  let navigate: ReturnType<typeof useNavigate> | undefined;
  let location: ReturnType<typeof useLocation> | undefined;
  
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (e) {
    // Router not available in preview mode
  }
  
  const { savedAlerts } = useMonitoring();
  const [isKnowledgePanelOpen, setIsKnowledgePanelOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');

  // Check if we should open monitoring section from navigation state
  useEffect(() => {
    if (location?.state && (location.state as any).openMonitoring) {
      setActiveSection('monitoring-alerts');
      setIsKnowledgePanelOpen(true);
    }
  }, [location?.state]);
  const [activeScope, setActiveScope] = useState<ScopeType>('personal');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promptSource, setPromptSource] = useState('my-prompts');
  const [taskTypeFilters, setTaskTypeFilters] = useState<string[]>([]);
  const [practiceAreaFilters, setPracticeAreaFilters] = useState<string[]>([]);
  const [tagsFilters, setTagsFilters] = useState<string[]>([]);

  // Skills state
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [isNewSkillModalOpen, setIsNewSkillModalOpen] = useState(false);
  const [isEditSkillModalOpen, setIsEditSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isShareSkillModalOpen, setIsShareSkillModalOpen] = useState(false);
  const [isShareConfirmationModalOpen, setIsShareConfirmationModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isSkillDeletedModalOpen, setIsSkillDeletedModalOpen] = useState(false);
  const [deletedSkillCount, setDeletedSkillCount] = useState(0);
  const [skillToShare, setSkillToShare] = useState<Skill | null>(null);
  const [skillsToShare, setSkillsToShare] = useState<Skill[]>([]);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set());
  const [sharedToFirmSkills, setSharedToFirmSkills] = useState<Set<string>>(new Set());
  const [lastShareTarget, setLastShareTarget] = useState<'firm' | 'workspace'>('firm');
  const [lastWorkspaceName, setLastWorkspaceName] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<'name' | 'type' | 'dateSaved' | 'lastTested' | 'author'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isImportSkillModalOpen, setIsImportSkillModalOpen] = useState(false);

  // Reopen panel when navigating to Knowledge route
  useEffect(() => {
    setIsKnowledgePanelOpen(true);
  }, [location?.pathname]);

  // Listen for Knowledge button clicks from sidebar
  useEffect(() => {
    const handleOpenPanel = () => {
      setIsKnowledgePanelOpen(true);
    };

    window.addEventListener('openKnowledgePanel', handleOpenPanel);
    return () => window.removeEventListener('openKnowledgePanel', handleOpenPanel);
  }, []);

  useEffect(() => {
    return () => {
      setIsDrawerOpen(false);
    };
  }, []);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTaskType = taskTypeFilters.length === 0 || taskTypeFilters.includes(prompt.taskType);
    const matchesPracticeArea = practiceAreaFilters.length === 0 || practiceAreaFilters.includes(prompt.practiceArea);
    const matchesTags = tagsFilters.length === 0 || (prompt.tags && tagsFilters.some(tag => prompt.tags.includes(tag)));

    return matchesSearch && matchesTaskType && matchesPracticeArea && matchesTags;
  });

  const handleToggleFavorite = (promptId: string) => {
    setPrompts(prompts.map(p =>
      p.id === promptId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleOpenPrompt = (prompt: Prompt) => {
    const { Icon: PromptIcon, iconColor } = getPromptIcon(prompt.title);
    const enrichedPrompt = {
      ...prompt,
      iconName: PromptIcon.displayName || PromptIcon.name || 'Sheet',
      iconColor: iconColor || 'text-gray-600',
    };
    setSelectedPrompt(enrichedPrompt);
    setIsDrawerOpen(true);
  };

  const handleNewPrompt = () => {
    setSelectedPrompt(null);
    setIsDrawerOpen(true);
  };

  const handleSavePrompt = (updatedPrompt: Prompt) => {
    if (selectedPrompt) {
      setPrompts(prompts.map(p =>
        p.id === updatedPrompt.id ? updatedPrompt : p
      ));
    } else {
      setPrompts([...prompts, { ...updatedPrompt, isFavorite: false }]);
    }
  };

  // Skills handlers
  const handleSaveSkill = (newSkill: any) => {
    const skill: Skill = {
      ...newSkill,
      scope: activeScope,
      lastTested: null,
    };
    setSkills([...skills, skill]);
  };

  const handleImportSkill = (importedSkill: Skill) => {
    setSkills([...skills, importedSkill]);
    setToastMessage('Skill imported successfully.');
    setShowToast(true);
  };

  const handleUpdateSkill = (updatedSkill: Skill) => {
    setSkills(skills.map(s => s.id === updatedSkill.id ? updatedSkill : s));
    setToastMessage('Your skill is saved successfully.');
    setShowToast(true);
  };

  const handleDeleteSkill = (skillId: string) => {
    setSkills(skills.filter(s => s.id !== skillId));
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsEditSkillModalOpen(true);
  };

  const filteredSkills = skills
    .filter(skill => {
      const matchesScope = skill.scope === activeScope;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.practiceArea.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesScope && matchesSearch;
    })
    .sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortColumn) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'dateSaved':
          aVal = new Date(a.dateSaved).getTime();
          bVal = new Date(b.dateSaved).getTime();
          break;
        case 'lastTested':
          aVal = a.lastTested || '';
          bVal = b.lastTested || '';
          break;
        case 'author':
          aVal = a.author.toLowerCase();
          bVal = b.author.toLowerCase();
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleShareSkill = (skill: Skill) => {
    setSkillToShare(skill);
    setSkillsToShare([skill]);
    setIsShareSkillModalOpen(true);
  };

  const handleTestSkill = (skill: Skill) => {
    // Navigate to skill testing page
    navigate?.('/knowledge/test-skill', { state: { skillName: skill.name } });
  };

  const handleShareSubmit = (target: 'firm' | 'workspace', workspaceId?: string, note?: string) => {
    console.log('Sharing skill:', { target, workspaceId, note });
    
    // Track share target for confirmation modal
    setLastShareTarget(target);
    
    // Map workspace IDs to names
    const workspaceNames: Record<string, string> = {
      'hernandez-pacific': 'Hernandez v. Pacific Builders Inc.',
      'blue-ridge-trust': 'In re: Blue Ridge Trust 2025',
      'meridian-tech': 'Meridian Tech Acquisition'
    };
    
    // Update skill metadata based on share target
    if (target === 'firm') {
      const newSharedSkills = new Set(sharedToFirmSkills);
      skillsToShare.forEach(skill => newSharedSkills.add(skill.id));
      setSharedToFirmSkills(newSharedSkills);
      
      // Update skills to mark as shared to firm
      setSkills(prevSkills => prevSkills.map(s => {
        if (skillsToShare.some(skill => skill.id === s.id)) {
          return { ...s, sharedToFirm: 'pending' as const };
        }
        return s;
      }));
    } else if (target === 'workspace' && workspaceId) {
      const workspaceName = workspaceNames[workspaceId] || '';
      setLastWorkspaceName(workspaceName);
      
      // Update skills to add workspace to sharedWorkspaces
      setSkills(prevSkills => prevSkills.map(s => {
        if (skillsToShare.some(skill => skill.id === s.id)) {
          const existingWorkspaces = s.sharedWorkspaces || [];
          const isAlreadyShared = existingWorkspaces.some(w => w.id === workspaceId);
          if (!isAlreadyShared) {
            return {
              ...s,
              sharedWorkspaces: [...existingWorkspaces, { id: workspaceId, name: workspaceName }]
            };
          }
        }
        return s;
      }));
    }
    
    // Show confirmation modal
    setIsShareConfirmationModalOpen(true);
    
    // In real implementation, would submit to API
  };

  const handleToggleSelectAll = () => {
    if (selectedSkillIds.size === filteredSkills.length) {
      setSelectedSkillIds(new Set());
    } else {
      setSelectedSkillIds(new Set(filteredSkills.map(s => s.id)));
    }
  };

  const handleToggleSkillSelection = (skillId: string) => {
    const newSelection = new Set(selectedSkillIds);
    if (newSelection.has(skillId)) {
      newSelection.delete(skillId);
    } else {
      newSelection.add(skillId);
    }
    setSelectedSkillIds(newSelection);
  };

  const handleDeleteSelected = () => {
    if (selectedSkillIds.size === 0) return;
    setSkillToDelete(null);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteSingleSkill = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteSkills = () => {
    let count: number;

    if (skillToDelete) {
      // Single skill deletion from Recent skills card
      setSkills(skills.filter(s => s.id !== skillToDelete.id));
      count = 1;
      setSkillToDelete(null);
    } else {
      // Bulk deletion from Custom Skills table
      count = selectedSkillIds.size;
      setSkills(skills.filter(s => !selectedSkillIds.has(s.id)));
      setSelectedSkillIds(new Set());
    }

    setDeletedSkillCount(count);
    setIsDeleteConfirmationOpen(false);
    setIsSkillDeletedModalOpen(true);
  };

  const handleSort = (column: 'name' | 'type' | 'dateSaved' | 'lastTested' | 'author') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderDashboard = () => {
    // Filter skills by scope
    const scopedSkills = skills.filter(s => s.scope === activeScope).slice(0, 4);

    return (
    <div className="max-w-5xl mx-auto px-8 pt-[50px] pb-8">
      <div className="mb-7">
        <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1]">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-4 mb-12">
        <Toggle
          value={activeScope}
          onChange={(value) => setActiveScope(value as ScopeType)}
          options={[
            { value: 'personal', label: 'Personal' },
            { value: 'firm', label: 'Firm' },
          ]}
        />
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search knowledge base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-white border border-[#d2d2d2] rounded-lg pl-3.5 pr-9 text-[16px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
          />
          <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-[rgba(255,255,255,0.01)]">
            <Search className="size-4.5 text-[#212223]" />
          </div>
        </div>
      </div>

      {/* Recent Instructions */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-['Clario'] text-[#212223]">Recent instructions</h2>
            <p className="text-[13px] text-[#666666] font-['Source_Sans_3'] mt-0.5">
              {activeScope === 'personal' ? '3 instruction sets created' : '3 firm-wide instruction sets'}
            </p>
          </div>
          <button
            onClick={() => setActiveSection('instructions')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {activeScope === 'personal' ? (
            <>
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Professional Legal Writing</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Formal tone, precise language, and citation standards for legal documents</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Modified 2 hours ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Client Communication</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Accessible language, empathetic tone for client-facing correspondence</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Modified 1 day ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Research Analysis</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Comprehensive case analysis with detailed citations and precedent review</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Modified 3 days ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Firm Standard Brief Format</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Standardized formatting, citation style, and structure for all firm briefs</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Firm-wide • Modified 1 week ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Contract Review Standards</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Comprehensive checklist and risk assessment framework for contract analysis</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Firm-wide • Modified 2 weeks ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Brain className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-0">Litigation Response Protocol</h3>
                </div>
                <p className="text-[13px] text-gray-500 mb-3">Procedures and guidelines for responding to discovery requests and motions</p>
                <div className="flex gap-1.5 items-center">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                    <p className="leading-[1.2]">Firm-wide • Modified 1 month ago</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                      >
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Edit className="size-3.5 mr-0 text-gray-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="size-3.5 mr-0 text-gray-500" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTree className="size-3.5 mr-0 text-gray-500" />
                        Assign to workspace
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="size-3.5 mr-0 text-gray-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Skills */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-['Clario'] text-[#212223]">Recent skills</h2>
          <button
            onClick={() => setActiveSection('custom-skills')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {scopedSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => {
                setSelectedSkill(skill);
                setIsEditSkillModalOpen(true);
              }}
              onShare={() => {
                handleShareSkill(skill);
              }}
              onDelete={() => {
                handleDeleteSingleSkill(skill);
              }}
              onTest={() => {
                handleTestSkill(skill);
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent Model Documents */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-['Clario'] text-[#212223]">Recent model documents</h2>
          <button
            onClick={() => setActiveSection('model-documents')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {activeScope === 'personal' ? (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Brief template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">2 hours ago</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">156 KB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">NDA template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">3 days ago</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">412 KB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Motion template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">5 days ago</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">287 KB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Correspondence template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">1 week ago</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">287 KB</p>
                </div>
              </div>
            </div>
          </div>
            </>
          ) : (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Brief template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">324 KB</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">NDA template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">521 KB</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Motion template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">198 KB</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">4 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="h-20 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={docThumbnail}
                alt="Document preview"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1 truncate">Correspondence template.docx</h3>
              <div className="flex gap-1.5 items-center">
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">276 KB</p>
                </div>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Prompts */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-['Clario'] text-[#212223]">Recent prompts</h2>
          <button
            onClick={() => setActiveSection('prompts')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {activeScope === 'personal' ? (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <SquarePen className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">Agreement Clause Drafting</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Create a specific clause for a given agreement type</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">12 uses</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Sheet className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">Amendment Term Analysis</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Understand contract terms relating to amending and modifying</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">8 uses</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">Yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Scale className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">AI Jurisdiction Surveys</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Get a survey of the law across jurisdictions</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">23 uses</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">2 days ago</p>
              </div>
            </div>
          </div>
            </>
          ) : (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Scale className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">Compliance assessment</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">across regulatory frameworks</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">3 hours ago</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">24 uses</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <SquarePen className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">Prepare client memo</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">summarizing case developments</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">6 hours ago</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">15 uses</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Sheet className="size-5 text-[#666]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight pt-2">Risk analysis</h3>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">for M&A transactions</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">1 week ago</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">19 uses</p>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Question Sets */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-['Clario'] text-[#212223]">Recent question sets</h2>
          <button
            onClick={() => setActiveSection('question-sets')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {activeScope === 'personal' ? (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223]">Contract Review Checklist</h3>
              <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full">15 questions</span>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Standard questions for reviewing commercial contracts</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">34 docs</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">Yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223]">Discovery Analysis</h3>
              <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full">8 questions</span>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Key questions for analyzing discovery materials</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">127 docs</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">1 week ago</p>
              </div>
            </div>
          </div>
            </>
          ) : (
            <>
          <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223]">Employee Onboarding Legal Checklist</h3>
              <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full">22 questions</span>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Comprehensive checklist for new employee documentation</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">89 docs</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">2 days ago</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223]">M&A Due Diligence Framework</h3>
              <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full">31 questions</span>
            </div>
            <p className="text-[13px] text-gray-500 mb-3">Essential questions for mergers and acquisitions review</p>
            <div className="flex gap-1.5 items-center">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">156 docs</p>
              </div>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                <p className="leading-[1.2]">5 days ago</p>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Monitoring & Alerts */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[20px] font-['Clario'] text-[#212223]">Monitoring & alerts</h2>
          <button
            onClick={() => setActiveSection('monitoring-alerts')}
            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {activeScope === 'personal' ? (
            <>
              {/* Show saved M&A alerts first */}
              {savedAlerts.slice(0, 2).map(alert => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => setActiveSection('monitoring-alerts')}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex items-center justify-center shrink-0 pt-0.5">
                      <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1">{alert.topic}</h3>
                      <p className="text-[13px] text-gray-500 mb-3 line-clamp-2">{alert.criteria}</p>
                      <div className="flex gap-1.5 items-center">
                        <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                          <p className="leading-[1.2]">Last scan {alert.lastScan.toLowerCase()}</p>
                        </div>
                        <div className="size-1 rounded-full bg-[#8A8A8A]" />
                        <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full capitalize">{alert.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show default alerts if no saved alerts or to fill the grid */}
              {savedAlerts.length === 0 && (
                <>
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => setActiveSection('monitoring-alerts')}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center shrink-0 pt-0.5">
                        <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1">Personal jurisdiction developments</h3>
                        <p className="text-[13px] text-gray-500 mb-3">Second Circuit cases on minimum contacts analysis</p>
                        <div className="flex gap-1.5 items-center">
                          <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                            <p className="leading-[1.2]">Last scan 2 days ago</p>
                          </div>
                          <div className="size-1 rounded-full bg-[#8A8A8A]" />
                          <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">3 new</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => setActiveSection('monitoring-alerts')}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center shrink-0 pt-0.5">
                        <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1">GDPR enforcement actions</h3>
                        <p className="text-[13px] text-gray-500 mb-3">EU data protection authority guidance and decisions</p>
                        <div className="flex gap-1.5 items-center">
                          <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                            <p className="leading-[1.2]">Last scan today</p>
                          </div>
                          <div className="size-1 rounded-full bg-[#8A8A8A]" />
                          <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">1 new</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {savedAlerts.length === 1 && (
                <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => setActiveSection('monitoring-alerts')}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex items-center justify-center shrink-0 pt-0.5">
                      <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1">Personal jurisdiction developments</h3>
                      <p className="text-[13px] text-gray-500 mb-3">Second Circuit cases on minimum contacts analysis</p>
                      <div className="flex gap-1.5 items-center">
                        <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                          <p className="leading-[1.2]">Last scan 2 days ago</p>
                        </div>
                        <div className="size-1 rounded-full bg-[#8A8A8A]" />
                        <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">3 new</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => setActiveSection('monitoring-alerts')}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] mb-1">SEC Disclosure Requirements</h3>
                    <p className="text-[13px] text-gray-500 mb-3">Updates to Regulation S-K and Form 10-K requirements</p>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                        <p className="leading-[1.2]">Last scan 1 day ago</p>
                      </div>
                      <div className="size-1 rounded-full bg-[#8A8A8A]" />
                      <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">2 new</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => setActiveSection('monitoring-alerts')}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex items-center justify-center shrink-0 pt-0.5">
                    <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-['Clario'] text-[#212223] mb-1">Employment Law Updates</h3>
                    <p className="text-[13px] text-gray-500 mb-3">Federal and state wage and hour law changes</p>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                        <p className="leading-[1.2]">Last scan 3 days ago</p>
                      </div>
                      <div className="size-1 rounded-full bg-[#8A8A8A]" />
                      <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

  const getSkillTypeLabel = (type: SkillType) => {
    const typeMap: Record<SkillType, { label: string }> = {
      'output-guideline': { label: 'Output guideline' },
      'capability': { label: 'Capability' },
      'content-tool': { label: 'Content tool' },
      'directing': { label: 'Directing' },
    };
    return typeMap[type] || typeMap['output-guideline'];
  };

  const renderSkillsCards = () => {
    return (
      <div className="pt-6">
        {/* Search and Sort Bar */}
        <div className="flex items-start justify-between h-9 mb-6">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-white border border-[#d2d2d2] rounded-lg pl-3.5 pr-9 text-[16.5px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
            />
            <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-[rgba(255,255,255,0.01)]">
              <Search className="size-4.5 text-[#212223]" />
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-9 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.01)] rounded-lg px-2.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
                <span className="text-[14.5px] font-['Clario'] text-[#212223]">
                  <span className="font-normal">Sort by:</span> <span className="font-medium">
                    {sortColumn === 'name' && sortDirection === 'asc' && 'Name'}
                    {sortColumn === 'name' && sortDirection === 'desc' && 'Name'}
                    {sortColumn === 'dateSaved' && sortDirection === 'desc' && 'Recent'}
                    {sortColumn === 'dateSaved' && sortDirection === 'asc' && 'Oldest'}
                    {sortColumn === 'lastTested' && sortDirection === 'desc' && 'Last tested'}
                    {sortColumn === 'lastTested' && sortDirection === 'asc' && 'Last tested'}
                    {sortColumn === 'type' && sortDirection === 'asc' && 'Type'}
                    {sortColumn === 'type' && sortDirection === 'desc' && 'Type'}
                  </span>
                </span>
                <ChevronDown className="size-4 text-[#212223]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onSelect={() => { setSortColumn('name'); setSortDirection('asc'); }}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setSortColumn('dateSaved'); setSortDirection('desc'); }}>
                Recent
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setSortColumn('lastTested'); setSortDirection('desc'); }}>
                Last tested
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => { setSortColumn('type'); setSortDirection('asc'); }}>
                Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => {
                setSelectedSkill(skill);
                setIsEditSkillModalOpen(true);
              }}
              onShare={() => {
                handleShareSkill(skill);
              }}
              onDelete={() => {
                handleDeleteSingleSkill(skill);
              }}
              onTest={() => {
                handleTestSkill(skill);
              }}
            />
          ))}
        </div>
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <Blocks className="size-12 text-gray-300 mx-auto mb-3" />
            <p className="text-[15px] text-gray-500">No skills found</p>
          </div>
        )}
      </div>
    );
  };

  const renderSkillsTable = () => {
    const allSelected = filteredSkills.length > 0 && selectedSkillIds.size === filteredSkills.length;

    return (
      <div className="overflow-hidden pt-6">
        {/* Search and Sort Bar */}
        <div className="flex items-start justify-between h-9 mb-6">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-white border border-[#d2d2d2] rounded-lg pl-3.5 pr-9 text-[16.5px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
            />
            <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-[rgba(255,255,255,0.01)]">
              <Search className="size-4.5 text-[#212223]" />
            </div>
          </div>
        </div>

        {/* Select All Toolbar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2 py-1">
            <div
              onClick={handleToggleSelectAll}
              className={`relative rounded-[2px] shrink-0 size-[16px] cursor-pointer ${allSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}
            >
              <div className="flex items-center justify-center size-full">
                {allSelected && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={`absolute border ${allSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
            </div>
            <p className="text-[15px] font-['Source_Sans_3'] font-normal leading-[1.35] text-[#212223]">Select all</p>
          </div>
          <div className="flex gap-2 items-start font-['Source_Sans_3'] font-semibold leading-[1.35] text-[#212223] text-[16px]">
            <p>{selectedSkillIds.size}</p>
            <p>selected</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedSkillIds.size === 0}
              className={`rounded-[4px] h-[32px] px-2 flex items-center justify-center gap-2 transition-colors ${selectedSkillIds.size > 0 ? 'hover:bg-[#edf2f0] cursor-pointer' : 'cursor-default'}`}
            >
              <Trash2 className={`size-4 ${selectedSkillIds.size > 0 ? 'text-[#212223]' : 'text-[#8a8a8a]'}`} />
              <span className={`text-[16px] font-['Clario'] font-medium leading-[1.35] whitespace-nowrap ${selectedSkillIds.size > 0 ? 'text-[#212223]' : 'text-[#8a8a8a]'}`}>Delete</span>
            </button>
            <button
              onClick={() => {
                if (selectedSkillIds.size > 0) {
                  const selectedSkillsArray = skills.filter(s => selectedSkillIds.has(s.id));
                  setSkillToShare(selectedSkillsArray.length === 1 ? selectedSkillsArray[0] : null);
                  setSkillsToShare(selectedSkillsArray);
                  setIsShareSkillModalOpen(true);
                }
              }}
              disabled={selectedSkillIds.size === 0}
              className={`rounded-[4px] h-[32px] px-2 flex items-center justify-center gap-2 transition-colors ${selectedSkillIds.size > 0 ? 'hover:bg-[#edf2f0] cursor-pointer' : 'cursor-default'}`}
            >
              <Share2 className="size-4 shrink-0 text-[#8a8a8a]" />
              <span className={`text-[16px] font-['Clario'] font-medium leading-[1.35] whitespace-nowrap ${selectedSkillIds.size > 0 ? 'text-[#212223]' : 'text-[#8a8a8a]'}`}>Share</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white border border-[#ededed]">
          <table className="w-full border-collapse">
            <thead className="bg-[#f0f2f1]">
              <tr>
                <th className="pl-6 pr-3 min-h-[40px] h-[40px] w-[60px] text-center border-t border-b border-[#ededed]">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Select</span>
                  </div>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] text-left border-t border-b border-[#ededed]">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 cursor-pointer group"
                  >
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Name</span>
                    {sortColumn === 'name' ? (
                      sortDirection === 'desc' ? (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 13L9 3M9 3L6 6M9 3L12 6" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 3L9 13M9 13L6 10M9 13L12 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    ) : (
                      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="M6 3L6 13M6 3L3 6M6 3L9 6M12 13L12 3M12 13L15 10M12 13L9 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] w-[130px] text-left border-t border-b border-[#ededed] group">
                  <button
                    onClick={() => handleSort('type')}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Type</span>
                    {sortColumn === 'type' ? (
                      sortDirection === 'desc' ? (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 13L9 3M9 3L6 6M9 3L12 6" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 3L9 13M9 13L6 10M9 13L12 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    ) : (
                      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="M6 3L6 13M6 3L3 6M6 3L9 6M12 13L12 3M12 13L15 10M12 13L9 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] w-[100px] text-left border-t border-b border-[#ededed] group whitespace-nowrap">
                  <button
                    onClick={() => handleSort('dateSaved')}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Date saved</span>
                    {sortColumn === 'dateSaved' ? (
                      sortDirection === 'desc' ? (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 13L9 3M9 3L6 6M9 3L12 6" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 3L9 13M9 13L6 10M9 13L12 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    ) : (
                      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="M6 3L6 13M6 3L3 6M6 3L9 6M12 13L12 3M12 13L15 10M12 13L9 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] w-[100px] text-left border-t border-b border-[#ededed] group whitespace-nowrap">
                  <button
                    onClick={() => handleSort('lastTested')}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Last tested</span>
                    {sortColumn === 'lastTested' ? (
                      sortDirection === 'desc' ? (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 13L9 3M9 3L6 6M9 3L12 6" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0">
                          <path d="M9 3L9 13M9 13L6 10M9 13L12 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    ) : (
                      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="M6 3L6 13M6 3L3 6M6 3L9 6M12 13L12 3M12 13L15 10M12 13L9 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] w-[110px] text-left border-t border-b border-[#ededed] group">
                  <button
                    onClick={() => handleSort('author')}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Author</span>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M6 3L6 13M6 3L3 6M6 3L9 6M12 13L12 3M12 13L15 10M12 13L9 10" stroke="#212223" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </th>
                <th className="px-3 min-h-[40px] h-[40px] w-[120px] text-center border-t border-b border-[#ededed]">
                  <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => {
                const typeInfo = getSkillTypeLabel(skill.type);
                const isSelected = selectedSkillIds.has(skill.id);

                return (
                  <tr key={skill.id} className="group hover:bg-[#edf2f0] transition-colors">
                    <td className="pl-6 pr-3 py-2 min-h-[40px] border-b border-[#ededed]">
                      <div className="flex items-center justify-center">
                        <div
                          onClick={() => handleToggleSkillSelection(skill.id)}
                          className={`relative rounded-[2px] shrink-0 size-[16px] cursor-pointer ${isSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}
                        >
                          <div className="flex items-center justify-center size-full">
                            {isSelected && (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className={`absolute border ${isSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 min-h-[40px] border-b border-[#ededed]">
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className="text-[14px] font-['Source_Sans_3'] font-normal text-[#404040] hover:text-[#314b3e] text-left leading-[1.2]"
                        >
                          {skill.name}
                        </button>
                        {(skill.sharedToFirm || (skill.sharedWorkspaces && skill.sharedWorkspaces.length > 0)) && (
                          <div className="flex items-center gap-2">
                            {skill.sharedToFirm === 'pending' && (
                              <span className="text-[12px] font-['Source_Sans_3'] font-normal text-[#666] bg-[#f5f5f5] px-2 py-0.5 rounded">
                                <span className="font-semibold">Firm:</span> pending
                              </span>
                            )}
                            {skill.sharedWorkspaces?.map((workspace) => (
                              <span
                                key={workspace.id}
                                className="text-[12px] font-['Source_Sans_3'] font-normal text-[#9c6500] bg-[#F8EADD] px-2 py-0.5 rounded"
                              >
                                <span className="font-semibold">Workspace:</span> {workspace.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 min-h-[40px] border-b border-[#ededed] whitespace-nowrap">
                      <span className="relative text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full inline-block">
                        <div aria-hidden="true" className="absolute border border-transparent group-hover:border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-full transition-colors" />
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-3 py-2 min-h-[40px] text-[14px] font-['Source_Sans_3'] font-normal text-[#404040] leading-[1.2] border-b border-[#ededed] whitespace-nowrap">
                      {new Date(skill.dateSaved).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-3 py-2 min-h-[40px] text-[14px] font-['Source_Sans_3'] font-normal text-[#404040] leading-[1.2] border-b border-[#ededed] whitespace-nowrap">
                      {skill.lastTested || 'Never'}
                    </td>
                    <td className="px-3 py-2 min-h-[40px] text-[14px] font-['Source_Sans_3'] font-normal text-[#404040] leading-[1.2] border-b border-[#ededed] whitespace-nowrap">
                      {skill.author}
                    </td>
                    <td className="px-3 py-2 min-h-[40px] border-b border-[#ededed]">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestSkill(skill);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-[#212223]"
                          title="Test"
                        >
                          <Beaker className="size-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareSkill(skill);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-[#212223]"
                          title="Share"
                        >
                          <Share className="size-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSkills(skills.filter(s => s.id !== skill.id));
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-[#212223]"
                          title="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredSkills.length === 0 && (
          <div className="py-12 text-center">
            <Blocks className="size-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-[15px] font-['Clario'] font-medium text-gray-700 mb-1">No skills yet</h3>
            <p className="text-[14px] text-gray-500">Create your first skill to get started</p>
          </div>
        )}
      </div>
    );
  };

  const renderPlaceholder = (icon: any, title: string, description: string) => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        {icon}
        <h3 className="text-[16px] font-['Clario'] font-medium text-gray-700 mb-2">{title}</h3>
        <p className="text-[14px] text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-full flex bg-[#fcfcfc]">
      {/* Left Sidebar */}
      {isKnowledgePanelOpen && (
        <div className="w-[280px] min-[1440px]:w-[328px] bg-[#fcfcfc] border-r border-[#E5E5E5] flex flex-col shrink-0">
          {/* Close Button Row */}
          <div className="flex items-center justify-end pr-6 pt-6 pb-2">
            <button
              onClick={() => setIsKnowledgePanelOpen(false)}
              className="text-[#808080] hover:bg-gray-100 p-1 rounded"
            >
              <PanelLeftClose className="size-4" />
            </button>
          </div>

        {/* Knowledge Header */}
        <div className="px-4 pb-4">
          <h2 className="text-[20px] font-medium text-[#212223] leading-snug">
            Knowledge
          </h2>
        </div>

        <nav className="px-2 flex flex-col gap-1">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'dashboard'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <LayoutDashboard className="size-[18px] shrink-0" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveSection('instructions')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'instructions'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <Brain className="size-[18px] shrink-0" />
            <span>Instructions</span>
          </button>
          <button
            onClick={() => setActiveSection('custom-skills')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'custom-skills'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <Blocks className="size-[18px] shrink-0" />
            <span>Custom skills</span>
          </button>
          <button
            onClick={() => setActiveSection('model-documents')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'model-documents'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <FileBadge className="size-[18px] shrink-0" />
            <span>Model documents</span>
          </button>
          <button
            onClick={() => setActiveSection('prompts')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'prompts'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <MessageCircleQuestion className="size-[18px] shrink-0" />
            <span>Prompts</span>
          </button>
          <button
            onClick={() => setActiveSection('question-sets')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'question-sets'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <Sheet className="size-[18px] shrink-0" />
            <span>Question sets</span>
          </button>
          <button
            onClick={() => setActiveSection('monitoring-alerts')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              activeSection === 'monitoring-alerts'
                ? 'bg-gray-100 text-[#212223] font-semibold'
                : 'text-[#212223] hover:bg-gray-100 font-normal'
            }`}
          >
            <Bell className="size-[18px] shrink-0" />
            <span>Monitoring & alerts</span>
          </button>
        </nav>
      </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {activeSection === 'dashboard' ? (
          null
        ) : (
          <>
            {activeSection === 'custom-skills' || activeSection === 'monitoring-alerts' ? (
              null
            ) : (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
                    {activeSection === 'instructions' && 'Instructions'}
                    {activeSection === 'model-documents' && 'Model Documents'}
                    {activeSection === 'prompts' && 'Prompts'}
                    {activeSection === 'question-sets' && 'Question sets'}
                  </h2>
                </div>

                {activeSection === 'prompts' && (
                  <button
                    onClick={handleNewPrompt}
                    className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
                  >
                    <Plus className="size-4" />
                    New prompt
                  </button>
                )}
              </div>
            )}

            {/* Filter Bar - Only show for Prompts */}
            {activeSection === 'prompts' && (
              <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <SingleSelect
                    label="My prompts"
                    options={[
                      { value: 'my-prompts', label: 'My prompts' },
                      { value: 'shared-with-me', label: 'Shared with me' },
                      { value: 'cocounsel-prompts', label: 'CoCounsel prompts' },
                      { value: 'favorites', label: 'Favorites' },
                    ]}
                    selectedValue={promptSource}
                    onChange={setPromptSource}
                  />

                  <MultiSelect
                    label="Task type"
                    pluralLabel="task types"
                    options={[
                      { value: 'drafting', label: 'Drafting' },
                      { value: 'analysis', label: 'Analysis' },
                      { value: 'research', label: 'Research' },
                      { value: 'summarization', label: 'Summarization' },
                      { value: 'multi-doc-research', label: 'Multi-doc Research' },
                      { value: 'communication', label: 'Communication' },
                    ]}
                    selectedValues={taskTypeFilters}
                    onChange={setTaskTypeFilters}
                  />

                  <MultiSelect
                    label="Practice area"
                    pluralLabel="practice areas"
                    options={[
                      { value: 'litigation', label: 'Litigation' },
                      { value: 'corporate', label: 'Corporate' },
                      { value: 'contracts', label: 'Contracts' },
                      { value: 'general', label: 'General' },
                    ]}
                    selectedValues={practiceAreaFilters}
                    onChange={setPracticeAreaFilters}
                  />

                  <MultiSelect
                    label="Tags"
                    pluralLabel="tags"
                    options={[
                      { value: 'Client-Facing', label: 'Client-Facing' },
                      { value: 'Internal', label: 'Internal' },
                      { value: 'Trial Prep', label: 'Trial Prep' },
                      { value: 'Motion Practice', label: 'Motion Practice' },
                      { value: 'Discovery', label: 'Discovery' },
                      { value: 'Due Diligence', label: 'Due Diligence' },
                      { value: 'Case Assessment', label: 'Case Assessment' },
                      { value: 'Case Law Research', label: 'Case Law Research' },
                      { value: 'Urgent', label: 'Urgent' },
                    ]}
                    selectedValues={tagsFilters}
                    onChange={setTagsFilters}
                  />
                </div>

                <div className="relative w-[360px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prompts"
                    className="w-full h-9 pl-3 pr-10 bg-white border border-[#d2d2d2] rounded-lg text-[14px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-blue-500"
                  />
                  <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center">
                    <Search className="size-4 text-[#212223]" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto ${activeSection === 'dashboard' || activeSection === 'custom-skills' || activeSection === 'monitoring-alerts' ? '' : 'px-6 py-6'}`}>
          {activeSection === 'dashboard' && renderDashboard()}
          
          {activeSection === 'custom-skills' && (
            <div className="max-w-[1100px] mx-auto px-[32px] pt-[50px]">
              <div className="flex items-center justify-between mb-7">
                <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1]">Custom skills</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors">
                      <Plus className="size-4" />
                      New skill
                      <ChevronDown className="size-3.5 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onSelect={() => {
                      navigate?.('/', {
                        state: {
                          prefilledPrompt: 'Help me create a skill.',
                          isSkillCreation: true
                        }
                      });
                    }}>
                      <MessageSquare className="size-3.5 mr-0 text-gray-500" />
                      Create with CoCounsel
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsNewSkillModalOpen(true)}>
                      <Pencil className="size-3.5 mr-0 text-gray-500" />
                      Write from scratch
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsImportSkillModalOpen(true)}>
                      <Download className="size-3.5 mr-0 text-gray-500" />
                      Import skill
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mb-6 flex items-center justify-between">
                <Toggle
                  value={activeScope}
                  onChange={(value) => setActiveScope(value as ScopeType)}
                  options={[
                    { value: 'personal', label: 'Personal' },
                    { value: 'firm', label: 'Firm' },
                  ]}
                />

                {/* View Mode Toggle */}
                <div className="inline-flex w-fit items-center rounded-[8px] bg-[#f0f2f1] p-[4px] gap-[2px]">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`flex items-center gap-1.5 px-[16px] py-[6px] text-[14px] font-medium rounded-[6px] transition-all font-['Source_Sans_3',sans-serif] ${
                      viewMode === 'card'
                        ? 'bg-white text-[#1d4b34] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                        : 'text-[#5c5c5c] hover:text-[#1d4b34] bg-transparent'
                    }`}
                    title="Card view"
                  >
                    <LayoutGrid className="size-4" />
                    Card
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-1.5 px-[16px] py-[6px] text-[14px] font-medium rounded-[6px] transition-all font-['Source_Sans_3',sans-serif] ${
                      viewMode === 'table'
                        ? 'bg-white text-[#1d4b34] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                        : 'text-[#5c5c5c] hover:text-[#1d4b34] bg-transparent'
                    }`}
                    title="Table view"
                  >
                    <Table className="size-4" />
                    Table
                  </button>
                </div>
              </div>
              {viewMode === 'table' ? renderSkillsTable() : renderSkillsCards()}
            </div>
          )}

          {activeSection === 'monitoring-alerts' && (
            <MonitoringListView
              availablePracticeAreas={['Litigation', 'Corporate', 'IP', 'Employment', 'Real Estate', 'Contracts']}
            />
          )}

          {activeSection === 'instructions' && renderPlaceholder(
            <Lightbulb className="size-16 text-gray-300 mx-auto mb-4" />,
            'Instructions',
            'Create custom instructions for the assistant'
          )}

          {activeSection === 'model-documents' && renderPlaceholder(
            <FileText className="size-16 text-gray-300 mx-auto mb-4" />,
            'Model Documents',
            'Upload and manage model documents for reference'
          )}

          {activeSection === 'prompts' && (
            <div className="grid grid-cols-3 gap-4">
              {filteredPrompts.map((prompt) => {
                const { Icon: PromptIcon, bgColor, borderColor, iconColor } = getPromptIcon(prompt.title);

                return (
                  <div
                    key={prompt.id}
                    onClick={() => handleOpenPrompt(prompt)}
                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all group relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(prompt.id);
                      }}
                      className={`absolute top-3 right-3 p-1 rounded transition-colors z-10 ${
                        prompt.isFavorite
                          ? 'text-[#5a7867] opacity-100'
                          : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#5a7867]'
                      }`}
                    >
                      <Star className={`size-4 ${prompt.isFavorite ? 'fill-[#5a7867]' : ''}`} />
                    </button>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-[24px] h-[24px] rounded-md ${bgColor} border ${borderColor} flex items-center justify-center flex-shrink-0`}>
                            <PromptIcon className={`w-[18px] h-[18px] ${iconColor}`} />
                          </div>
                          <h3 className="text-[15px] font-['Clario'] font-normal text-[#212223] truncate">
                            {prompt.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-[14px] font-['Source_Sans_3'] leading-[1.35] text-[#666] line-clamp-2">
                        {prompt.description}
                      </p>

                      <div className="flex items-center gap-2 h-6 justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPrompt(prompt);
                            setIsDrawerOpen(true);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-all text-gray-600 hover:text-[#314b3e]"
                          title="Edit"
                        >
                          <Edit className="size-3.5" />
                        </button>

                        <CardDropdownMenu
                          prompt={prompt}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeSection === 'question-sets' && renderPlaceholder(
            <HelpCircle className="size-16 text-gray-300 mx-auto mb-4" />,
            'Question Sets',
            'Create question sets for bulk document reviews'
          )}
        </div>
      </div>

      <PromptDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        prompt={selectedPrompt}
        onSave={handleSavePrompt}
      />

      <NewSkillModal
        isOpen={isNewSkillModalOpen}
        onClose={() => setIsNewSkillModalOpen(false)}
        onSave={handleSaveSkill}
      />

      <EditSkillModal
        isOpen={isEditSkillModalOpen}
        onClose={() => {
          setIsEditSkillModalOpen(false);
          setSelectedSkill(null);
        }}
        skill={selectedSkill}
        onSave={handleUpdateSkill}
        onDelete={handleDeleteSkill}
        onShare={(skill) => {
          setIsEditSkillModalOpen(false);
          handleShareSkill(skill);
        }}
      />

      <ShareSkillModal
        isOpen={isShareSkillModalOpen}
        onClose={() => setIsShareSkillModalOpen(false)}
        skillName={skillToShare?.name || ''}
        skills={skillsToShare}
        onShare={handleShareSubmit}
        hasBeenSharedToFirm={skillToShare ? sharedToFirmSkills.has(skillToShare.id) : false}
      />

      <ShareConfirmationModal
        isOpen={isShareConfirmationModalOpen}
        onClose={() => setIsShareConfirmationModalOpen(false)}
        shareTarget={lastShareTarget}
        workspaceName={lastWorkspaceName}
        onConfirm={() => setIsShareConfirmationModalOpen(false)}
        confirmButtonText="Got it"
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => {
          setIsDeleteConfirmationOpen(false);
          setSkillToDelete(null);
        }}
        onConfirm={confirmDeleteSkills}
        count={skillToDelete ? 1 : selectedSkillIds.size}
      />

      <SkillDeletedModal
        isOpen={isSkillDeletedModalOpen}
        onClose={() => setIsSkillDeletedModalOpen(false)}
        count={deletedSkillCount}
      />



      <ImportSkillModal
        isOpen={isImportSkillModalOpen}
        onClose={() => setIsImportSkillModalOpen(false)}
        onImport={handleImportSkill}
      />

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

// SkillCard component for Recent skills section
function SkillCard({ skill, onEdit, onShare, onDelete, onTest }: {
  skill: Skill;
  onEdit: () => void;
  onShare: () => void;
  onDelete: () => void;
  onTest?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSkillTypeLabel = (type: SkillType) => {
    const typeMap: Record<SkillType, { label: string }> = {
      'output-guideline': { label: 'Output guideline' },
      'capability': { label: 'Capability' },
      'content-tool': { label: 'Content tool' },
      'directing': { label: 'Directing' },
    };
    return typeMap[type]?.label || typeMap['output-guideline'].label;
  };

  return (
    <div className="bg-white relative rounded-lg border border-[#e5e5e5] p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
      <div onClick={onEdit} className="flex items-start gap-3">
        <div className="flex items-center justify-center shrink-0 pt-0.5">
          <Blocks className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
        </div>
        <div className="flex-1 min-w-0 pr-32">
          <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight mb-1">{skill.name}</h3>
          <p className="text-[13px] text-gray-500 line-clamp-2 mb-2">{skill.purpose || skill.practiceArea}</p>
          <div className="flex gap-1.5 items-center">
            <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
              <p className="leading-[1.2]">{skill.author}</p>
            </div>
            <div className="size-1 rounded-full bg-[#8A8A8A]" />
            <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
              <p className="leading-[1.2]">{new Date(skill.dateSaved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Type Badge - positioned top right next to menu */}
      <div className="absolute top-3 right-10">
        <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full whitespace-nowrap">
          {getSkillTypeLabel(skill.type)}
        </span>
      </div>

      {/* Dropdown Menu - appears on hover */}
      <div
        className={clsx(
          "absolute top-3 right-3 transition-opacity",
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
              title="More options"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onSelect={onEdit}>
              <Edit className="size-3.5 mr-0 text-gray-500" />
              Edit
            </DropdownMenuItem>
            {onTest && (
              <DropdownMenuItem onSelect={onTest}>
                <Beaker className="size-3.5 mr-0 text-gray-500" />
                Test
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={onShare}>
              <Share className="size-3.5 mr-0 text-gray-500" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDelete}>
              <Trash2 className="size-3.5 mr-0 text-gray-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
