import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TextSelectionToolbar } from './TextSelectionToolbar';
import { EditCommentCard } from './EditCommentCard';
import { MessageSquareDiff } from 'lucide-react';
import * as Diff from 'diff';

// Supabase backend not connected
const projectId = 'mock-project-id';
const publicAnonKey = 'mock-anon-key';

interface DocumentViewerProps {
  children: React.ReactNode;
  onAddHistoryEntry?: (entry: { description: string; editId?: string; originalText?: string; revisedText?: string }) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

interface PendingEdit {
  id: string;
  originalText: string;
  revisedText: string;
  explanation: string;
  element: HTMLElement; // The wrapper element containing the redlines
  isVisible: boolean; // Track if comment card is currently visible
}

const CURSOR_SVG = encodeURIComponent(`
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="1" stdDeviation="1.5" flood-opacity="0.5"/>
    </filter>
    <g filter="url(#shadow)">
      <!-- White Borders -->
      <path d="M4 6V22 M2 6H6 M2 22H6" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <path d="M13 3L14.5 7.5L19 9L14.5 10.5L13 15L11.5 10.5L7 9L11.5 7.5L13 3Z" stroke="white" stroke-width="3" stroke-linejoin="round" fill="white"/>
      
      <!-- Main Shapes -->
      <path d="M4 6V22 M2 6H6 M2 22H6" stroke="#111827" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M13 3L14.5 7.5L19 9L14.5 10.5L13 15L11.5 10.5L7 9L11.5 7.5L13 3Z" fill="#D64000"/>
    </g>
  </svg>
`);

export function DocumentViewer({ children, onAddHistoryEntry, onUndo, onRedo, canUndo, canRedo }: DocumentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const savedRangeRef = useRef<Range | null>(null); // Store the range BEFORE toolbar interaction
  const [pendingEdits, setPendingEdits] = useState<PendingEdit[]>([]); // Store pending edits
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state

  // Set up click handlers for pending edits
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked on a pending edit wrapper
      const wrapper = target.closest('.pending-edit-wrapper') as HTMLElement;
      if (wrapper) {
        const editId = wrapper.getAttribute('data-edit-id');
        if (editId) {
          console.log('Clicked on pending edit:', editId);
          // Toggle visibility of this edit's comment card
          setPendingEdits(prev => prev.map(edit => 
            edit.id === editId 
              ? { ...edit, isVisible: !edit.isVisible }
              : edit
          ));
          e.stopPropagation();
          return;
        }
      }
      
      // Clicked outside - hide all comment cards
      setPendingEdits(prev => prev.map(edit => ({ ...edit, isVisible: false })));
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Apply visual styling to pending edit wrappers and render margin icons
  useEffect(() => {
    pendingEdits.forEach(edit => {
      if (edit.element && containerRef.current) {
        // Add visual styling to the wrapper
        edit.element.style.position = 'relative';
        edit.element.style.display = 'inline';
        edit.element.style.cursor = 'pointer';
        edit.element.style.borderLeft = '3px solid #ea580c';
        edit.element.style.paddingLeft = '4px';
        edit.element.style.marginLeft = '-4px';
        edit.element.style.borderRadius = '2px';
        
        // Create or update margin icon
        const iconId = `icon-${edit.id}`;
        let iconButton = document.getElementById(iconId) as HTMLElement;
        
        if (!iconButton) {
          // Create new icon button
          iconButton = document.createElement('button');
          iconButton.id = iconId;
          iconButton.className = 'margin-comment-icon';
          iconButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ea580c" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
              <path d="M10 15h4" stroke="white"></path>
              <path d="M10 9h4" stroke="white"></path>
              <path d="M12 7v4" stroke="white"></path>
            </svg>
          `;
          iconButton.style.cssText = `
            position: absolute;
            width: 28px;
            height: 28px;
            background: none;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            transition: all 0.2s;
            opacity: 0.9;
            z-index: 10;
            pointer-events: auto;
          `;
          
          // Add hover effect
          iconButton.addEventListener('mouseenter', () => {
            iconButton.style.opacity = '1';
            iconButton.style.transform = 'scale(1.1)';
          });
          iconButton.addEventListener('mouseleave', () => {
            iconButton.style.opacity = edit.isVisible ? '1' : '0.9';
            iconButton.style.transform = 'scale(1)';
          });
          
          // Click handler
          iconButton.addEventListener('click', (e) => {
            e.stopPropagation();
            setPendingEdits(prev => prev.map(e => 
              e.id === edit.id 
                ? { ...e, isVisible: !e.isVisible }
                : e
            ));
          });
          
          containerRef.current.appendChild(iconButton);
        }
        
        // Position the icon in the right margin based on wrapper position
        const updateIconPosition = () => {
          if (containerRef.current && iconButton) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const wrapperRect = edit.element.getBoundingClientRect();
            
            // Calculate position relative to container
            const top = wrapperRect.top - containerRect.top + containerRef.current.scrollTop;
            const right = 28; // 28px from right edge (8px closer to document than 20px)
            
            iconButton.style.top = `${top}px`;
            iconButton.style.right = `${right}px`;
          }
        };
        
        updateIconPosition();
        
        // Update on scroll and resize
        const scrollHandler = () => updateIconPosition();
        window.addEventListener('scroll', scrollHandler, true);
        window.addEventListener('resize', scrollHandler);
        
        // Store cleanup
        (iconButton as any)._cleanup = () => {
          window.removeEventListener('scroll', scrollHandler, true);
          window.removeEventListener('resize', scrollHandler);
        };
        
        // Update icon visibility state
        if (iconButton) {
          iconButton.style.opacity = edit.isVisible ? '1' : '0.9';
          iconButton.style.transform = edit.isVisible ? 'scale(1.1)' : 'scale(1)';
        }
        
        // Add hover effect to wrapper
        const addHover = () => {
          edit.element.style.backgroundColor = 'rgba(249, 115, 22, 0.05)';
        };
        const removeHover = () => {
          edit.element.style.backgroundColor = '';
        };
        
        edit.element.addEventListener('mouseenter', addHover);
        edit.element.addEventListener('mouseleave', removeHover);
      }
    });
    
    // Cleanup icons for removed edits
    return () => {
      pendingEdits.forEach(edit => {
        const iconId = `icon-${edit.id}`;
        const iconButton = document.getElementById(iconId);
        if (iconButton) {
          if ((iconButton as any)._cleanup) {
            (iconButton as any)._cleanup();
          }
        }
      });
      
      // Remove icons that no longer have corresponding edits
      const allIcons = containerRef.current?.querySelectorAll('.margin-comment-icon');
      allIcons?.forEach(icon => {
        const iconEditId = icon.id.replace('icon-', '');
        if (!pendingEdits.find(e => e.id === iconEditId)) {
          icon.remove();
        }
      });
    };
  }, [pendingEdits]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      
      if (!sel || sel.isCollapsed) {
        setSelection(null);
        return;
      }

      // Check if selection is inside our container
      if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (containerRef.current && containerRef.current.contains(range.commonAncestorContainer)) {
          setSelection(sel);
          // Save a clone of the range IMMEDIATELY
          savedRangeRef.current = range.cloneRange();
        } else {
          setSelection(null);
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const handleAcceptEdit = (editId: string) => {
    console.log('=== ACCEPT EDIT ===', editId);
    
    const edit = pendingEdits.find(e => e.id === editId);
    if (!edit) {
      console.error('Edit not found:', editId);
      return;
    }
    
    console.log('Accepting edit:', edit);
    console.log('Revised text to apply:', edit.revisedText);
    
    // Save current state for undo
    if (containerRef.current) {
      const currentHTML = containerRef.current.innerHTML;
      // Trigger undo system via callback (will be implemented in parent)
      // For now, we'll just apply the change
    }
    
    // Apply the revised text by replacing the wrapper element
    const element = edit.element;
    if (!element || !element.parentNode) {
      console.error('Element or parent not found');
      return;
    }
    
    // Create a text node with the revised text (clean, no markup)
    // Wrap it in a span with the edit ID as a data attribute so we can find it later
    const wrapperSpan = document.createElement('span');
    wrapperSpan.setAttribute('data-history-edit-id', editId);
    wrapperSpan.style.display = 'inline';
    wrapperSpan.textContent = edit.revisedText;
    
    // Replace the wrapper element with the clean revised text wrapped in tracking span
    element.parentNode.replaceChild(wrapperSpan, element);
    
    // Remove from pending edits
    setPendingEdits(prev => prev.filter(e => e.id !== editId));
    
    // Add history entry
    if (onAddHistoryEntry) {
      onAddHistoryEntry({
        description: `Applied AI edit: ${edit.explanation}`,
        editId: editId,
        originalText: edit.originalText,
        revisedText: edit.revisedText
      });
    }
    
    console.log('Edit accepted and applied cleanly');
  };
  
  const handleRejectEdit = (editId: string) => {
    console.log('=== REJECT EDIT ===', editId);
    
    const edit = pendingEdits.find(e => e.id === editId);
    if (!edit) {
      console.error('Edit not found:', editId);
      return;
    }
    
    console.log('Rejecting edit:', edit);
    console.log('Original text to restore:', edit.originalText);
    
    // Revert to original text by replacing the wrapper element
    // Wrap it in a span with the edit ID as a data attribute so we can find it later
    const element = edit.element;
    if (!element || !element.parentNode) {
      console.error('Element or parent not found');
      return;
    }
    
    // Create a wrapper span with tracking ID containing the original text
    const wrapperSpan = document.createElement('span');
    wrapperSpan.setAttribute('data-history-edit-id', editId);
    wrapperSpan.style.display = 'inline';
    wrapperSpan.textContent = edit.originalText;
    
    // Replace the wrapper element with the original text wrapped in tracking span
    element.parentNode.replaceChild(wrapperSpan, element);
    
    // Remove from pending edits
    setPendingEdits(prev => prev.filter(e => e.id !== editId));
    
    // Add history entry
    if (onAddHistoryEntry) {
      onAddHistoryEntry({
        description: `Rejected AI edit suggestion`,
        editId: editId,
        originalText: edit.originalText,
        revisedText: edit.revisedText
      });
    }
    
    console.log('Edit rejected and reverted to:', edit.originalText);
  };

  const handleAskAI = async (instruction: string, selectedText: string) => {
    console.log('=== REDLINE REQUEST START ===');
    console.log('[1] Instruction:', instruction);
    console.log('[2] Selected text:', selectedText);
    console.log('[2a] Selected text length:', selectedText?.length || 0);
    
    // Validate inputs
    if (!selectedText || selectedText.trim().length === 0) {
      console.log('[2b] ERROR: Selected text is empty');
      alert('No text selected. Please select text first.');
      return;
    }
    
    if (!instruction || !instruction.trim()) {
      console.log('[2c] ERROR: Instruction is empty');
      alert('Please provide an instruction.');
      return;
    }
    
    try {
      // Use the SAVED range instead of getting current selection
      const range = savedRangeRef.current;
      if (!range) {
        console.log('[3] ERROR: No saved range found');
        return;
      }
      
      console.log('[3] Saved range obtained:', range);
      console.log('[3a] Range start offset:', range.startOffset);
      console.log('[3b] Range end offset:', range.endOffset);
      console.log('[3c] Range is collapsed:', range.collapsed);
      
      // Wrap the selected range in a temporary processing indicator span
      const processingSpan = document.createElement('span');
      processingSpan.className = 'ai-processing-highlight';
      processingSpan.style.cssText = `
        position: relative;
        background: linear-gradient(
          120deg,
          rgba(251, 191, 36, 0.35),
          rgba(251, 146, 60, 0.35),
          rgba(236, 72, 153, 0.35),
          rgba(251, 146, 60, 0.35),
          rgba(251, 191, 36, 0.35)
        );
        display: inline;
        animation: ai-pulse 1.5s ease-in-out infinite;
      `;
      
      // Wrap the range contents
      range.surroundContents(processingSpan);
      
      // Clear any active selection
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
      }
      
      // Set processing state
      setIsProcessing(true);
      
      // Call ChatGPT API via backend to get edits
      console.log('[4] Calling API...');
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a00f9dd/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a legal document editor. When given text and an editing instruction, respond with a JSON object containing:
1. "revisedText": the edited version of the text
2. "explanation": a brief professional explanation of the changes (2-3 sentences max, written as a lawyer would comment in Word)

Format:
{
  "revisedText": "...",
  "explanation": "..."
}

Be concise and professional in your explanation.`
            },
            {
              role: 'user',
              content: `Edit this text: "${selectedText}"\n\nInstruction: ${instruction}\n\nProvide the revised text and explanation in JSON format:`
            }
          ]
        })
      });

      console.log('[5] API response status:', response.status);
      
      if (!response.ok) {
        console.log('[5] ERROR: Response not OK:', await response.text());
        alert('Error calling AI. Please check console.');
        return;
      }

      const data = await response.json();
      console.log('[6] API response data:', data);
      
      // Check if response has expected structure
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('[7] ERROR: Unexpected response structure:', data);
        alert('Unexpected response from AI. Please try again.');
        return;
      }
      
