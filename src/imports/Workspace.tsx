import svgPaths from "./svg-u350mfpstn";

function Logo1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative w-full" data-name="logo">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g id="Vector">
            <path d={svgPaths.p144c8580} fill="#D64000" />
            <path d={svgPaths.p107c5a00} fill="#D64000" />
            <path d={svgPaths.p3904da00} fill="#D64000" />
            <path d={svgPaths.pf43baa0} fill="#D64000" />
            <path d={svgPaths.p32483500} fill="#D64000" />
            <path d={svgPaths.p24a59340} fill="#D64000" />
            <path d={svgPaths.p3e2a8500} fill="#D64000" />
            <path d={svgPaths.p26c1c80} fill="#D64000" />
            <path d={svgPaths.p95d5600} fill="#D64000" />
            <path d={svgPaths.p2247e100} fill="#D64000" />
            <path d={svgPaths.p3daf0500} fill="#D64000" />
            <path d={svgPaths.p3ab6ce00} fill="#D64000" />
            <path d={svgPaths.p33daa00} fill="#D64000" />
            <path d={svgPaths.p1bd85f00} fill="#D64000" />
            <path d={svgPaths.p2ccff880} fill="#D64000" />
            <path d={svgPaths.p2809600} fill="#D64000" />
            <path d={svgPaths.p1c0ac780} fill="#D64000" />
            <path d={svgPaths.p2c0711c0} fill="#D64000" />
            <path d={svgPaths.p81e1900} fill="#D64000" />
            <path d={svgPaths.p2a08f280} fill="#D64000" />
            <path d={svgPaths.p13694300} fill="#D64000" />
            <path d={svgPaths.p2ea7a080} fill="#D64000" />
            <path d={svgPaths.p940f80} fill="#D64000" />
            <path d={svgPaths.p3c38c720} fill="#D64000" />
            <path d={svgPaths.p3c883200} fill="#D64000" />
            <path d={svgPaths.p7acd500} fill="#D64000" />
            <path d={svgPaths.p3ac91500} fill="#D64000" />
            <path d={svgPaths.pcfff500} fill="#D64000" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SafLogo() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="saf-logo">
      <Logo1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[28px] z-[1]" data-name="logo">
      <SafLogo />
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="brand-header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between pb-[8px] pt-[14px] px-[12px] relative w-full">
          <Logo />
        </div>
      </div>
    </div>
  );
}

function IconographySafIcon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <IconographySafIcon />
    </div>
  );
}

function MessageLinesSafIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="message-lines/saf-icon">
      <LeftIcon1 />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <MessageLinesSafIcon />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[1.35]">Home</p>
      </div>
    </div>
  );
}

function Coco3Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start min-h-[32px] px-[4px] relative rounded-[4px] shrink-0" data-name="coco3-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents />
    </div>
  );
}

function IconographySafIcon1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <IconographySafIcon1 />
    </div>
  );
}

function MessageLinesSafIcon1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="message-lines/saf-icon">
      <LeftIcon3 />
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <MessageLinesSafIcon1 />
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon2 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[1.35]">Spaces</p>
      </div>
    </div>
  );
}

function Coco3Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start min-h-[32px] px-[4px] relative rounded-[4px] shrink-0" data-name="coco3-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents1 />
    </div>
  );
}

function IconographySafIcon2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <IconographySafIcon2 />
    </div>
  );
}

function MessageLinesSafIcon2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="message-lines/saf-icon">
      <LeftIcon5 />
    </div>
  );
}

function LeftIcon4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <MessageLinesSafIcon2 />
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon4 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[1.35]">Library</p>
      </div>
    </div>
  );
}

function Coco3Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start min-h-[32px] px-[4px] relative rounded-[4px] shrink-0" data-name="coco3-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents2 />
    </div>
  );
}

function IconographySafIcon3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <IconographySafIcon3 />
    </div>
  );
}

function MessageLinesSafIcon3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="message-lines/saf-icon">
      <LeftIcon7 />
    </div>
  );
}

function LeftIcon6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <MessageLinesSafIcon3 />
    </div>
  );
}

function Contents3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon6 />
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[1.35]">History</p>
      </div>
    </div>
  );
}

