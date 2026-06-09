import { useState } from "react";
import { X, Briefcase, FolderOpen, Info } from "lucide-react";
import svgPaths from "../../imports/RadioOption/svg-2zye11595e";

interface Skill {
  id: string;
  name: string;
  type: string;
  practiceArea: string;
  dateSaved: string;
  lastTested: string | null;
  author: string;
}

interface ShareSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  skills?: Skill[];
  onShare: (target: 'firm' | 'workspace', workspaceId?: string, note?: string) => void;
  hasBeenSharedToFirm?: boolean;
  onConfirm?: () => void;
}

interface Workspace {
  id: string;
  name: string;
  category: string;
  members: { initials: string; color: string; name: string }[];
}

const workspaces: Workspace[] = [
  {
    id: 'hernandez-pacific',
    name: 'Hernandez v. Pacific Builders Inc.',
    category: 'Employment Law',
    members: [
      { initials: 'DS', color: '#00897B', name: 'David Smith' },
      { initials: 'RM', color: '#1976D2', name: 'Rachel Martinez' },
      { initials: 'JL', color: '#C9A96E', name: 'Jennifer Lewis' },
    ]
  },
  {
    id: 'blue-ridge-trust',
    name: 'In re: Blue Ridge Trust 2025',
    category: 'Trusts & Estates',
    members: [
      { initials: 'DS', color: '#00897B', name: 'David Smith' },
      { initials: 'BP', color: '#C9A96E', name: 'Brian Peterson' },
    ]
  },
  {
    id: 'meridian-tech',
    name: 'Meridian Tech Acquisition',
    category: 'Corporate / M&A',
    members: [
      { initials: 'DS', color: '#00897B', name: 'David Smith' },
      { initials: 'EC', color: '#64B5F6', name: 'Emily Chen' },
      { initials: 'NP', color: '#C9A96E', name: 'Nicole Patel' },
    ]
  },
];

