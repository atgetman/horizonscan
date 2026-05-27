export default function ChatContainer() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center pt-[96px] relative size-full" data-name="Chat container">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center justify-center max-w-[720px] min-h-px min-w-px pt-[96px] relative w-[720px]" data-name="Chat welcome">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-[720px]">
            <div className="content-stretch flex gap-[10px] items-center justify-center not-italic relative shrink-0">
              <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] relative shrink-0 text-[#de6633] text-[14px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] whitespace-nowrap">
                <p className="leading-[normal]"></p>
              </div>
              <p className="font-['Clario:Medium',sans-serif] leading-[1.2] relative shrink-0 text-[#666] text-[20px]">State v. Marcus T. Reynolds</p>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-center">
              <div className="flex flex-col font-['Clario:Medium',sans-serif] h-[42px] justify-center leading-[0] not-italic relative shrink-0 text-[#123021] text-[28px] w-[712px]">
                <p className="leading-[1.2] whitespace-pre-wrap">Let's take some work off your plate</p>
              </div>
              <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[15px] w-[712px] whitespace-pre-wrap">{`Add files to your workspace and reference them with natural language. `}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col isolate items-start max-w-[720px] relative shrink-0 w-[720px]" data-name="Chat prompt - Desktop FA">
            <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_8px_16px_0px_rgba(0,0,0,0.05)] shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
              <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
                <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="saf-text-area">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="outer-frame">
                    <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="text-area-field">
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex items-start px-[14px] py-[12px] relative w-full">
                          <div className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px relative text-[#666] text-[15px] whitespace-pre-wrap">
                            <p className="mb-0">Ask CoCounsel to perform a legal task...</p>
                            <p className="mb-0">&nbsp;</p>
                            <p>&nbsp;</p>
                          </div>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border-[#d2d2d2] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-0 shrink-0 w-full" data-name="Divider" />
              <div className="bg-white h-[39px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Prompt Drawer">
                <div aria-hidden="true" className="absolute border-[#d2d2d2] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center pb-[4px] px-[8px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center justify-between min-h-px min-w-px relative" data-name="Drawer buttons">
                      <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
                        <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
                          <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
                            <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
                              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                              <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Property 1=saf-icon">
                                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
                                  <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
                                    <p className="leading-[normal] whitespace-pre-wrap"></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
                            <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
                              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                              <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Property 1=saf-icon">
                                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
                                  <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
                                    <p className="leading-[normal] whitespace-pre-wrap"></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
                            <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
                              <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                              <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Property 1=saf-icon">
                                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
                                  <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
                                    <p className="leading-[normal] whitespace-pre-wrap"></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
                        <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
                          <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
                            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Property 1=saf-icon">
                              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
                                <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
                                  <p className="leading-[normal] whitespace-pre-wrap"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-start relative shrink-0 size-[28px]" data-name="bttn: send prompt">
                          <div className="bg-[#1d4b34] content-stretch flex items-center justify-center p-[8px] relative rounded-[100px] shrink-0 size-[28px]" data-name="saf-button-icon">
                            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
                            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/arrow-up">
                              <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16px] text-center text-white w-full">
                                <p className="whitespace-pre-wrap">
                                  <span className="leading-[normal] text-white">arrow-u</span>
                                  <span className="leading-[normal]">p</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
          <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
            <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
                <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
                  <p className="leading-[normal] whitespace-pre-wrap"></p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
                <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
                  <p className="leading-[1.2] whitespace-pre-wrap">Draft a legal document...</p>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
                <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
                  <p className="leading-[normal] whitespace-pre-wrap"></p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
                <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
                  <p className="leading-[1.2] whitespace-pre-wrap">Ask a research question...</p>
                </div>
              </div>
            </div>
            <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
              <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
              <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
                <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
                  <p className="leading-[normal] whitespace-pre-wrap"></p>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
                <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
                  <p className="leading-[1.2] whitespace-pre-wrap">Analyze document sets...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="[text-decoration-skip-ink:none] decoration-solid font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#666] text-[14px] text-center underline w-full whitespace-pre-wrap">Browse all prompts</p>
      </div>
      <div className="h-[180px] shrink-0 w-full" />
    </div>
  );
}