function Coco3Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start min-h-[32px] px-[4px] relative rounded-[4px] shrink-0" data-name="coco3-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-h-px min-w-px relative w-full">
      <Coco3Button />
      <Coco3Button1 />
      <Coco3Button2 />
      <Coco3Button3 />
    </div>
  );
}

function Usa1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="USA">
      <div className="absolute h-[13.5px] left-0 top-0 w-[18px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13.5">
          <g id="Vector">
            <path d={svgPaths.p22f42c80} fill="#B41F30" />
            <path d="M18 1.5H7.5V3H18V1.5Z" fill="white" />
            <path d="M18 4.5H7.5V6H18V4.5Z" fill="white" />
            <path d="M0 7.5V9H18V7.5H7.5H0Z" fill="white" />
            <path d="M18 10.5H0V12H18V10.5Z" fill="white" />
            <path d={svgPaths.p3a983100} fill="#00256A" />
            <path d={svgPaths.p35b0de00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pbd0800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1277ec00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3b0118c0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p9b77f40} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Usa() {
  return (
    <div className="overflow-clip relative rounded-[1.8px] shrink-0 size-[16px]" data-name="USA">
      <Usa1 />
    </div>
  );
}

function CcButtonIcon() {
  return (
    <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="cc-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative w-full">
          <Usa />
        </div>
      </div>
    </div>
  );
}

function BottomOfSideNav() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="bottom-of-side-nav">
      <CcButtonIcon />
    </div>
  );
}

function ActionAdd() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="action/add*">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap">circle-user</p>
      </div>
    </div>
  );
}

function CcButtonIcon1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="cc-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative w-full">
          <ActionAdd />
        </div>
      </div>
    </div>
  );
}

function BottomOfSideNav1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="bottom-of-side-nav">
      <CcButtonIcon1 />
    </div>
  );
}

function SideNavMenu() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="side-nav-menu">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative size-full">
          <Frame />
          <BottomOfSideNav />
          <BottomOfSideNav1 />
        </div>
      </div>
    </div>
  );
}

function SideNav() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col h-[800px] items-start justify-center relative shrink-0 w-[60px]" data-name="side-nav">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-r border-solid inset-0 pointer-events-none" />
      <BrandHeader />
      <SideNavMenu />
    </div>
  );
}

function SafAnchorBlack() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="saf-anchor-black">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[0px] whitespace-nowrap">
        <p>
          <span className="font-['Font_Awesome_6_Sharp:Light',sans-serif] leading-[1.35] not-italic text-[12px]"></span>
          <span className="font-['Font_Awesome_6_Sharp:Light',sans-serif] leading-[1.35] not-italic text-[14px]">{` `}</span>
          <span className="leading-[1.35] text-[13px]">{` Back`}</span>
        </p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <SafAnchorBlack />
    </div>
  );
}

function SafBreadcrumbItems() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="saf-breadcrumb-items">
      <Label />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <SafBreadcrumbItems />
      <Frame21 />
    </div>
  );
}

function CcTab() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="cc-tab">
      <div aria-hidden="true" className="absolute border-[#1d4b34] border-b-3 border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#212223] text-[14px] text-center">Files</p>
    </div>
  );
}

function FirstSlot() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="first slot">
      <CcTab />
    </div>
  );
}

function CcTab1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="cc-tab">
      <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#666] text-[14px] text-center">Chats</p>
    </div>
  );
}

function CcTab2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="cc-tab">
      <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#666] text-[14px] text-center">Details</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="tabs">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <FirstSlot />
      <CcTab1 />
      <CcTab2 />
    </div>
  );
}

function CcTabs() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="cc-tabs">
      <Tabs />
    </div>
  );
}

function ArrowCaretDown() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/caret-down">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[12px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ExpandCollapse() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="expand/collapse">
      <ArrowCaretDown />
    </div>
  );
}

function SafDisclosure() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex gap-[8px] h-[33px] items-start p-[8px] relative shrink-0 w-[215px]" data-name="saf-disclosure">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.01)] border-b border-solid inset-0 pointer-events-none" />
      <ExpandCollapse />
      <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px]">
        <p className="leading-[1.2] whitespace-pre-wrap">Inputs</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame10 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Briefs</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame11 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Depositions</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame12 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Discovery</p>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#054688] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame13 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Complaint.docx</p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#054688] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame16 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Federal Court Rules.docx</p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#054688] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame18 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Strategy.docx</p>
        </div>
      </div>
    </div>
  );
}

