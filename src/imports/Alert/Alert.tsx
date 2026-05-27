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

function Frame1() {
  return (
    <div className="absolute bg-[#ffeded] content-stretch flex flex-col items-start left-0 p-[18px] rounded-[50px] top-0">
      <div aria-hidden="true" className="absolute border-2 border-[#ffbfbf] border-solid inset-0 pointer-events-none rounded-[50px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#dc0a0a] text-[28px] text-center whitespace-nowrap">
        <p className="leading-[normal]">hexagon-exclamation</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="mb-[-40px] relative shrink-0 size-[64px]">
      <Frame1 />
    </div>
  );
}

function Message() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start justify-center min-w-[92px] py-[4px] relative shrink-0 w-full" data-name="message">
      <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] min-w-[92px] relative text-[#212223] text-[16px] text-center">The files and artifacts within this workspace will be lost. This can’t be undone.</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[48px] relative size-full">
          <p className="font-['Clario:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[28px] text-center w-full">Delete this workspace?</p>
          <Message />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-center pb-[40px] relative shrink-0 w-[500px]" data-name="Component 6">
        <HeaderSubHeader />
        <Frame2 />
      </div>
      <Frame />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] whitespace-nowrap">
        <p className="leading-[1.35]">Delete</p>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.35]">Cancel</p>
      </div>
    </div>
  );
}

function ButtonGrouping() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0" data-name="button-grouping">
      <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents />
      </div>
      <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents1 />
      </div>
    </div>
  );
}

function CcButtonFooter() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="cc-button-footer">
      <ButtonGrouping />
    </div>
  );
}

export default function Alert() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-center px-[24px] py-[32px] relative rounded-[16px] size-full" data-name="alert">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_8px_12px_0px_rgba(0,0,0,0.16)]" />
      <Frame3 />
      <CcButtonFooter />
    </div>
  );
}