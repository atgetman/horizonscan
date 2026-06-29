import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Search, FileText, AlertTriangle, Menu, ChevronDown, ZoomIn, ZoomOut, Pencil, NotebookPen, MessageSquareText } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { AnalysisCommentPopover } from './AnalysisCommentPopover';

interface SpreadsheetRowDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Record<string, string> | null;
  columnHeaders: string[];
  rowNumber: number;
}

interface FieldAnalysis {
  columnName: string;
  abbreviatedTitle: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  footnotes: number[];
  commentCount: number;
}

// Generate analysis for each column based on row data
function generateFieldAnalyses(rowData: Record<string, string>): FieldAnalysis[] {
  const analyses: FieldAnalysis[] = [];
  
  // Vendor analysis
  if (rowData['Vendor']) {
    analyses.push({
      columnName: 'Vendor',
      abbreviatedTitle: 'Vendor identification',
      question: 'Who is this vendor and what is their role in the data processing relationship?',
      shortAnswer: `${rowData['Vendor']} - third-party processor`,
      detailedAnswer: `The vendor on this row is ${rowData['Vendor']}, a third-party service provider engaged by Meridian Financial Group. As a processor, ${rowData['Vendor']} receives personal data from Meridian to perform a contracted service and is bound by the terms of a data processing agreement (DPA). Establishing the vendor's identity and processing role is the first step in assessing whether the relationship is adequately governed and whether the vendor's safeguards meet program requirements.`,
      footnotes: [1, 2],
      commentCount: 2
    });
  }

  // Data Category analysis
  if (rowData['Data Category']) {
    analyses.push({
      columnName: 'Data Category',
      abbreviatedTitle: 'Data classification',
      question: 'What category of personal data is shared with this vendor and why does it matter?',
      shortAnswer: rowData['Data Category'],
      detailedAnswer: `This vendor receives "${rowData['Data Category']}". The category determines the sensitivity of the transfer and the controls required: identifiers and customer PII raise data-minimization questions, while financial and authentication data carry heightened security and breach-notification obligations. Confirming that the vendor only receives the minimum data necessary for the contracted purpose is central to GDPR Article 5(1)(c) compliance.`,
      footnotes: [3, 4],
      commentCount: 0
    });
  }

  // Transfer Region analysis
  if (rowData['Transfer Region']) {
    analyses.push({
      columnName: 'Transfer Region',
      abbreviatedTitle: 'Transfer destination',
      question: 'Where is the data processed and does the transfer require a safeguard mechanism?',
      shortAnswer: `Processed in ${rowData['Transfer Region']}`,
      detailedAnswer: `Data shared with this vendor is processed in ${rowData['Transfer Region']}. Where EU or UK personal data leaves the EEA — for example, transfers to the United States — an Article 46 transfer mechanism such as Standard Contractual Clauses plus a transfer impact assessment is required. The processing region therefore drives whether SCCs, supplementary measures, or an adequacy decision must be in place before the transfer can continue.`,
      footnotes: [5],
      commentCount: 1
    });
  }

  // Lawful Basis analysis
  if (rowData['Lawful Basis']) {
    analyses.push({
      columnName: 'Lawful Basis',
      abbreviatedTitle: 'Lawful basis',
      question: 'What lawful basis supports this processing and is it documented?',
      shortAnswer: rowData['Lawful Basis'],
      detailedAnswer: `The processing relies on "${rowData['Lawful Basis']}" as its lawful basis under GDPR Article 6. ${
        rowData['Lawful Basis'].includes('Legitimate Interests') ? 'Legitimate interests requires a documented balancing test (LIA) weighing the business need against individual rights; an incomplete or missing LIA is a common remediation item.' :
        rowData['Lawful Basis'].includes('Consent') ? 'Consent must be freely given, specific, informed, and revocable, with records demonstrating how and when it was obtained.' :
        rowData['Lawful Basis'].includes('Contract') ? 'Contractual necessity is appropriate only where the processing is genuinely required to perform the service, not merely convenient.' :
        rowData['Lawful Basis'].includes('Legal Obligation') ? 'A legal-obligation basis should cite the specific law or regulator requirement that compels the processing.' :
        'The basis should be documented and mapped to the specific processing purpose.'
      }`,
      footnotes: [6, 7],
      commentCount: 0
    });
  }

  // Risk Level analysis
  if (rowData['Risk Level']) {
    analyses.push({
      columnName: 'Risk Level',
      abbreviatedTitle: 'Risk rating',
      question: 'What is the residual risk rating for this vendor relationship?',
      shortAnswer: `${rowData['Risk Level']} risk`,
      detailedAnswer: `This relationship carries a ${rowData['Risk Level'].toLowerCase()} residual risk rating. ${
        rowData['Risk Level'] === 'High' ? 'High-risk relationships typically combine sensitive data, cross-border transfers, or unresolved DPA gaps, and should be prioritized for remediation and, where applicable, a data protection impact assessment (DPIA).' :
        rowData['Risk Level'] === 'Medium' ? 'Medium-risk relationships have controls largely in place but include open items — such as pending DPA terms or sub-processor disclosures — that should be tracked to closure.' :
        'Low-risk relationships have appropriate safeguards documented and require only periodic monitoring under the vendor management program.'
      }`,
      footnotes: [8, 9],
      commentCount: 3
    });
  }

  // Status analysis
  if (rowData['Status']) {
    analyses.push({
      columnName: 'Status',
      abbreviatedTitle: 'Review status',
      question: 'What is the current review status of this vendor record?',
      shortAnswer: rowData['Status'],
      detailedAnswer: `The vendor record has been marked as "${rowData['Status']}" in the vendor management system. ${
        rowData['Status'] === 'Reviewed' ? 'A reviewed status means the DPA, transfer mechanism, and data inventory have been validated by the compliance team and the relationship meets program requirements.' :
        rowData['Status'] === 'Flagged' ? 'A flagged status indicates an open issue requiring senior compliance review, such as a missing transfer mechanism, an undisclosed sub-processor, or an unresolved data-minimization gap.' :
        rowData['Status'] === 'Processing' ? 'A processing status means the record is currently undergoing assessment, including DPA review and data-flow mapping.' :
        rowData['Status'] === 'Remediation' ? 'A remediation status means corrective action is underway to close identified gaps before the relationship is re-approved.' :
        rowData['Status'] === 'Pending DPA' ? 'A pending-DPA status means processing is occurring while final data processing agreement terms are still being executed.' :
        'The status indicates this record requires additional review before final disposition.'
      }`,
      footnotes: [10],
      commentCount: 0
    });
  }

  return analyses;
}

