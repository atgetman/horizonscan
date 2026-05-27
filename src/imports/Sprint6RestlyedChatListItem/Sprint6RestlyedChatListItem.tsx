export default function Sprint6RestlyedChatListItem() {
  return (
    <div className="bg-[#edf2f0] content-stretch flex items-center px-[12px] py-[8px] relative rounded-[8px] size-full" data-name="Sprint6 - Restlyed-chat-list-item">
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="body">
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="title-and-controls">
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="file">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Staged item icons">
              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="miscellaneous/word">
                <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#1d4b34] text-[14px] text-center w-full">
                  <p className="leading-[normal]">{`\uF4A6`}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d4b34] text-[14px] whitespace-nowrap">
              <p className="leading-[1.2]">Researching employee rights</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center shrink-0 size-[24px]" data-name="controls" />
        </div>
        <div className="content-stretch flex gap-[6px] h-[20px] items-center pl-[23px] relative shrink-0" data-name="meta-data">
          <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
            <p className="leading-[1.2]">1 day ago</p>
          </div>
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="coco-dot-divider">
            <div className="relative shrink-0 size-[4px]" data-name="circle">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
                <circle cx="2" cy="2" fill="var(--fill-0, #8A8A8A)" id="circle" r="2" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
            <p className="leading-[1.2]">[Workspace name]</p>
          </div>
          <div className="content-stretch flex gap-[2px] items-center shrink-0 size-[4px]" data-name="coco-dot-divider" />
          <div className="content-stretch flex gap-[2px] items-center shrink-0 size-[4px]" data-name="coco-dot-divider" />
          <div className="content-stretch flex gap-[4px] h-[19px] items-start shrink-0 w-[30px]" data-name="saf-anchor" />
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <div className="bg-[#ccd9d2] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="LRE saf-button-icon - email">
          <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
            <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#1d4b34] text-[16px] text-center w-full">
              <p className="leading-[normal]">{`\uF142`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}