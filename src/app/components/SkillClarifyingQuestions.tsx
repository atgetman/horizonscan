import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SkillClarifyingQuestionsProps {
  onSubmit: (answers: any) => void;
  onSkip: () => void;
}

export function SkillClarifyingQuestions({ onSubmit, onSkip }: SkillClarifyingQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({
    q1: '',
    q2: [] as string[],
    q3: 'Federal law (US)',
    q4: 'Highly formal and traditional legal language',
    q5: [] as string[]
  });

  const handleNext = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleCheckbox = (questionKey: string, value: string) => {
    setAnswers(prev => {
      const current = prev[questionKey as keyof typeof prev] as string[];
      if (current.includes(value)) {
        return { ...prev, [questionKey]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [questionKey]: [...current, value] };
      }
    });
  };

  const setRadio = (questionKey: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  const setText = (questionKey: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  const getQuestionTitle = () => {
    switch (currentQuestion) {
      case 1: return 'What should this skill help you accomplish?';
      case 2: return 'What type of legal work do these strict rules apply to?';
      case 3: return 'What is the primary jurisdiction or legal system this guideline should apply to?';
      case 4: return 'What tone and level of formality should this output maintain?';
      case 5: return 'What content should this skill ensure is never included in the output?';
      default: return '';
    }
  };

  // Question 1: Text input
  const renderQuestion1 = () => (
    <div className="content-stretch flex flex-col items-start max-h-[261px] relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
        <textarea
          value={answers.q1}
          onChange={(e) => setText('q1', e.target.value)}
          placeholder="e.g. Review liability caps in SaaS contracts and flag anything outside our standard position."
          className="bg-white h-[120px] relative rounded-lg w-full font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[1.5] px-[12px] py-[8px] text-[#666] text-[15px] border border-[#d2d2d2] resize-none focus:outline-none focus:border-[#1d4b34]"
        />
      </div>
    </div>
  );

  // Question 2, 3, 4, 5: List selections
  const q2Options = ['Due diligence transactions', 'All client communications', 'Document review projects', 'Court filings and pleadings'];
  const q3Options = ['Federal law (US)', 'State law (specify which state)', 'International/cross-border matters', 'Administrative/regulatory proceedings'];
  const q4Options = ['Highly formal and traditional legal language', 'Professional but conversational business tone', 'Academic and technical writing style', 'Casual and approachable communication'];
  const q5Options = ['Legal advice or opinions', 'Confidential client information', 'Unprofessional or overly casual language', 'Technical legal citations'];

  const renderListQuestion = (questionNum: number, options: string[], type: 'checkbox' | 'radio') => {
    const questionKey = `q${questionNum}`;
    const currentValue = answers[questionKey as keyof typeof answers];

    return (
      <div className="content-stretch flex flex-col items-start max-h-[261px] relative shrink-0 w-full">
        {options.map((option, index) => {
          const isSelected = type === 'checkbox'
            ? (currentValue as string[]).includes(option)
            : currentValue === option;

          return (
            <div key={option} className="w-full">
              <button
                onClick={() => type === 'checkbox' ? toggleCheckbox(questionKey, option) : setRadio(questionKey, option)}
                className={`relative rounded-lg w-full min-h-[44px] px-[12px] py-[12px] flex items-center gap-[18px] ${isSelected ? 'bg-[#edf2f0]' : 'bg-white'}`}
              >
                {/* Checkbox or Radio */}
                <div className="flex items-center shrink-0">
                  {type === 'checkbox' ? (
                    <div className={`relative rounded-[2px] size-[16px] ${isSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                      <div className="flex items-center justify-center size-full">
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className={`absolute border ${isSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                    </div>
                  ) : (
                    <div className={`relative rounded-full size-[16px] ${isSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                      <div className="flex items-center justify-center size-full">
                        {isSelected && (
                          <div className="size-[6px] rounded-full bg-white" />
                        )}
                      </div>
                      <div className={`absolute border ${isSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-full`} />
                    </div>
                  )}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-left">
                  <p className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">{option}</p>
                </div>
              </button>
            </div>
          );
        })}

        {/* Custom input option */}
        <div className="w-full">
          <div className="flex items-center gap-[18px] px-[12px] py-[8px]">
            <div className="flex items-center shrink-0">
              {type === 'checkbox' ? (
                <div className="bg-white relative rounded-[2px] size-[16px]">
                  <div className={`absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                </div>
              ) : (
                <div className="bg-white relative rounded-full size-[16px]">
                  <div className={`absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-full`} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type your own words "
                className="bg-white h-[32px] w-full rounded-lg px-[12px] py-[4px] font-['Source_Sans_3:Regular',sans-serif] font-normal text-[#212223] text-[16px] leading-[1.35] border border-[#d2d2d2] focus:outline-none focus:border-[#1d4b34]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="content-stretch flex flex-col isolate items-start relative shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)] w-full max-w-[800px] mx-auto">
      {/* Header */}
      <div className="bg-white content-stretch flex flex-col items-start relative w-full rounded-tl-[16px] rounded-tr-[16px]">
        <div className="content-stretch flex items-start px-[24px] pt-[20px] pb-[12px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative">
            <div className="content-stretch flex items-start justify-between relative w-full">
              {/* Title on Left */}
              <div className="content-stretch flex items-start relative flex-1">
                <div className="content-stretch flex gap-[8px] items-start relative">
                  <div className="content-stretch flex items-center pt-[4px] relative shrink-0">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <div 
                        className="w-[10px] h-[10px] rotate-45 bg-[#de6633]"
                        style={{ 
                          boxShadow: '0px 4px 33px rgba(247, 93, 27, 0.4)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[1.5] relative text-[16px] text-[#212223]">
                    <p>{getQuestionTitle()}</p>
                  </div>
                </div>
              </div>

              {/* Pagination and Close - Right Aligned */}
              <div className="content-stretch flex items-center gap-[12px] relative shrink-0">
                <div className="content-stretch flex items-center relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <button
                      onClick={handlePrev}
                      disabled={currentQuestion === 1}
                      className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className={`size-4 ${currentQuestion === 1 ? 'text-[#8a8a8a]' : 'text-[#212223]'}`} />
                    </button>
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
                        <p className="leading-[1.5]">{currentQuestion}</p>
                      </div>
                      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
                        <p className="leading-[1.5]">of</p>
                      </div>
                      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
                        <p className="leading-[1.5]">5</p>
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === 5}
                      className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className={`size-4 ${currentQuestion === 5 ? 'text-[#8a8a8a]' : 'text-[#212223]'}`} />
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onSkip}
                  className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0 hover:bg-gray-100 transition-colors !border-0 !outline-none"
                >
                  <X className="size-4 text-[#212223]" />
                </button>
              </div>
            </div>

            {/* Question Content */}
            <div className="content-stretch flex flex-col items-start max-h-[261px] overflow-y-auto relative w-full">
              {currentQuestion === 1 && renderQuestion1()}
              {currentQuestion === 2 && renderListQuestion(2, q2Options, 'checkbox')}
              {currentQuestion === 3 && renderListQuestion(3, q3Options, 'radio')}
              {currentQuestion === 4 && renderListQuestion(4, q4Options, 'radio')}
              {currentQuestion === 5 && renderListQuestion(5, q5Options, 'checkbox')}
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
      </div>

      {/* Footer Buttons */}
      <div className="bg-white relative rounded-bl-[16px] rounded-br-[16px] w-full">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center pb-[16px] pt-[12px] px-[24px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px relative">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <button
                  onClick={onSkip}
                  className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#d2d2d2]"
                >
                  <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                    <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                      <p className="leading-[1.2]">Skip</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#1d4b34]"
                >
                  <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                    <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap">
                      <p className="leading-[1.2]">{currentQuestion === 5 ? 'Build skill' : 'Next'}</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}