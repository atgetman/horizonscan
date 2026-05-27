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
  
  // File Name analysis
  if (rowData['File Name']) {
    analyses.push({
      columnName: 'File Name',
      abbreviatedTitle: 'Document identification',
      question: 'What type of document is this and what is its primary subject matter?',
      shortAnswer: 'Meeting minutes from April 2023',
      detailedAnswer: `This document is titled "${rowData['File Name']}" and appears to be formal meeting minutes. Based on the file naming convention and content analysis, this represents an official record of discussions, decisions, and action items from a corporate meeting held on the date indicated in the filename. The document contains structured sections typical of meeting minutes including attendees, agenda items, and resolutions.`,
      footnotes: [1, 2],
      commentCount: 2
    });
  }

  // Bates Range analysis
  if (rowData['Bates Range']) {
    analyses.push({
      columnName: 'Bates Range',
      abbreviatedTitle: 'Document scope',
      question: 'What is the scope and length of this document in the production set?',
      shortAnswer: `${rowData['Bates Range']} (23 pages)`,
      detailedAnswer: `The document has been assigned Bates numbering ${rowData['Bates Range']}, indicating it spans 23 pages in the production. This Bates range places the document in the first production batch, suggesting it was identified early in the discovery process as potentially relevant. The sequential numbering confirms this is a complete, unredacted document with no missing pages.`,
      footnotes: [3, 4],
      commentCount: 0
    });
  }

  // Date Produced analysis
  if (rowData['Date Produced']) {
    analyses.push({
      columnName: 'Date Produced',
      abbreviatedTitle: 'Production timeline',
      question: 'When was this document produced and what does this timing indicate?',
      shortAnswer: `Produced on ${rowData['Date Produced']}`,
      detailedAnswer: `This document was produced to the requesting party on ${rowData['Date Produced']}, which falls within the initial production deadline established in the discovery schedule. The production date suggests this document was prioritized for review and release, likely due to its relevance to key issues in the litigation. Documents produced in this timeframe typically underwent privilege review and redaction analysis before release.`,
      footnotes: [5],
      commentCount: 1
    });
  }

  // Custodian analysis
  if (rowData['Custodian']) {
    analyses.push({
      columnName: 'Custodian',
      abbreviatedTitle: 'Document custodian',
      question: 'Who is the custodian of this document and what is their role in the matter?',
      shortAnswer: `${rowData['Custodian']} - Project Manager`,
      detailedAnswer: `The document custodian is ${rowData['Custodian']}, who served as the primary Project Manager for the construction project at issue in this litigation. As custodian, ${rowData['Custodian']?.split(' ')[0]} had direct possession or control of this document and was responsible for its creation, maintenance, or receipt. The custodian's role is significant because it establishes the document's authenticity and chain of custody, and ${rowData['Custodian']?.split(' ')[0]}'s position suggests this document contains key decision-making information.`,
      footnotes: [6, 7],
      commentCount: 0
    });
  }

  // Source/Type analysis
  if (rowData['Source/Type']) {
    analyses.push({
      columnName: 'Source/Type',
      abbreviatedTitle: 'Document classification',
      question: 'What is the source and format classification of this document?',
      shortAnswer: rowData['Source/Type'],
      detailedAnswer: `This document is classified as ${rowData['Source/Type']}. The classification indicates both the origin of the document (${rowData['Source/Type'].split('/')[0]}) and its format type (${rowData['Source/Type'].split('/')[1]}). This classification is important for authentication purposes and helps establish the business context in which the document was created. Documents of this type are generally considered business records and may qualify for hearsay exceptions under Federal Rule of Evidence 803(6).`,
      footnotes: [8, 9],
      commentCount: 3
    });
  }

  // Status analysis
  if (rowData['Status']) {
    analyses.push({
      columnName: 'Status',
      abbreviatedTitle: 'Review status',
      question: 'What is the current review status of this document?',
      shortAnswer: rowData['Status'],
      detailedAnswer: `The document has been marked as "${rowData['Status']}" in the document review system. This status indicates that the document has undergone complete review by the legal team, including relevance determination, privilege analysis, and responsiveness assessment. ${
        rowData['Status'] === 'Reviewed' ? 'The completion of review means this document is ready for production or has been produced to opposing counsel.' :
        rowData['Status'] === 'Flagged' ? 'The flagged status indicates potential issues requiring senior attorney review, such as possible privilege concerns or highly relevant content.' :
        rowData['Status'] === 'Processing' ? 'The processing status means the document is currently undergoing technical processing, including OCR, metadata extraction, or format conversion.' :
        'The status indicates this document requires additional processing or review before final disposition.'
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