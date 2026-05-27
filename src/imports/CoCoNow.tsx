function Frame2() {
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
          <Frame2 />
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

function Frame9() {
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
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
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
        <p className="leading-[1.2]">Library</p>
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
          <p className="leading-[normal] whitespace-pre-wrap">database</p>
        </div>
      </div>
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon5 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Databases</p>
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

function Frame10() {
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

function Frame3() {
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
      <Frame3 />
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
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">circle-user</p>
        </div>
      </div>
    </div>
  );
}

function Contents7() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="contents">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative size-full">
          <LeftIcon6 />
          <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[0px]">
            <p className="whitespace-pre-wrap">
              <span className="leading-[1.2] text-[15px]">{`Jane Lawson `}</span>
              <span className="font-['Clario:Regular',sans-serif] leading-[1.2] not-italic text-[14px]">(US)</span>
            </p>
          </div>
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
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="saf-side-nav-button">
      <SafButton5 />
    </div>
  );
}

function Frame11() {
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
          <Frame9 />
          <Frame10 />
          <div className="h-px overflow-clip relative shrink-0 w-full" data-name="saf-divider">
            <div className="absolute bg-[#e5e5e5] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
          <RecentChats />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function RefreshGlobalSideNav() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-start pb-[2px] relative self-stretch shrink-0 w-[232px]" data-name="refresh-global-side-nav">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <BrandHeader />
      <SideNavMenu />
    </div>
  );
}

function Request() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px relative" data-name="Request">
      <p className="bg-clip-text bg-gradient-to-r font-['Clario:Medium',sans-serif] from-[#345343] leading-[1.1] not-italic relative shrink-0 text-[40px] to-[#236c48] to-[84.619%]" style={{ WebkitTextFillColor: "transparent" }}>
        Hello, Jane
      </p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center justify-center shrink-0 sticky top-0 w-full" data-name="Header">
      <Request />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8px] relative shrink-0 w-full">
      <Header />
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative w-full">
          <div className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px relative text-[#666] text-[16px] whitespace-pre-wrap">
            <p className="mb-0">
              Ask CoCounsel to perform any legal task...
              <br aria-hidden="true" />
              <br aria-hidden="true" />
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#919191] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
    </div>
  );
}

function OuterFrame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="outer-frame">
      <TextAreaField />
    </div>
  );
}

function CocoTextField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
      <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="saf-text-area">
        <OuterFrame />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-0 shrink-0 w-full" data-name="Divider" />;
}

function LeftIcon7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon7 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Attach</p>
      </div>
    </div>
  );
}

function LeftIcon8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
          <p className="leading-[normal] whitespace-pre-wrap"></p>
        </div>
      </div>
    </div>
  );
}

function Contents9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon8 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Library</p>
      </div>
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents8 />
      </div>
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents9 />
      </div>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="right-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">chevron-down</p>
        </div>
      </div>
    </div>
  );
}

function Contents10() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">CoCounsel 2.0</p>
      </div>
      <RightIcon />
    </div>
  );
}

function RightSend1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
      <div className="content-stretch flex items-start relative shrink-0" data-name="bttn: send prompt">
        <div className="bg-[#314b3e] content-stretch flex items-center justify-center p-[6px] relative rounded-[100px] shrink-0" data-name="saf-button-icon">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
          <div className="shrink-0 size-0" data-name="missing" />
        </div>
      </div>
    </div>
  );
}

function RightSend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents10 />
      </div>
      <RightSend1 />
    </div>
  );
}

function DrawerButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-start justify-between min-h-px min-w-px relative" data-name="Drawer buttons">
      <LeftActions />
      <RightSend />
    </div>
  );
}

function PromptDrawer() {
  return (
    <div className="bg-white h-[39px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Prompt Drawer">
      <div aria-hidden="true" className="absolute border-[#919191] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4px] px-[8px] relative size-full">
          <DrawerButtons />
        </div>
      </div>
    </div>
  );
}

function CoCoPromptMfe() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] shrink-0 w-full" data-name="CoCo-Prompt MFE">
      <CocoTextField />
      <Divider />
      <PromptDrawer />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[8px] relative shrink-0">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[12px] text-right whitespace-nowrap">
        <p className="leading-[1.35]">CoCounsel 2.0 uses Generative AI.</p>
      </div>
    </div>
  );
}

function ChatPromptDesktopFa() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[750px]" data-name="Chat prompt - Desktop FA">
      <CoCoPromptMfe />
      <Frame6 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[1.35]">New</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[0px]">
        <p className="text-[14px] whitespace-pre-wrap">
          <span className="font-['Clario:Medium',sans-serif] leading-[1.2] text-[#212223]">{`Try CoCounsel Beta: `}</span>
          <span className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2]">Our all-new assistant completes multiple tasks in a single request and understands context from projects files.</span>
        </p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
      <div className="bg-[#de6633] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] overflow-clip px-[8px] py-[2px] relative rounded-[100px] shrink-0" data-name="saf-badge-status">
        <Label />
      </div>
      <Frame1 />
    </div>
  );
}

function Card() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[12px] relative w-full">
          <Frame5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-[510px]">
      <Card />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame4 />
      <ChatPromptDesktopFa />
      <Frame7 />
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div className="bg-white content-stretch flex items-start pl-[1.8px] py-[1.8px] relative rounded-[79.2px] shrink-0 w-[36px]" data-name="toggle-switch">
      <div aria-hidden="true" className="absolute border-[#8a8a8a] border-[0.9px] border-solid inset-[-0.9px] pointer-events-none rounded-[80.10000000000001px]" />
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[14.4px]" data-name="action/close-circle*">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] h-[14.4px] justify-center leading-[0] not-italic relative shrink-0 text-[#8a8a8a] text-[14.4px] text-center w-full">
          <p className="leading-[normal] whitespace-pre-wrap">circle-xmark</p>
        </div>
      </div>
    </div>
  );
}

function SafToggleSwitch() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[961px] px-[8px] py-[4px] top-[10px] w-[217px]" data-name="saf-toggle-switch">
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[0px] whitespace-nowrap">
        <p>
          <span className="font-['Font_Awesome_6_Sharp:Solid',sans-serif] leading-[1.2] not-italic text-[#de6633] text-[16px]"></span>
          <span className="font-['Font_Awesome_6_Sharp:Solid',sans-serif] leading-[1.2] not-italic text-[16px]">{` `}</span>
          <span className="leading-[1.2] text-[15px]">Try CoCounsel Beta</span>
        </p>
      </div>
      <ToggleSwitch />
    </div>
  );
}

function ChatThread() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[810px] items-center pt-[192px] relative shrink-0 w-full" data-name="Chat thread">
      <div className="absolute bg-white h-[47px] left-[953px] rounded-bl-[16px] rounded-br-[16px] top-px w-[231px]">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-l border-r border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px] shadow-[0px_4px_12px_0px_rgba(165,70,29,0.12)]" />
      </div>
      <Frame8 />
      <SafToggleSwitch />
    </div>
  );
}

function Body() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative self-stretch shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]" data-name="Body">
      <ChatThread />
    </div>
  );
}

function CocoCore() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="coco-core">
      <RefreshGlobalSideNav />
      <Body />
    </div>
  );
}

function Home() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start min-w-[640px] overflow-clip relative shrink-0 w-[1440px]" data-name="Home">
      <CocoCore />
    </div>
  );
}

export default function CoCoNow() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="CoCo Now">
      <Home />
    </div>
  );
}