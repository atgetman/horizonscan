import { useState, useRef } from "react";
import { X, Upload, Trash2, Share2, FileText, XCircle } from "lucide-react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { SkillDeletedModal } from "./SkillDeletedModal";
import { Toast } from "./Toast";

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: any;
  onSave: (skill: any) => void;
  onDelete: (skillId: string) => void;
  onShare?: (skill: any) => void;
}

export function EditSkillModal({ isOpen, onClose, skill, onSave, onDelete, onShare }: EditSkillModalProps) {
  if (!isOpen || !skill) return null;

  function generateSkillYAML(skill: any) {
    return `---
name: ${skill.name}
type: ${skill.type.replace('-', '_')}
areas:
  practice_area: ${skill.practiceArea}
description: ${skill.purpose || ''}
---

# ${skill.name}

## My rule

${skill.purpose || ''}
`;
  }

  const [skillContent, setSkillContent] = useState(skill?.content || generateSkillYAML(skill));
  const [skillName, setSkillName] = useState(skill?.name || '');
  const [activeTab, setActiveTab] = useState<'edit' | 'guideline'>('edit');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number; type: string; isPasted?: boolean }>>(skill?.uploadedDocuments || []);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showSkillDeleted, setShowSkillDeleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showPasteText, setShowPasteText] = useState(false);
  const [pasteLabel, setPasteLabel] = useState('');
  const [pasteContent, setPasteContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedFiles([...uploadedFiles, ...fileArray]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const fileArray = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedFiles([...uploadedFiles, ...fileArray]);
    }
  };

  const handleFileDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleAddPastedText = () => {
    if (pasteLabel && pasteContent) {
      const pastedDoc = {
        name: pasteLabel,
        size: pasteContent.length,
        type: 'text/plain',
        isPasted: true
      };
      setUploadedFiles([...uploadedFiles, pastedDoc]);
      setPasteLabel('');
      setPasteContent('');
      setShowPasteText(false);
    }
  };

  const handleSave = () => {
    onSave({ ...skill, name: skillName, content: skillContent });
    onClose();
  };

  const handleDelete = () => {
    onDelete(skill.id);
    setShowConfirmDelete(false);
    setShowSkillDeleted(true);
  };

  const handleSkillDeletedClose = () => {
    setShowSkillDeleted(false);
    onClose();
  };

  return (
    <>
      <DeleteConfirmationModal
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
        count={1}
      />
      <SkillDeletedModal
        isOpen={showSkillDeleted}
        onClose={handleSkillDeletedClose}
        count={1}
      />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">Edit skill</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Update how this skill works and what it knows.</p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-3 pt-2">
            <div className="content-stretch flex flex-col gap-[8px] items-start mb-6">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Skill name
                </label>
              </div>
              <input
                type="text"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
              />
              <div className="flex items-center gap-1.5 text-[13px] font-['Source_Sans_3'] text-gray-500">
                <span>by {skill.author}</span>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <span>{new Date(skill.dateSaved).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="mb-4">
              <textarea
                value={skillContent}
                onChange={(e) => setSkillContent(e.target.value)}
                rows={16}
                className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Monaco','Courier_New',monospace] text-[#212223] text-[14px] leading-relaxed focus:outline-none focus:border-gray-400 resize-none bg-gray-50 overflow-y-auto"
              />
            </div>

            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Documents
                </label>
                <p className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">
                  CoCounsel will reference these when running this skill.
                </p>
              </div>

              <div
                className={`content-stretch flex flex-col gap-[8px] items-center justify-center p-[12px] relative rounded-[8px] min-h-[80px] transition-colors w-full ${
                  isDragging ? 'bg-[#edf6ff]' : 'bg-white'
                }`}
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleFileDragEnter}
                onDragLeave={handleFileDragLeave}
              >
                <div aria-hidden="true" className={`absolute border-2 border-dashed inset-[-2px] pointer-events-none rounded-[10px] transition-colors ${
                  isDragging ? 'border-[#054688]' : 'border-[#8a8a8a]'
                }`} />
                <Upload className="size-4 text-[#404040]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
                  <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
                    <p className="leading-[1.35]">{isDragging ? '{Drag your file here to attach.}' : '{Or drag file here to attach.}'}</p>
                  </div>
                </div>
                {isDragging && uploadedFiles.length > 0 && (
                  <div className="absolute right-4 top-3 flex items-center gap-1 bg-[#0062c4] px-2.5 py-0.5 rounded-full">
                    <FileText className="size-4 text-[#0062c4]" />
                    <span className="text-[14px] font-['Source_Sans_3'] font-normal text-white whitespace-nowrap">
                      {uploadedFiles.length} document{uploadedFiles.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 w-full">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                      <FileText className="size-4 text-[#0062c4] shrink-0" />
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{file.name}</span>
                        {file.isPasted ? (
                          <span className="inline-block px-2 py-0.5 bg-[#e8d5ff] text-[#7c3aed] text-[12px] font-['Source_Sans_3'] font-medium rounded">
                            Pasted
                          </span>
                        ) : (
                          <span className="text-[13px] font-['Source_Sans_3'] text-gray-500">
                            {file.size < 1024 ? `${file.size} chars` : file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="size-5 shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="size-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!showPasteText && (
                <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0] w-fit">
                  <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                  <button
                    onClick={() => setShowPasteText(true)}
                    className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                  >
                    <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                      <p className="leading-[1.35]">Paste text</p>
                    </div>
                  </button>
                </div>
              )}

              {showPasteText && (
                <div className="w-full space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="content-stretch flex flex-col gap-[8px] items-start">
                    <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                      <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                        Label
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g., Due Diligence Checklist"
                      value={pasteLabel}
                      onChange={(e) => setPasteLabel(e.target.value)}
                      className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  <div className="content-stretch flex flex-col gap-[8px] items-start">
                    <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                      <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                        Content
                      </label>
                    </div>
                    <textarea
                      rows={8}
                      placeholder="Paste your document content here..."
                      value={pasteContent}
                      onChange={(e) => setPasteContent(e.target.value)}
                      className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] leading-[1.35] focus:outline-none focus:border-gray-400 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-[8px]">
                    <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
                      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                      <button
                        onClick={() => {
                          setShowPasteText(false);
                          setPasteLabel('');
                          setPasteContent('');
                        }}
                        className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                      >
                        <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                          <p className="leading-[1.35]">Cancel</p>
                        </div>
                      </button>
                    </div>
                    <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 ${!pasteLabel || !pasteContent ? 'bg-[#8a8a8a]' : 'bg-[#525252] hover:bg-[#3d3d3d] transition-colors'}`}>
                      <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${!pasteLabel || !pasteContent ? 'border-[#8a8a8a]' : 'border-[#525252]'}`} />
                      <button
                        onClick={handleAddPastedText}
                        disabled={!pasteLabel || !pasteContent}
                        className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
                      >
                        <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                          <p className="leading-[1.35]">Save text</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end px-6 py-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  onClick={onClose}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[16px] whitespace-nowrap">
                    <p className="leading-[1.35]">Cancel</p>
                  </div>
                </button>
              </div>
              <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
                <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  onClick={handleSave}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                    <p className="leading-[1.35]">Save changes</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}