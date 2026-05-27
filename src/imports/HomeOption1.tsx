import svgPaths from "./svg-acefd7efw8";
import imgImage4 from "figma:asset/e7ff52565c2056aff4a934dc88bbe0a40010c0de.png";

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

function Frame2() {
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
          <Frame2 />
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

function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['Clario:Medium',sans-serif] gap-[2.087px] items-start justify-center leading-[0] not-italic relative shrink-0 text-[15.652px] whitespace-nowrap">
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
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4.174px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function ActionAdd1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="action/add*">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#fcfcfc] text-[16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap">plus</p>
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
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">New workspace</p>
      </div>
    </div>
  );
}

function CcButton() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[400px] shrink-0 w-full" data-name="cc-button">
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[401px]" />
      <Contents4 />
    </div>
  );
}

function ActionAdd2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="action/add*">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function LeftIcon9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <ActionAdd2 />
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon9 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">New tabular analysis</p>
      </div>
    </div>
  );
}

function CcButton1() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[400px] shrink-0 w-full" data-name="cc-button">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-[-1px] pointer-events-none rounded-[401px]" />
      <Contents5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <CcButton />
      <CcButton1 />
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
    <div className="bg-[rgba(255,255,255,0.01)] h-[33px] relative shrink-0 w-full" data-name="saf-disclosure">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.01)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative size-full">
        <ExpandCollapse />
        <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px]">
          <p className="leading-[1.2] whitespace-pre-wrap">Recent workspaces</p>
        </div>
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
          <p className="leading-[1.2] overflow-hidden">Hernandez v. Pacific Builders Inc</p>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
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
        <Frame13 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">In re: Blue Ridge Trust 2025</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
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
        <Frame14 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">State v. Marcus T. Reynolds</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame15 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Rivera Compliance Review</p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
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
          <p className="leading-[1.2] overflow-hidden">Doe v. Apex Corp.</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] left-[8px] not-italic size-[16px] text-[#fff9f4] text-[14px] text-center top-[8px]">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <Frame17 />
        <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden">Matter of Green Estates</p>
        </div>
      </div>
    </div>
  );
}

function ItemList() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item list">
      <div className="content-stretch flex flex-col items-start pl-[4px] relative w-full">
        <Item />
        <Item1 />
        <Item2 />
        <Item3 />
        <Item4 />
        <Item5 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <SafDisclosure />
      <ItemList />
    </div>
  );
}

function ArrowCaretRight() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/caret-right">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[12px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ExpandCollapse1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="expand/collapse">
      <ArrowCaretRight />
    </div>
  );
}

function SafDisclosure1() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] relative shrink-0 w-full" data-name="saf-disclosure">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.01)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start p-[8px] relative w-full">
        <ExpandCollapse1 />
        <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px]">
          <p className="leading-[1.2] whitespace-pre-wrap">Recent activity</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame18 />
      <SafDisclosure1 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#fcfcfc] relative self-stretch shrink-0 w-[263px]" data-name="Sidebar">
      <div className="content-stretch flex flex-col gap-[16px] items-center overflow-clip px-[19px] py-[16px] relative rounded-[inherit] size-full">
        <Frame />
        <Frame11 />
        <Frame12 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-center">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] h-[42px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[28px] w-[712px]">
        <p className="leading-[1.2] whitespace-pre-wrap">{`Let’s take some work off your plate `}</p>
      </div>
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[16px] w-[712px] whitespace-pre-wrap">{`CoCounsel can handle multiple tasks in a single request—just tell it everything you need. `}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Draft an [x] document...</p>
      </div>
    </div>
  );
}

function Suggestion() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame8 />
      <Frame3 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Ask a research question...</p>
      </div>
    </div>
  );
}

function Suggestion1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame19 />
      <Frame5 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Analyze [y] documents...</p>
      </div>
    </div>
  );
}

function Suggestion2() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <Suggestion />
      <Suggestion1 />
      <Suggestion2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function ChatWelcome() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center justify-center max-w-[800px] min-h-px min-w-px pt-[96px] relative w-full" data-name="Chat welcome">
      <Frame9 />
      <Frame7 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#666] text-[14px] text-center underline w-[min-content] whitespace-pre-wrap">Browse all prompts</p>
    </div>
  );
}

function TextAreaField() {
  return (
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
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="saf-text-area">
      <OuterFrame />
    </div>
  );
}

function CocoTextField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
      <SafTextArea />
    </div>
  );
}

function Divider() {
  return <div className="h-0 shrink-0 w-full" data-name="Divider" />;
}

function IconographySafIcon4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
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

function SafButtonIcon() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon />
    </div>
  );
}

function AttachButton() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon />
    </div>
  );
}

