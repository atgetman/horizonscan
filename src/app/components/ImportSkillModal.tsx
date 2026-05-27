import { useState, useRef } from "react";
import { X, Upload, FileText } from "lucide-react";

interface ImportSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (skillData: any) => void;
}

export function ImportSkillModal({ isOpen, onClose, onImport }: ImportSkillModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isValidFileType = (file: File) => {
    const validExtensions = ['.md', '.txt', '.docx', '.pdf'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext)) || fileName === 'skill.md';
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
        setError('');
      } else {
        setError('Please upload a valid file (.md, .txt, SKILL.md, .docx, .pdf)');
      }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
        setError('');
      } else {
        setError('Please upload a valid file (.md, .txt, SKILL.md, .docx, .pdf)');
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const parseSkillContent = async (file: File) => {
    let content = '';
    
    // For now, we can only read text-based files directly
    // In a real app, you'd need libraries to parse .docx and .pdf
    if (file.name.endsWith('.docx') || file.name.endsWith('.pdf')) {
      // Placeholder - in production you'd use a library to parse these
      content = `Imported from ${file.name}`;
    } else {
      content = await file.text();
    }

    // Parse YAML frontmatter and extract skill details
    const lines = content.split('\n');
    let name = '';
    let type = 'output-guideline';
    let practiceArea = '';
    let description = '';

    // Look for YAML frontmatter
    if (lines[0] === '---') {
      let i = 1;
      while (i < lines.length && lines[i] !== '---') {
        const line = lines[i].trim();
        if (line.startsWith('name:')) {
          name = line.substring(5).trim();
        } else if (line.startsWith('type:')) {
          type = line.substring(5).trim().replace('_', '-');
        } else if (line.startsWith('practice_area:')) {
          practiceArea = line.substring(14).trim();
        } else if (line.startsWith('description:')) {
          description = line.substring(12).trim();
        }
        i++;
      }
    }

    // If no name found in YAML, try to get it from markdown header or filename
    if (!name) {
      const headerLine = lines.find(line => line.startsWith('# '));
      if (headerLine) {
        name = headerLine.substring(2).trim();
      } else {
        // Use filename without extension
        name = file.name.replace(/\.(md|txt|docx|pdf)$/i, '');
      }
    }

    return {
      id: Date.now().toString(),
      name: name || 'Imported Skill',
      type: type as 'output-guideline' | 'capability' | 'content-tool' | 'directing',
      practiceArea: practiceArea || 'General Practice',
      purpose: description,
      content,
      dateSaved: new Date().toISOString(),
      author: 'You',
      scope: 'personal' as const,
      lastTested: null,
    };
  };

  const handleImport = async () => {
    if (!uploadedFile) {
      setError('Please select a file to import');
      return;
    }

    try {
      const skillData = await parseSkillContent(uploadedFile);
      onImport(skillData);
      handleClose();
    } catch (err) {
      setError('Failed to parse skill file. Please check the format.');
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
                Import skill
              </h2>
              <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#666666] mt-1">
                Already have a skill file from Claude? Upload it here and CoCounsel will read your file and adapt it to the CoCounsel format.
              </p>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
              <X className="size-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
          <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35] block mb-1">
            Documents
          </label>
          <p className="text-[14px] font-['Source_Sans_3'] font-normal text-[#666666] mb-3">
            Supports .md, .txt, SKILL.md, .docx, .pdf
          </p>
          
          {!uploadedFile ? (
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
              <input
                type="file"
                ref={fileInputRef}
                accept=".md,.txt,.docx,.pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                <FileText className="size-4 text-[#0062c4] shrink-0" />
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{uploadedFile.name}</span>
                  <span className="text-[13px] font-['Source_Sans_3'] text-gray-500">
                    {uploadedFile.size < 1024 
                      ? `${uploadedFile.size} B` 
                      : uploadedFile.size < 1024 * 1024 
                      ? `${(uploadedFile.size / 1024).toFixed(1)} KB` 
                      : `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`}
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="size-5 shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                  aria-label="Remove file"
                >
                  <X className="size-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-[14px] font-['Source_Sans_3'] font-normal text-red-700">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] p-6 bg-white">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={handleClose}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Cancel</p>
              </div>
            </button>
          </div>
          <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 ${
            !uploadedFile ? 'bg-[#f2f2f2]' : 'bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors'
          }`}>
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
              !uploadedFile ? 'border-[#f2f2f2]' : 'border-[#1d4b34]'
            }`} />
            <button
              onClick={handleImport}
              disabled={!uploadedFile}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
            >
              <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
                !uploadedFile ? 'text-[#8a8a8a]' : 'text-[#fcfcfc]'
              }`}>
                <p className="leading-[1.35]">Import skill</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}