function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['Clario:Medium',sans-serif] gap-[2px] items-start justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap">
      <div className="flex flex-col justify-end relative shrink-0 text-[#212223]">
        <p className="leading-none">Thomson Reuters®</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[#d64000]">
        <p className="leading-none">CoCounsel</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="brand-header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Frame />
          <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0 z-[1]" data-name="saf-button-icon">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
              <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#666] text-[16px] text-center w-full">
                <p className="leading-[normal] whitespace-pre-wrap">arrow-left-from-line</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#f7f7f7] text-[14px] text-center">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">New chat</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full">
      <div className="bg-[#1d4b34] content-stretch flex h-[32px] items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="coco3-button">
        <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents />
      </div>
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon1 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Matters</p>
      </div>
    </div>
  );
}

function SafButton() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <Contents1 />
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">table</p>
        </div>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon2 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Tabular analysis</p>
      </div>
    </div>
  );
}

function SafButton1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <Contents2 />
    </div>
  );
}

function LeftIcon3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon3 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Knowledge search</p>
      </div>
    </div>
  );
}

function SafButton2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <Contents3 />
    </div>
  );
}

function LeftIcon4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">database</p>
        </div>
      </div>
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon4 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Databases</p>
      </div>
    </div>
  );
}

function SafButton3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <Contents4 />
    </div>
  );
}

function LeftIcon5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="right-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[12px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents5() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="contents">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative size-full">
          <LeftIcon5 />
          <div className="flex flex-[1_0_0] flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[15px]">
            <p className="leading-[1.2] whitespace-pre-wrap">More</p>
          </div>
          <RightIcon />
        </div>
      </div>
    </div>
  );
}

function SafButton4() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents5 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start py-[4px] relative shrink-0 w-full">
      <div className="bg-[rgba(252,252,252,0)] content-stretch flex items-start relative shrink-0 w-full" data-name="cc-side-nav-button">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none" />
        <SafButton />
      </div>
      <div className="bg-[rgba(252,252,252,0)] content-stretch flex items-start relative shrink-0 w-full" data-name="cc-side-nav-button">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none" />
        <SafButton1 />
      </div>
      <div className="bg-[rgba(252,252,252,0)] content-stretch flex items-start relative shrink-0 w-full" data-name="cc-side-nav-button">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none" />
        <SafButton2 />
      </div>
      <div className="bg-[rgba(252,252,252,0)] content-stretch flex items-start relative shrink-0 w-full" data-name="cc-side-nav-button">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none" />
        <SafButton3 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="saf-side-nav-button">
        <SafButton4 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black w-full">
          <p className="leading-[1.35] whitespace-pre-wrap">Recent chats</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.35] overflow-hidden">NDA uploaded for doc compliance validatio...</p>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative self-stretch text-[#212223] text-[14px]">
          <p className="leading-[1.35] whitespace-pre-wrap">Limited liability in Florida</p>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.35] overflow-hidden">Researching employee rights</p>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative self-stretch text-[#212223] text-[14px]">
          <p className="leading-[1.35] whitespace-pre-wrap">Limited liability in New York</p>
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name="content">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative self-stretch text-[#212223] text-[14px]">
          <p className="leading-[1.35] whitespace-pre-wrap">Researching human rights</p>
        </div>
      </div>
    </div>
  );
}

function Contents6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="decoration-solid leading-[1.35] underline">View all chats</p>
      </div>
    </div>
  );
}

function RecentChats() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="Recent chats">
      <Frame2 />
      <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full" data-name="coco-menu-item/Default">
        <Content />
      </div>
      <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full" data-name="coco-menu-item/Default">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full" data-name="coco-menu-item/Default">
        <Content2 />
      </div>
      <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full" data-name="coco-menu-item/Default">
        <Content3 />
      </div>
      <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full" data-name="coco-menu-item/Default">
        <Content4 />
      </div>
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[24px] pt-[8px] px-[5px] relative rounded-[4px] shrink-0" data-name="coco3-button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents6 />
      </div>
    </div>
  );
}

function LeftIcon6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="miscellaneous/history">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[20px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">circle-user</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center leading-[0] not-italic relative shrink-0 text-[#212223]">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[14px] w-[168px]">
        <p className="leading-[1.2] whitespace-pre-wrap">Jane Lawson</p>
      </div>
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center relative shrink-0 text-[11px] w-[168px]">
        <p className="leading-[1.2] whitespace-pre-wrap">United States</p>
      </div>
    </div>
  );
}

function Contents7() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="contents">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative size-full">
          <LeftIcon6 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function SafButton5() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]" data-name="saf-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents7 />
    </div>
  );
}

function SafSideNavButton() {
  return (
    <div className="content-stretch flex items-start py-[4px] relative shrink-0 w-full" data-name="saf-side-nav-button">
      <SafButton5 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="h-px overflow-clip relative shrink-0 w-[208px]" data-name="saf-divider">
        <div className="absolute bg-[#e5e5e5] h-px left-0 right-0 top-0" data-name="divider-vector" />
      </div>
      <SafSideNavButton />
    </div>
  );
}

function SideNavMenu() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="side-nav-menu">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start px-[12px] py-[8px] relative size-full">
          <Frame3 />
          <Frame4 />
          <div className="h-px overflow-clip relative shrink-0 w-full" data-name="saf-divider">
            <div className="absolute bg-[#e5e5e5] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
          <RecentChats />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

export default function RefreshGlobalSideNav() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-start pb-[2px] relative size-full" data-name="refresh-global-side-nav">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <BrandHeader />
      <SideNavMenu />
    </div>
  );
}