function IconographySafIcon5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
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

function SafButtonIcon1() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon1 />
    </div>
  );
}

function AttachButton1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon1 />
    </div>
  );
}

function IconographySafIcon6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
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

function SafButtonIcon2() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon2 />
    </div>
  );
}

function AttachButton2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon2 />
    </div>
  );
}

function LeftActions1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
      <AttachButton />
      <AttachButton1 />
      <AttachButton2 />
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
      <LeftActions1 />
    </div>
  );
}

function IconographySafIcon7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
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

function SafButtonIcon3() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon3 />
    </div>
  );
}

function AttachButton3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon3 />
    </div>
  );
}

function ArrowArrowUp() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/arrow-up">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16px] text-center text-white w-full">
        <p className="whitespace-pre-wrap">
          <span className="leading-[normal] text-white">arrow-u</span>
          <span className="leading-[normal]">p</span>
        </p>
      </div>
    </div>
  );
}

function SafButtonIcon4() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex items-center justify-center p-[8px] relative rounded-[100px] shrink-0 size-[28px]" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <ArrowArrowUp />
    </div>
  );
}

function BttnSendPrompt() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 size-[28px]" data-name="bttn: send prompt">
      <SafButtonIcon4 />
    </div>
  );
}

function RightSend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
      <AttachButton3 />
      <BttnSendPrompt />
    </div>
  );
}

function DrawerButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center justify-between min-h-px min-w-px relative" data-name="Drawer buttons">
      <LeftActions />
      <RightSend />
    </div>
  );
}

function PromptDrawer() {
  return (
    <div className="bg-white h-[39px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Prompt Drawer">
      <div aria-hidden="true" className="absolute border-[#d2d2d2] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
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
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_8px_16px_0px_rgba(0,0,0,0.05)] shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
      <CocoTextField />
      <Divider />
      <PromptDrawer />
    </div>
  );
}

function ChatPromptDesktopFa() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[800px] relative shrink-0 w-[800px]" data-name="Chat prompt - Desktop FA">
      <CoCoPromptMfe />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-center py-[24px] relative shrink-0 w-full">
      <ChatPromptDesktopFa />
    </div>
  );
}

function ChatContainer() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col h-[800px] items-center relative shrink-0 w-[1076px]" data-name="Chat container">
      <ChatWelcome />
      <Frame22 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-center">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] h-[42px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[28px] w-[712px]">
        <p className="leading-[1.2] whitespace-pre-wrap">{`Let me take something off your plate `}</p>
      </div>
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[16px] w-[712px] whitespace-pre-wrap">{`CoCounsel can handle multiple tasks in a single request—just tell it everything you need. `}</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <div className="h-[65px] mix-blend-multiply relative shrink-0 w-[60px]" data-name="image 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[1023.08%] left-[-933.33%] max-w-none top-[-169.23%] w-[1565%]" src={imgImage4} />
        </div>
      </div>
      <Frame24 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Draft an [x] document...</p>
      </div>
    </div>
  );
}

function Suggestion3() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Ask a research question...</p>
      </div>
    </div>
  );
}

function Suggestion4() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Analyze [y] documents...</p>
      </div>
    </div>
  );
}

function Suggestion5() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <Suggestion3 />
      <Suggestion4 />
      <Suggestion5 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame26 />
    </div>
  );
}

function ChatWelcome1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-center justify-center max-w-[800px] min-h-px min-w-px pt-[96px] relative w-full" data-name="Chat welcome">
      <Frame23 />
      <Frame25 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#666] text-[14px] text-center underline w-[min-content] whitespace-pre-wrap">Browse all prompts</p>
    </div>
  );
}

function TextAreaField1() {
  return (
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
  );
}

function OuterFrame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="outer-frame">
      <TextAreaField1 />
    </div>
  );
}

function SafTextArea1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="saf-text-area">
      <OuterFrame1 />
    </div>
  );
}

function CocoTextField1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
      <SafTextArea1 />
    </div>
  );
}

function Divider1() {
  return <div className="h-0 shrink-0 w-full" data-name="Divider" />;
}

function IconographySafIcon8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon8 />
    </div>
  );
}

function SafButtonIcon5() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon4 />
    </div>
  );
}

function AttachButton4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon5 />
    </div>
  );
}

function IconographySafIcon9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#212223] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon9 />
    </div>
  );
}

function SafButtonIcon6() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon5 />
    </div>
  );
}

function AttachButton5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon6 />
    </div>
  );
}

function IconographySafIcon10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap">@</p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon10 />
    </div>
  );
}

function SafButtonIcon7() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon6 />
    </div>
  );
}

function AttachButton6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon7 />
    </div>
  );
}