export function SpreadsheetRowDrawer({ 
  isOpen, 
  onClose, 
  rowData, 
  columnHeaders,
  rowNumber 
}: SpreadsheetRowDrawerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCommentPopover, setActiveCommentPopover] = useState<number | null>(null);
  const [commentPopoverPosition, setCommentPopoverPosition] = useState<{ x: number; y: number } | undefined>();

  if (!rowData) return null;

  const fileName = rowData['File Name'] || 'Document';
  const totalPages = 24;
  const fieldAnalyses = generateFieldAnalyses(rowData);
  const totalQuestions = fieldAnalyses.length;

  // Mock comments for analyses with commentCount > 0
  const getCommentsForAnalysis = (idx: number) => {
    const analysis = fieldAnalyses[idx];
    if (analysis.commentCount === 0) return [];
    
    // Return mock comments based on the count
    const comments = [];
    for (let i = 0; i < analysis.commentCount; i++) {
      comments.push({
        id: `${idx}-${i}`,
        author: i === 0 ? 'Sarah Mitchell' : 'Alex Thompson',
        role: i === 0 ? 'Senior Associate' : 'Partner',
        timestamp: i === 0 ? '2 hours ago' : '1 hour ago',
        text: i === 0 
          ? 'This analysis needs to be reviewed against the latest production guidelines. Can we verify the dates?' 
          : 'Agreed. I\'ve flagged this for review with the discovery team.',
        avatar: i === 0 ? 'SM' : 'AT',
        avatarColor: 'bg-[#1d4b34]'
      });
    }
    return comments;
  };

  const handleCommentClick = (idx: number, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setCommentPopoverPosition({
      x: rect.right + 10, // Position to the right of the button
      y: rect.top
    });
    setActiveCommentPopover(idx);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[76vw] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Single Header Across Full Width */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="size-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{fileName}.pdf</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                  <AlertTriangle className="size-3" />
                  {totalQuestions} questions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <ChevronLeft className="size-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <ChevronRight className="size-4 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Maximize2 className="size-4 text-gray-600" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <X className="size-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel - Questions */}
              <div className="w-[480px] border-r border-gray-200 flex flex-col bg-white">
                {/* Field Analyses */}
                <div className="flex-1 overflow-y-auto">
                  {fieldAnalyses.map((analysis, idx) => (
                    <div key={idx} className="border-b border-gray-200 p-4 group relative">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-base font-semibold text-gray-900 flex-1">
                          {idx + 1}: {analysis.abbreviatedTitle}
                        </h3>
                        
                        {/* Icon buttons - edit and note appear on hover */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded transition-all opacity-0 group-hover:opacity-100"
                            title="Edit"
                          >
                            <Pencil className="size-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-gray-100 rounded transition-all opacity-0 group-hover:opacity-100"
                            title="Add note"
                          >
                            <NotebookPen className="size-4 text-gray-600" />
                          </button>
                          <button
                            className={clsx(
                              "p-1.5 hover:bg-gray-100 rounded transition-all flex items-center gap-0.5",
                              analysis.commentCount === 0 && "opacity-0 group-hover:opacity-100"
                            )}
                            title="Comments"
                            onClick={(e) => handleCommentClick(idx, e)}
                          >
                            <MessageSquareText className="size-4 text-gray-600" />
                            <span className="text-xs text-gray-600">{analysis.commentCount}</span>
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{analysis.question}</p>

                      {/* Short Answer */}
                      <div className="mb-4">
                        <h4 className="text-base font-bold text-gray-900 mb-2">
                          {analysis.shortAnswer}
                        </h4>
                      </div>

                      {/* Detailed Answer */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {analysis.detailedAnswer}
                        </p>
                      </div>

                      {/* Footnotes */}
                      {analysis.footnotes.length > 0 && (
                        <div className="flex gap-1.5">
                          {analysis.footnotes.map(fn => (
                            <button
                              key={fn}
                              className="inline-flex items-center justify-center w-[22px] h-[22px] rounded bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 border border-gray-300 font-medium"
                            >
                              {fn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel - Document Preview */}
              <div className="flex-1 flex flex-col bg-gray-100">
                {/* PDF Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <Menu className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <Search className="size-4 text-gray-600" />
                    </button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ChevronLeft className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ChevronRight className="size-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="w-10 text-center text-sm border border-gray-300 rounded px-1 py-1"
                    />
                    <span className="text-sm text-gray-600">of {totalPages}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ZoomOut className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ZoomIn className="size-4 text-gray-600" />
                    </button>
                    <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-white">
                      <option>Page Width</option>
                      <option>Fit Page</option>
                      <option>100%</option>
                      <option>150%</option>
                    </select>
                  </div>
                </div>

                {/* PDF Content */}
                <div className="flex-1 overflow-auto p-8">
                  <div className="max-w-[820px] mx-auto bg-white shadow-lg p-12 min-h-[1100px]">
                    <div className="text-xs text-gray-400 mb-8">5/27/22, 12:18 PM</div>
                    
                    <div className="text-center mb-8">
                      <div className="text-xs text-gray-500 mb-2">EXHIBIT 14.6E</div>
                      <h1 className="text-xl font-bold text-gray-900 mb-6">MASTER SERVICES AGREEMENT</h1>
                    </div>

                    <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                      <p>
                        This Master Services Agreement (this <span className="font-semibold">"Agreement"</span>) is entered into as of July 24, 2020 (the <span className="font-semibold">"Effective Date"</span>), 
                        by and between Agents National Title Insurance Company, a Missouri Corporation with offices at 1207 W. Broadway 
                        (<span className="font-semibold">"Vendor"</span>) and AHP Title Holdings, LLC, a limited liability company organized under the laws of the State of 
                        Delaware, with offices at 60 S. LaSalle Street, Suite 1110, Chicago, IL 60603 (<span className="font-semibold">"CALC"</span>). AHP and/or GCTC, as the 
                        context may require, are sometimes referred to herein as the <span className="font-semibold">"Company,"</span> and the Company, collectively with Vendor 
                        are sometimes referred to herein as the <span className="font-semibold">"Parties."</span>
                      </p>

                      <h2 className="font-bold text-gray-900 mt-6">1. Services.</h2>
                      
                      <p>
                        (a) <span className="underline">Provision of Services</span>. During the Term (as defined below) of this Agreement, the Company and Vendor 
                        may agree upon services that the Vendor will provide to the Company from time to time (the <span className="font-semibold">"Services"</span>), 
                        which Services shall be set forth in a statement of work, in form similar to that set forth in <span className="font-semibold">Exhibit A</span> to 
                        this Agreement (each, a <span className="font-semibold">"Statement of Work"</span>). The Services may include provisions of services and/or 
                        delivery of certain deliverables, reports or other items, which will be described, along with any terms and 
                        conditions that are specific to such Services, in reasonably detail on the related Statement of Work. To the 
                        extent not set forth expressly in a fully executed Statement of Work, Vendor shall not have agreed to 
                        provide any Services to Company and Company shall have no liability to Vendor under this Agreement. In 
                        the event of any conflict between this Agreement and any Statement of Work, the terms, conditions and 
                        provisions of the Statement of Work shall control. Unless otherwise agreed, the Parties anticipate that the 
                        Statements of Work will be numbered consecutively.
                      </p>

                      <p>
                        (b) <span className="underline">Provision of Services</span>. The Vendor shall provide the Services: (a) in accordance with the terms and subject 
                        to the conditions set forth in each Statement of Work and this Agreement; (b) using personnel of required 
                        skill, experience and qualifications; (c) in a timely, workmanlike, and professional manner; (d) in 
                        accordance with generally recognized industry standards in Vendor's field; and (e) to the reasonable 
                        satisfaction of the Company. Notwithstanding anything in this Agreement to the contrary, nothing in this 
                        Agreement shall be construed to prevent the Company from itself performing or from acquiring other 
                        providers that are similar to or identical to the Services.
                      </p>

                      <h2 className="font-bold text-gray-900 mt-6">2. Term, Termination and Effect.</h2>
                      
                      <p>
                        (a) <span className="underline">Term</span>. The term of this Agreement (the <span className="font-semibold">"Initial Term"</span>) shall be twelve (12) months commencing on the 
                        Effective Date. This Agreement may be renewed for successive renewal terms of twelve (12) months each 
                        upon mutual written agreement of the Parties (the Initial Term, along with any renewal term, the <span className="font-semibold">"Terms"</span>). 
                        Each Statement of Work executed during the Term shall set forth the period of performance and the 
                        Services to be performed under such Statement of Work, which may extend beyond the Term. Any 
                        Statement of Work executed prior to the termination of this Agreement shall remain subject to the terms 
                        and conditions of this Agreement for the term of such Statement of Work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comment Popover */}
          {activeCommentPopover !== null && (
            <AnalysisCommentPopover
              isVisible={true}
              onClose={() => setActiveCommentPopover(null)}
              analysisTitle={fieldAnalyses[activeCommentPopover].abbreviatedTitle}
              existingComments={getCommentsForAnalysis(activeCommentPopover)}
              position={commentPopoverPosition}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