function ItemList() {
  return (
    <div className="content-stretch flex flex-col items-start px-[4px] relative shrink-0 w-[215px]" data-name="Item list">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <SafDisclosure />
      <ItemList />
    </div>
  );
}

function ArrowCaretDown1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/caret-down">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[12px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ExpandCollapse1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="expand/collapse">
      <ArrowCaretDown1 />
    </div>
  );
}

function SafDisclosure1() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex gap-[8px] h-[33px] items-start p-[8px] relative shrink-0 w-[215px]" data-name="saf-disclosure">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.01)] border-b border-solid inset-0 pointer-events-none" />
      <ExpandCollapse1 />
      <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px]">
        <p className="leading-[1.2] whitespace-pre-wrap">Outputs</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#404040] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame20 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Discovery overview</p>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#404040] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame22 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Motion to Dimiss Draft</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#404040] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame23 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">New York Freedom of Speech</p>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#404040] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame24 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Memo for New York Freedom of Speeach</p>
        </div>
      </div>
    </div>
  );
}

function ItemList1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[4px] relative shrink-0 w-[215px]" data-name="Item list">
      <Item6 />
      <Item7 />
      <Item8 />
      <Item9 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <SafDisclosure1 />
      <ItemList1 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame17 />
      <Frame19 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative w-full">
      <Frame15 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[20px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">State v. Marcus T. Reynolds</p>
      </div>
      <CcTabs />
      <Frame14 />
    </div>
  );
}

function ActionAdd1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="action/add*">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <ActionAdd1 />
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon8 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">New tabular analysis</p>
      </div>
    </div>
  );
}

function CcButton() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[400px] shrink-0 w-full" data-name="cc-button">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-[-1px] pointer-events-none rounded-[401px]" />
      <Contents4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[12px] relative self-stretch shrink-0 w-[263px]">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-r border-solid inset-0 pointer-events-none" />
      <Frame2 />
      <CcButton />
    </div>
  );
}

function SafButtonIcon() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-center justify-center p-[12px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap">+</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex items-start relative shrink-0 z-[3]" data-name="container">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <SafButtonIcon />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative self-stretch shrink-0" data-name="tabs">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-l border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1f1f1f] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">New chat</p>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center right-0 top-0 w-0">
        <div className="flex-none h-px rotate-90 w-[40px]">
          <div className="relative size-full" data-name="divider last">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1">
                <line id="divider last" stroke="var(--stroke-0, #E6E6E6)" x2="40" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafButtonIcon1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-center justify-center p-[12px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Tabset() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative z-[2]" data-name="tabset">
      <Tabs1 />
      <SafButtonIcon1 />
    </div>
  );
}

function MiscellaneousDotsHoriz() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="miscellaneous/dots-horiz">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="miscellaneous/dots-horiz">
          <path d={svgPaths.p14dade00} fill="var(--fill-0, #404040)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function SafButtonIcon2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-center justify-center p-[12px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-l border-solid inset-[0_0_0_-1px] pointer-events-none rounded-[4px]" />
      <MiscellaneousDotsHoriz />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="container">
      <div aria-hidden="true" className="absolute border-[#e6e6e6] border-l border-solid inset-0 pointer-events-none" />
      <SafButtonIcon2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 z-[1]" data-name="container">
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex isolate items-start relative shrink-0 w-full" data-name="container">
      <Container1 />
      <Tabset />
      <Container2 />
    </div>
  );
}

function PromptNavigation() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="prompt navigation">
      <Container />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8.092px] items-start relative shrink-0 text-center">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] h-[42.481px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[28.32px] w-[720.146px]">
        <p className="leading-[1.2] whitespace-pre-wrap">Let's take some work off your plate</p>
      </div>
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[16.183px] w-[720.146px] whitespace-pre-wrap">{`{CoCounsel has access to your workspace files}`}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24.275px] items-center relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8.092px] shrink-0 size-[32.366px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16.183px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14.16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14.16px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Draft a legal document...</p>
      </div>
    </div>
  );
}