function LeftActions3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
      <AttachButton4 />
      <AttachButton5 />
      <AttachButton6 />
    </div>
  );
}

function LeftActions2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Left Actions">
      <LeftActions3 />
    </div>
  );
}

function IconographySafIcon11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function ChatAttachmentSafIcon7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="chat-attachment/saf-icon">
      <IconographySafIcon11 />
    </div>
  );
}

function SafButtonIcon8() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex h-[32px] items-center justify-center min-h-[32px] p-[8px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <ChatAttachmentSafIcon7 />
    </div>
  );
}

function AttachButton7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Attach button">
      <SafButtonIcon8 />
    </div>
  );
}

function ArrowArrowUp1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/arrow-up">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16px] text-center text-white w-full">
        <p className="whitespace-pre-wrap">
          <span className="leading-[normal] text-white">arrow-u</span>
          <span className="leading-[normal]">p</span>
        </p>
      </div>
    </div>
  );
}

function SafButtonIcon9() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex items-center justify-center p-[8px] relative rounded-[100px] shrink-0 size-[28px]" data-name="saf-button-icon">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      <ArrowArrowUp1 />
    </div>
  );
}

function BttnSendPrompt1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 size-[28px]" data-name="bttn: send prompt">
      <SafButtonIcon9 />
    </div>
  );
}

function RightSend1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Send">
      <AttachButton7 />
      <BttnSendPrompt1 />
    </div>
  );
}

function DrawerButtons1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-center justify-between min-h-px min-w-px relative" data-name="Drawer buttons">
      <LeftActions2 />
      <RightSend1 />
    </div>
  );
}

function PromptDrawer1() {
  return (
    <div className="bg-white h-[39px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full" data-name="Prompt Drawer">
      <div aria-hidden="true" className="absolute border-[#d2d2d2] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4px] px-[8px] relative size-full">
          <DrawerButtons1 />
        </div>
      </div>
    </div>
  );
}

function CoCoPromptMfe1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_8px_16px_0px_rgba(0,0,0,0.05)] shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
      <CocoTextField1 />
      <Divider1 />
      <PromptDrawer1 />
    </div>
  );
}

function ChatPromptDesktopFa1() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[800px] relative shrink-0 w-[800px]" data-name="Chat prompt - Desktop FA">
      <CoCoPromptMfe1 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col items-center py-[24px] relative shrink-0 w-full">
      <ChatPromptDesktopFa1 />
    </div>
  );
}

function ChatContainer1() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col h-[800px] items-center relative shrink-0 w-[1076px]" data-name="Chat container">
      <ChatWelcome1 />
      <Frame33 />
    </div>
  );
}

function ActionCheckmarkCircle() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[14.4px]" data-name="action/checkmark-circle*">
      <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[14.4px] text-center text-white w-full">
        <p className="leading-[normal] whitespace-pre-wrap">circle-check</p>
      </div>
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex items-start justify-end pr-[1.8px] py-[1.8px] relative rounded-[79.2px] shrink-0 w-[36px]" data-name="toggle-switch">
      <div aria-hidden="true" className="absolute border-[#1d4b34] border-[0.9px] border-solid inset-[-0.9px] pointer-events-none rounded-[80.10000000000001px]" />
      <ActionCheckmarkCircle />
    </div>
  );
}

function SafToggleSwitch() {
  return (
    <div className="relative shrink-0 w-full" data-name="saf-toggle-switch">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[0px] whitespace-nowrap">
            <p>
              <span className="font-['Font_Awesome_6_Sharp:Solid',sans-serif] leading-[1.2] not-italic text-[#de6633] text-[16px]"></span>
              <span className="font-['Font_Awesome_6_Sharp:Solid',sans-serif] leading-[1.2] not-italic text-[16px]">{` `}</span>
              <span className="leading-[1.2] text-[15px]">CoCounsel Beta</span>
            </p>
          </div>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}

function BetaToggle() {
  return (
    <div className="absolute bg-white left-[1177px] rounded-bl-[16px] rounded-br-[16px] top-0" data-name="Beta toggle">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[4px] py-[8px] relative rounded-[inherit]">
        <SafToggleSwitch />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-l border-r border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]" />
    </div>
  );
}

export default function HomeOption() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Home option 1">
      <SideNav />
      <Sidebar />
      <ChatContainer />
      <ChatContainer1 />
      <div className="relative shrink-0 size-[64px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
          <circle cx="32" cy="32" fill="var(--fill-0, #D9D9D9)" id="Ellipse 13" r="32" />
        </svg>
      </div>
      <BetaToggle />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] left-[861px] not-italic text-[#de6633] text-[40px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] top-[204px] whitespace-nowrap">
        <p className="leading-[normal]">*</p>
      </div>
    </div>
  );
}