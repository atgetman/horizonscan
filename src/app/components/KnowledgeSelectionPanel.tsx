import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'personal' | 'firm';
}

interface KnowledgeSelectionPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  skills: Skill[];
  selectedSkillIds: string[];
  onToggleSkill: (skillId: string) => void;
}

export function KnowledgeSelectionPanel({
  isOpen,
  onToggle,
  skills,
  selectedSkillIds,
  onToggleSkill
}: KnowledgeSelectionPanelProps) {
  const myKnowledge = skills.filter(s => s.type === 'personal');
  const firmKnowledge = skills.filter(s => s.type === 'firm');

  return (
    <div className="border border-[#E5E5E5] rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223]">Knowledge</span>
        {isOpen ? (
          <ChevronUp className="size-4 text-[#666]" />
        ) : (
          <ChevronDown className="size-4 text-[#666]" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-[#E5E5E5]">
          {/* MY KNOWLEDGE Section */}
          {myKnowledge.length > 0 && (
            <div className="px-4 py-3">
              <div className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#8A8A8A] uppercase tracking-wide mb-2">
                MY KNOWLEDGE
              </div>
              <div className="space-y-1">
                {myKnowledge.map((skill) => {
                  const isSelected = selectedSkillIds.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => onToggleSkill(skill.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                        isSelected
                          ? 'bg-[#e8f5e9]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#4caf50] flex items-center justify-center">
                            <Check className="size-3.5 text-white" strokeWidth={2.5} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#d2d2d2]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-['Clario'] font-semibold text-[#212223] mb-0.5">
                          {skill.name}
                        </div>
                        <div className="text-[13px] font-['Source_Sans_3'] text-gray-500 leading-relaxed">
                          {skill.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CALDWELL & STERLING Section */}
          {firmKnowledge.length > 0 && (
            <div className="px-4 py-3 border-t border-[#E5E5E5]">
              <div className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#8A8A8A] uppercase tracking-wide mb-2">
                CALDWELL & STERLING
              </div>
              <div className="space-y-1">
                {firmKnowledge.map((skill) => {
                  const isSelected = selectedSkillIds.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => onToggleSkill(skill.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                        isSelected
                          ? 'bg-[#e8f5e9]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#4caf50] flex items-center justify-center">
                            <Check className="size-3.5 text-white" strokeWidth={2.5} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#d2d2d2]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className="text-[15px] font-['Clario'] font-semibold text-[#212223]">
                            {skill.name}
                          </div>
                          <span className="px-2 py-0.5 bg-[#c8e6c9] text-[#2e7d32] text-[11px] font-['Source_Sans_3'] font-semibold rounded uppercase">
                            FIRM
                          </span>
                        </div>
                        <div className="text-[13px] font-['Source_Sans_3'] text-gray-500 leading-relaxed">
                          {skill.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