export function ShareSkillModal({ isOpen, onClose, skillName, skills = [], onShare, hasBeenSharedToFirm, onConfirm }: ShareSkillModalProps) {
  const [shareTarget, setShareTarget] = useState<'firm' | 'workspace'>('firm');
  const [selectedWorkspace, setSelectedWorkspace] = useState('hernandez-pacific');
  const [reviewerNote, setReviewerNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onShare(shareTarget, shareTarget === 'workspace' ? selectedWorkspace : undefined, reviewerNote);
    onClose();
  };

  const handleShare = () => {
    handleSubmit();
    if (onConfirm) onConfirm();
  };

  const canSubmit = !!(shareTarget === 'firm' ? !hasBeenSharedToFirm : selectedWorkspace);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">
              {skills.length > 1 ? 'Share these skills' : 'Share this skill'}
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
              <X className="size-5 text-gray-500" />
            </button>
          </div>
          <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223] mb-3">Choose who can access this skill.</p>
          
          {/* Skills list in header - full width */}
          {skills.length > 1 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 bg-[#f2f2f2] rounded-lg">
              {skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#DE6633]" />
                  <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{skill.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f2f2f2] rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#DE6633]" />
              <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{skillName}</span>
            </div>
          )}
        </div>

        <div className="px-6 pt-4 pb-3">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setShareTarget('firm')}
              className={`p-4 rounded-lg border text-left transition-all ${
                shareTarget === 'firm'
                  ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)]'
                  : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-sm'
              }`}
            >
              <Briefcase className="size-6 mb-3 text-[#DE6633] fill-[#FFF0E8]" />
              <h3 className={`text-[15px] font-['Clario'] font-semibold mb-1 ${shareTarget === 'firm' ? 'text-[#1d4b34]' : 'text-[#212223]'}`}>Firm library</h3>
              <p className="text-[13px] font-['Source_Sans_3'] font-normal text-[#212223] leading-relaxed">
                Submit for review. Approved skills become available firm-wide.
              </p>
            </button>

            <button
              onClick={() => setShareTarget('workspace')}
              className={`p-4 rounded-lg border text-left transition-all ${
                shareTarget === 'workspace'
                  ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)]'
                  : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-sm'
              }`}
            >
              <FolderOpen className="size-6 mb-3 text-[#DE6633] fill-[#FFF0E8]" />
              <h3 className={`text-[15px] font-['Clario'] font-semibold mb-1 ${shareTarget === 'workspace' ? 'text-[#1d4b34]' : 'text-[#212223]'}`}>Workspace</h3>
              <p className="text-[13px] font-['Source_Sans_3'] font-normal text-[#212223] leading-relaxed">
                Share instantly with a specific matter team.
              </p>
            </button>
          </div>

          {shareTarget === 'firm' && hasBeenSharedToFirm && (
            <div className="mb-6 bg-[#ededed] rounded-[4px] relative">
              <div aria-hidden="true" className="absolute border border-[#404040] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
              <div className="flex gap-2 items-start px-4 py-2">
                <Info className="size-4 text-[#404040] mt-0.5 shrink-0" />
                <p className="flex-1 font-['Source_Sans_3'] font-normal leading-[1.5] text-[#212223] text-[15px]">
                  Sent to Caldwell & Sterling knowledge team for review on <span className="font-semibold">April 17, 2025</span>. Allow for 2-3 days for review.
                </p>
              </div>
            </div>
          )}

          {shareTarget === 'workspace' ? (
            <div>
              <label className="block text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35] mb-2">
                Select workspace
              </label>
              <div className="space-y-2">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => setSelectedWorkspace(workspace.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                      selectedWorkspace === workspace.id
                        ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)]'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {/* Radio button using Figma imported style */}
                    <div className="relative size-[16px] shrink-0 mt-0.5">
                      {selectedWorkspace === workspace.id ? (
                        <>
                          <div className="bg-[#1d4b34] relative rounded-[88px] size-full">
                            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                              <div className="flex items-center justify-center relative shrink-0">
                                <div className="-scale-y-100 flex-none rotate-180">
                                  <div className="relative size-[16px]">
                                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                      <g>
                                        <path d={svgPaths.p27209dc0} fill="white" />
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
                          </div>
                        </>
                      ) : (
                        <div className="relative size-[16px] rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223]">
                        {workspace.name}
                      </div>
                      <div className="text-[13px] font-['Source_Sans_3'] font-normal text-[#666666] mt-0.5">
                        {workspace.category}
                      </div>
                    </div>
                    <div className="flex items-center -space-x-1.5 mt-0.5">
                      {workspace.members.map((member, i) => (
                        <div
                          key={i}
                          className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-white text-white shadow-sm"
                          style={{ backgroundColor: member.color }}
                        >
                          {member.initials}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            !hasBeenSharedToFirm && (
              <div>
                <label className="block text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35] mb-2">
                  Note for reviewers (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. This captures my approach for SaaS customer-side work - may be useful as a firm standard position..."
                  value={reviewerNote}
                  onChange={(e) => setReviewerNote(e.target.value)}
                  className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] leading-[1.35] focus:outline-none focus:border-gray-400 resize-none"
                />
              </div>
            )
          )}
        </div>

        <div className="flex items-center justify-end gap-[8px] px-6 py-4">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={onClose}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Cancel</p>
              </div>
            </button>
          </div>
          <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 ${
            !canSubmit ? 'bg-[#f2f2f2]' : 'bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors'
          }`}>
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
              !canSubmit ? 'border-[#f2f2f2]' : 'border-[#1d4b34]'
            }`} />
            <button
              disabled={!canSubmit}
              onClick={handleShare}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
            >
              <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
                !canSubmit ? 'text-[#8a8a8a]' : 'text-[#fcfcfc]'
              }`}>
                <p className="leading-[1.35]">{shareTarget === 'firm' ? 'Send for review' : 'Share'}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