function Suggestion() {
  return (
    <div className="bg-white content-stretch flex gap-[8.092px] items-center p-[10.114px] relative rounded-[12.137px] shrink-0 w-[228.586px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1.011px] border-solid inset-0 pointer-events-none rounded-[12.137px]" />
      <Frame8 />
      <Frame3 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8.092px] shrink-0 size-[32.366px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16.183px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14.16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14.16px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Ask a research question...</p>
      </div>
    </div>
  );
}

function Suggestion1() {
  return (
    <div className="bg-white content-stretch flex gap-[8.092px] items-center p-[10.114px] relative rounded-[12.137px] shrink-0 w-[228.586px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1.011px] border-solid inset-0 pointer-events-none rounded-[12.137px]" />
      <Frame26 />
      <Frame5 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8.092px] shrink-0 size-[32.366px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16.183px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14.16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14.16px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Analyze document sets...</p>
      </div>
    </div>
  );
}

function Suggestion2() {
  return (
    <div className="bg-white content-stretch flex gap-[8.092px] items-center p-[10.114px] relative rounded-[12.137px] shrink-0 w-[228.586px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-[1.011px] border-solid inset-0 pointer-events-none rounded-[12.137px]" />
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12.137px] items-center justify-center relative shrink-0 w-full">
      <Suggestion />
      <Suggestion1 />
      <Suggestion2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12.137px] items-center relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function ChatWelcome() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40.458px] items-center justify-center max-w-[809.1524047851562px] min-h-px min-w-px pt-[97.098px] relative w-full" data-name="Chat welcome">
      <Frame9 />
      <Frame7 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#666] text-[14.16px] text-center underline w-[min-content] whitespace-pre-wrap">Browse all prompts</p>
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white relative rounded-tl-[16.183px] rounded-tr-[16.183px] shrink-0 w-full" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14.16px] py-[12.137px] relative w-full">
          <div className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px relative text-[#666] text-[15.172px] whitespace-pre-wrap">
            <p className="mb-0">Ask CoCounsel to perform a legal task...</p>
            <p className="mb-0">&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d2d2d2] border-l-[1.011px] border-r-[1.011px] border-solid border-t-[1.011px] inset-[-1.011px_-1.011px_0_-1.011px] pointer-events-none rounded-tl-[17.194px] rounded-tr-[17.194px]" />
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

function SafTextArea() {
  return (
    <div className="content-stretch flex flex-col gap-[8.092px] isolate items-start relative shrink-0 w-full" data-name="saf-text-area">
      <OuterFrame />
    </div>
  );
}

function CocoTextField() {
  return (
    <div className="content-stretch flex flex-col gap-[8.092px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
      <SafTextArea />
    </div>
  );
}

function Divider() {
  return <div className="h-0 shrink-0 w-full" data-name="Divider" />;
}

function IconographySafIcon4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16.183px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16.183px] text-[#404040] text-[14.16px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon4 />
    </div>
  );
}

function SafButtonIcon3() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32.366px] items-center justify-center min-h-[32.36609649658203px] p-[8.092px] relative rounded-[4.046px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[1.011px] border-[rgba(255,255,255,0.01)] border-solid inset-[-1.011px] pointer-events-none rounded-[5.057px]" />
      <ChatAttachmentSafIcon />
    </div>
  );
}

function AttachButton() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon3 />
    </div>
  );
}

function IconographySafIcon5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16.183px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16.183px] text-[#212223] text-[14.16px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon5 />
    </div>
  );
}

function SafButtonIcon4() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32.366px] items-center justify-center min-h-[32.36609649658203px] p-[8.092px] relative rounded-[4.046px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[1.011px] border-[rgba(255,255,255,0.01)] border-solid inset-[-1.011px] pointer-events-none rounded-[5.057px]" />
      <ChatAttachmentSafIcon1 />
    </div>
  );
}

function AttachButton1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon4 />
    </div>
  );
}

function IconographySafIcon6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16.183px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16.183px] text-[#404040] text-[14.16px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap">@</p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon6 />
    </div>
  );
}

