import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router';
import { X, ChevronDown } from 'lucide-react';
import { MARegulatoryTable } from '../components/regulatory';
import { CPCRedlinePanel } from '../components/regulatory/CPCRedlinePanel';
import { SpreadsheetToolbar } from '../components/SpreadsheetToolbar';

export function StandaloneViewPage() {
  console.log('📄 StandaloneViewPage rendering');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const openParam = searchParams.get('open');
  const typeParam = searchParams.get('type');
  const fromParam = searchParams.get('from'); // Track where we came from
  const workspaceParam = searchParams.get('workspace'); // Workspace context
  console.log('📄 StandaloneViewPage params:', { openParam, typeParam, fromParam, workspaceParam });

  useEffect(() => {
    // If no params, redirect to home
    if (!openParam || !typeParam) {
      navigate('/');
    }
  }, [openParam, typeParam, navigate]);

  // Listen for CPC initiation events from regulatory table
  useEffect(() => {
    console.log('[v0] StandaloneViewPage: Setting up initiateCPC event listener');
    const handleCPCInitiation = (event: Event) => {
      console.log('[v0] StandaloneViewPage: CPC event received!');
      const customEvent = event as CustomEvent;
      const { regulation, docsAffected, clausesAffected, impactLevel } = customEvent.detail;
      console.log('[v0] CPC Details:', { regulation, docsAffected, clausesAffected, impactLevel });

      // Get the source tab ID from sessionStorage (set when artifact was clicked)
      const sourceTabId = sessionStorage.getItem('regulatoryTableSourceTabId');
      console.log('[v0] Retrieved source tab ID from sessionStorage:', sourceTabId);

      // Store the CPC workflow data
      sessionStorage.setItem('pendingCPCWorkflow', JSON.stringify({
        docsAffected,
        clausesAffected,
        impactLevel
      }));

      // Store the CPC data with the prompt text
      const cpcData = {
        regulation,
        docsAffected,
        clausesAffected,
        impactLevel,
        sourceTabId: sourceTabId,
        timestamp: Date.now()
      };
      sessionStorage.setItem('pendingCPCData', JSON.stringify(cpcData));
      console.log('[v0] Stored CPC data in sessionStorage:', cpcData);

      // Clear the source tab ID
      sessionStorage.removeItem('regulatoryTableSourceTabId');

      // Navigate based on where we came from
      if (fromParam && fromParam !== 'recent-activity') {
        // fromParam is a chatId - navigate back to that chat to append CPC
        console.log('[v0] Navigating back to source chat:', fromParam);
        navigate(`/chat/${fromParam}`);
      } else if (fromParam === 'recent-activity') {
        // Came from recent activity sidebar - create a NEW chat for CPC workflow
        console.log('[v0] Came from recent activity - creating new chat for CPC');
        const newChatId = `cpc-${Date.now()}`;
        // Store the CPC prompt for the new chat
        sessionStorage.setItem(`chat_${newChatId}_prompt`, `Initiate Cross-Product Clause analysis for: ${regulation}`);
        navigate(`/chat/${newChatId}`);
      } else {
        // No fromParam - navigate to default M&A workspace
        console.log('[v0] No source - navigating to M&A workspace for CPC workflow');
        navigate('/workspace/Project%20Atlas%20-%20M%26A%20Due%20Diligence');
      }
    };

    window.addEventListener('initiateCPC', handleCPCInitiation);
    console.log('[v0] StandaloneViewPage: initiateCPC listener attached');

    return () => {
      console.log('[v0] StandaloneViewPage: Removing initiateCPC listener');
      window.removeEventListener('initiateCPC', handleCPCInitiation);
    };
  }, [navigate, fromParam, workspaceParam]);
  
  if (!openParam || !typeParam) {
    return null;
  }

  const handleClose = () => {
    // If we have a source chat ID, navigate back to it
    if (fromParam) {
      navigate(`/chat/${fromParam}`);
    } else if (window.history.length > 2) {
      // Otherwise, use browser back navigation
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="flex-1 h-full flex flex-col bg-[#FCFCFC] overflow-hidden">
      {/* Tab bar with single tab - matching WorkspacePage structure */}
      <div className="h-[44px] flex items-end px-2 border-b border-[#E3E4E6] shrink-0 gap-1 pt-2 overflow-visible bg-[#f7f7f7]">
        <div className="flex items-center gap-1.5 px-2 py-1.5 h-[37px] bg-[#FCFCFC] border-t border-x border-[#E3E4E6] rounded-t-lg shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] -mb-[1px] z-10 relative text-[13px] font-medium min-w-[120px] max-w-[200px]">
          <span className="text-[#212223] truncate flex-1">{openParam}</span>
          
          {/* Chevron dropdown button */}
          <button
            className="p-0.5 rounded-md hover:bg-black/10 shrink-0"
            title="Options"
          >
            <ChevronDown className="size-3" />
          </button>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-0.5 rounded-md hover:bg-black/10 shrink-0"
            title="Close"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>
      
      {/* Toolbar (for spreadsheets) */}
      {(typeParam === 'table' || typeParam === 'regulatory-table') && (
        <SpreadsheetToolbar 
          isChatOpen={false}
          onToggleChat={() => {}}
          isCommentsOpen={false}
          onToggleComments={() => {}}
          isHistoryOpen={false}
          onToggleHistory={() => {}}
        />
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {typeParam === 'regulatory-table' ? (
          <MARegulatoryTable />
        ) : typeParam === 'cpc-redlines' ? (
          <CPCRedlinePanel
            regulation={sessionStorage.getItem('cpcRedlineRegulation') || ''}
          />
        ) : typeParam === 'table' ? (
          <div className="p-8 text-center text-gray-500">
            Table view for "{openParam}" would go here
          </div>
        ) : typeParam === 'doc' ? (
          <div className="p-8 text-center text-gray-500">
            Document view for "{openParam}" would go here
          </div>
        ) : typeParam === 'chat' ? (
          <div className="p-8 text-center text-gray-500">
            Chat view for "{openParam}" would go here
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Content for "{openParam}" ({typeParam}) would go here
          </div>
        )}
      </div>
    </div>
  );
}