      // Get the content from ChatGPT (may be plain text or JSON)
      let responseContent = data.choices[0].message.content.trim();
      console.log('[7] Response content from AI:', responseContent);
      
      // Try to parse as JSON first
      let revisedText: string;
      let explanation: string;
      
      try {
        // Remove markdown code blocks if present
        if (responseContent.startsWith('```')) {
          responseContent = responseContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        }
        
        const parsed = JSON.parse(responseContent);
        revisedText = parsed.revisedText;
        explanation = parsed.explanation;
        console.log('[7a] Parsed JSON successfully');
        console.log('[7b] Revised text:', revisedText);
        console.log('[7c] Explanation:', explanation);
      } catch (parseError) {
        // Fallback: treat entire response as revised text
        console.log('[7a] JSON parse failed, using as plain text');
        revisedText = responseContent;
        explanation = 'Changes applied as requested.';
      }
      
      console.log('[7d] Original length:', selectedText.length);
      console.log('[7e] Revised length:', revisedText.length);
      
      // Compute diff using the diff library
      console.log('[8] Computing word-level diff...');
      const diffResult = Diff.diffWords(selectedText, revisedText);
      console.log('[8a] Diff result:', diffResult);
      console.log('[8b] Number of changes:', diffResult.length);

      // Create redlined HTML from diff
      console.log('[9] Creating redlined HTML from diff...');
      let redlinedHTML = '';
      
