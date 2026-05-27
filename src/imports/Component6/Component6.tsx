function HeaderSubHeader() {
  return (
    <div className="content-stretch flex items-center justify-end mb-[-40px] relative shrink-0 w-full" data-name="Header-sub-header">
      <div className="bg-[rgba(252,252,252,0)] content-stretch flex gap-[8px] items-center justify-center p-[12px] relative shrink-0 size-[40px]" data-name="cc-button-embedded-icon">
        <div aria-hidden="true" className="absolute border-[rgba(252,252,252,0)] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">xmark-large</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#eaffe5] content-stretch flex flex-col items-start mb-[-40px] p-[18px] relative rounded-[50px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#bce0a2] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#387c2b] text-[28px] text-center whitespace-nowrap">
        <p className="leading-[normal]">circle-check</p>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[40px] relative size-full" data-name="Component 6">
      <HeaderSubHeader />
      <Frame />
    </div>
  );
}