function SafButtonIcon5() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32.366px] items-center justify-center min-h-[32.36609649658203px] p-[8.092px] relative rounded-[4.046px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[1.011px] border-[rgba(255,255,255,0.01)] border-solid inset-[-1.011px] pointer-events-none rounded-[5.057px]" />
      <ChatAttachmentSafIcon2 />
    </div>
  );
}

function AttachButton2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon5 />
    </div>
  );
}

function LeftActions1() {
  return (
    <div className="content-stretch flex gap-[6.069px] items-center relative shrink-0" data-name="Left Actions">
      <AttachButton />
      <AttachButton1 />
      <AttachButton2 />
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex gap-[6.069px] items-center relative shrink-0" data-name="Left Actions">
      <LeftActions1 />
    </div>
  );
}

function IconographySafIcon7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16.183px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16.183px] text-[#404040] text-[14.16px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon7 />
    </div>
  );
}

function SafButtonIcon6() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32.366px] items-center justify-center min-h-[32.36609649658203px] p-[8.092px] relative rounded-[4.046px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[1.011px] border-[rgba(255,255,255,0.01)] border-solid inset-[-1.011px] pointer-events-none rounded-[5.057px]" />
      <ChatAttachmentSafIcon3 />
    </div>
  );
}

function AttachButton3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon6 />
    </div>
  );
}

function ArrowArrowUp() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16.183px]" data-name="arrow/arrow-up">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16.183px] text-center text-white w-full">
        <p className="whitespace-pre-wrap">
          <span className="leading-[normal] text-white">arrow-u</span>
          <span className="leading-[normal]">p</span>
        </p>
      </div>
    </div>
  );
}

function SafButtonIcon7() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex items-center justify-center p-[8.092px] relative rounded-[101.144px] shrink-0 size-[28.32px]" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border-[1.011px] border-[rgba(255,255,255,0)] border-solid inset-[-1.011px] pointer-events-none rounded-[102.155px]" />
      <ArrowArrowUp />
    </div>
  );
}

function BttnSendPrompt() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 size-[28.32px]" data-name="bttn: send prompt">
      <SafButtonIcon7 />
    </div>
  );
}

function RightSend() {
  return (
    <div className="content-stretch flex gap-[8.092px] items-center relative shrink-0" data-name="Right Send">
      <AttachButton3 />
      <BttnSendPrompt />
    </div>
  );
}

function DrawerButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32.366px] items-center justify-between min-h-px min-w-px relative" data-name="Drawer buttons">
      <LeftActions />
      <RightSend />
    </div>
  );
}

function PromptDrawer() {
  return (
    <div className="bg-white h-[39.446px] relative rounded-bl-[16.183px] rounded-br-[16.183px] shrink-0 w-full" data-name="Prompt Drawer">
      <div aria-hidden="true" className="absolute border-[#d2d2d2] border-b-[1.011px] border-l-[1.011px] border-r-[1.011px] border-solid inset-[0_-1.011px_-1.011px_-1.011px] pointer-events-none rounded-bl-[17.194px] rounded-br-[17.194px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4.046px] px-[8.092px] relative size-full">
          <DrawerButtons />
        </div>
      </div>
    </div>
  );
}

function CoCoPromptMfe() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_8.092px_16.183px_0px_rgba(0,0,0,0.05)] shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
      <CocoTextField />
      <Divider />
      <PromptDrawer />
    </div>
  );
}

function ChatPromptDesktopFa() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[809.1524047851562px] relative shrink-0 w-[809.152px]" data-name="Chat prompt - Desktop FA">
      <CoCoPromptMfe />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-center py-[24.275px] relative shrink-0 w-full">
      <ChatPromptDesktopFa />
    </div>
  );
}

function ChatContainer() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col h-[756.152px] items-center relative shrink-0 w-full" data-name="Chat container">
      <ChatWelcome />
      <Frame29 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch">
      <PromptNavigation />
      <ChatContainer />
    </div>
  );
}

export default function Workspace() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Workspace">
      <SideNav />
      <Frame1 />
      <Frame25 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[881px] not-italic size-[16px] text-[32px] text-[rgba(248,234,221,0.8)] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] top-[222px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}