      diffResult.forEach((part, index) => {
        console.log(`[9.${index}] Part:`, {
          value: part.value.substring(0, 50) + (part.value.length > 50 ? '...' : ''),
          added: part.added,
          removed: part.removed
        });
        
        if (part.removed) {
          // Text was removed - show with red strikethrough
          redlinedHTML += `<span class="line-through text-red-600 bg-red-50 px-0.5">${part.value}</span>`;
        } else if (part.added) {
          // Text was added - show with green underline
          redlinedHTML += `<span class="underline text-green-600 bg-green-50 px-0.5">${part.value}</span>`;
        } else {
          // Text unchanged - keep as is
          redlinedHTML += part.value;
        }
      });

      console.log('[10] Final redlined HTML length:', redlinedHTML.length);
      console.log('[10a] Final redlined HTML preview:', redlinedHTML.substring(0, 200) + '...');

      // Generate unique ID for this edit
      const editId = `edit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log('[11] Generated edit ID:', editId);

      // Wrap redlined content in a span with data attribute
      const wrappedHTML = `<span class="pending-edit-wrapper inline" data-edit-id="${editId}">${redlinedHTML}</span>`;

      // Remove the processing highlight span and replace with redlined version
      console.log('[15] Removing processing highlight and creating document fragment...');
      
      // Get the processing span
      const processingHighlight = containerRef.current?.querySelector('.ai-processing-highlight') as HTMLElement;
      if (processingHighlight && processingHighlight.parentNode) {
        // Create a new range that selects the processing span's contents
        const newRange = document.createRange();
        newRange.selectNodeContents(processingHighlight);
        
        // Create fragment and insert it
        const fragment = newRange.createContextualFragment(wrappedHTML);
        
        // Replace the processing span with the redlined fragment
        processingHighlight.parentNode.replaceChild(fragment, processingHighlight);
      }
      
      console.log('[16] Redlined fragment inserted');
      
      // Get the inserted wrapper element
      const wrapperElement = containerRef.current?.querySelector(`[data-edit-id="${editId}"]`) as HTMLElement;
      
      if (wrapperElement) {
        console.log('[18] Wrapper element found, creating pending edit');
        
        // Create pending edit object
        const pendingEdit: PendingEdit = {
          id: editId,
          originalText: selectedText,
          revisedText,
          explanation,
          element: wrapperElement,
          isVisible: true // Initially visible
        };
        
        // Add to pending edits
        setPendingEdits(prev => [...prev, pendingEdit]);
        console.log('[19] Pending edit added to state');
      } else {
        console.error('[18] ERROR: Could not find wrapper element');
      }
      
      // Clear selection and close toolbar
      console.log('[20] Clearing selection...');
      if (sel) {
        sel.removeAllRanges();
      }
      setSelection(null); // Close the toolbar
      savedRangeRef.current = null; // Clear saved range
      
      console.log('=== REDLINE REQUEST COMPLETE ===');
      
    } catch (error) {
      console.error('=== REDLINE REQUEST FAILED ===');
      console.error('Error details:', error);
      alert('Error: ' + (error as Error).message);
    } finally {
      // Reset processing state
      setIsProcessing(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes ai-glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .ai-processing-highlight {
          background: linear-gradient(
            90deg,
            rgba(251, 191, 36, 0.2),
            rgba(251, 146, 60, 0.4),
            rgba(239, 68, 68, 0.4),
            rgba(251, 146, 60, 0.4),
            rgba(251, 191, 36, 0.2)
          );
          background-size: 300% 100%;
          animation: ai-glow 2s ease-in-out infinite;
          display: inline;
          border-radius: 2px;
        }
      `}</style>
      <div 
        ref={containerRef} 
        className={`min-h-full pb-20 relative ${isProcessing ? 'ai-processing-selection' : 'selection:bg-blue-100 selection:text-gray-900'}`}
        style={{
            cursor: `url("data:image/svg+xml,${CURSOR_SVG}") 4 14, text`
        }}
        data-tour-step="7"
      >
        {children}
      </div>
      
      <TextSelectionToolbar selection={selection} onAskAI={handleAskAI} />
      
      {/* Render comment cards for all pending edits */}
      {pendingEdits.filter(edit => edit.isVisible).map(edit => (
        <EditCommentCard
          key={edit.id}
          explanation={edit.explanation}
          targetElement={edit.element}
          onAccept={() => handleAcceptEdit(edit.id)}
          onReject={() => handleRejectEdit(edit.id)}
          onClose={() => {
            // Close the comment card
            setPendingEdits(prev => prev.map(e => 
              e.id === edit.id ? { ...e, isVisible: false } : e
            ));
          }}
        />
      ))}
    </>
  );
}