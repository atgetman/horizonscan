function Frame4() {
  return (
    <div className="content-stretch flex items-center pt-[4px] relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#de6633] text-[16px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] w-[20px]">{`\uE5D6`}</p>
    </div>
  );
}

function IconQuestion() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Icon/Question">
      <Frame4 />
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap">
        <p className="leading-[1.5]">What should this skill help you accomplish?</p>
      </div>
    </div>
  );
}

function Range() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="range">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.5]">1</p>
      </div>
    </div>
  );
}

function Total() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="total">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.5]">5</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[92px]" data-name="buttons">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#8a8a8a] text-[12px] text-center w-full">
            <p className="leading-[normal]">chevron-left</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="cc-pagination-count">
        <Range />
        <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
          <p className="leading-[1.5]">of</p>
        </div>
        <Total />
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[12px] text-center w-full">
            <p className="leading-[normal]">chevron-right</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrevNext() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="prev-next">
      <Buttons />
    </div>
  );
}

function PageControls() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="page-controls">
      <PrevNext />
    </div>
  );
}

function SafPaginationContent() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end justify-center relative rounded-bl-[8px] rounded-br-[8px] shrink-0" data-name="saf-pagination-content">
      <PageControls />
    </div>
  );
}

function CcPagination() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-end justify-center py-[12px] relative shrink-0" data-name="cc-pagination">
      <SafPaginationContent />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] h-full items-start relative shrink-0 w-[659px]">
      <IconQuestion />
      <CcPagination />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-h-px relative w-full">
      <Frame1 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[24px] items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">close</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[24px] items-start relative shrink-0 w-[342px]" data-name="Header">
      <Frame5 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Header />
    </div>
  );
}

function TextAreaField1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[4px] w-full" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[1.5] min-w-px relative text-[#666] text-[15px]">e.g. Review liability caps in SaaS contracts and flag anything outside our standard position.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
    </div>
  );
}

function IconDragCorner() {
  return (
    <div className="h-[0.001px] relative shrink-0 w-full" data-name="icon-drag-corner">
      <div className="flex flex-row items-end justify-end size-full">
        <div className="content-stretch flex items-end justify-end pb-[2px] pr-[2px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[7.071px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-45 flex-none">
              <div className="h-[2px] relative w-[8px]" data-name="vector">
                <div className="absolute inset-[-25%_-6.25%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 3">
                    <path d="M8.5 0.5L0.5 0.5M6.9 2.5H2.1" id="vector" stroke="var(--stroke-0, #212223)" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OuterFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full z-[2]" data-name="outer-frame">
      <TextAreaField1 />
      <IconDragCorner />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[134px] items-start relative shrink-0 w-full">
      <div className="flex-[1_0_0] min-h-px relative w-[702px]" data-name="Input Item">
        <div className="content-stretch flex items-start p-[2px] relative size-full">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="cc-text-area">
            <div className="content-stretch flex flex-col gap-[8px] isolate items-start pb-[28px] relative size-full">
              <OuterFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start max-h-[261px] min-h-px overflow-clip relative w-full" data-name="Input">
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[188px] items-start min-w-px relative">
      <Frame2 />
      <Input />
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white h-[208px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full z-[2]" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pb-[16px] pt-[20px] px-[24px] relative size-full">
          <Frame />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
    </div>
  );
}

function CcTextArea() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="cc-text-area">
      <TextAreaField />
    </div>
  );
}

function Divider() {
  return <div className="h-0 shrink-0 w-full" data-name="Divider" />;
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Skip</p>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Next</p>
      </div>
    </div>
  );
}

function RightSend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
      <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[8px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <Contents />
      </div>
      <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[24px] relative rounded-[8px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <Contents1 />
      </div>
    </div>
  );
}

function DrawerButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px relative" data-name="Drawer buttons">
      <RightSend />
    </div>
  );
}

function PromptDrawer() {
  return (
    <div className="bg-white relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Prompt Drawer">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[24px] px-[24px] relative size-full">
          <DrawerButtons />
        </div>
      </div>
    </div>
  );
}

function CoCoPromptMfe() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
      <CcTextArea />
      <Divider />
      <PromptDrawer />
    </div>
  );
}

export default function RestlyedChatInput() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)] size-full" data-name="Restlyed-Chat input">
      <CoCoPromptMfe />
    </div>
  );
}