import svgPaths from "./svg-17l61snkpl";

function HeaderSubHeader() {
  return <div className="h-[28px] mb-[-28px] shrink-0 w-full" data-name="Header-sub-header" />;
}

function Group() {
  return (
    <div className="h-[112px] mb-[-28px] relative shrink-0 w-[260.2px]">
      <div className="absolute inset-[0_0_-0.45%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 260.247 112.5">
          <g id="Group 15">
            <path d={svgPaths.p3aec0000} fill="var(--fill-0, #FFF8E5)" id="Vector" stroke="var(--stroke-0, #AB3300)" />
            <path d={svgPaths.p3b0d2270} id="Vector_2" stroke="var(--stroke-0, #DE6633)" strokeLinejoin="round" strokeWidth="1.2" />
            <path d="M127.2 32V68" id="Vector_3" stroke="var(--stroke-0, #AB3300)" strokeLinecap="round" strokeWidth="3.5" />
            <path d={svgPaths.pa719d00} fill="var(--fill-0, #AB3300)" id="Vector_4" stroke="var(--stroke-0, #AB3300)" />
            <g id="Group">
              <path d={svgPaths.p30310e80} fill="var(--fill-0, #CCD9D2)" id="Vector_5" />
              <path d={svgPaths.p30310e80} id="Vector_6" stroke="var(--stroke-0, #A1B2A9)" strokeWidth="0.7" />
              <path d={svgPaths.p3d79e480} id="Vector_7" stroke="var(--stroke-0, #A1B2A9)" strokeLinecap="round" strokeWidth="1.4" />
              <path d={svgPaths.p343b9e80} id="Vector_8" stroke="var(--stroke-0, #A1B2A9)" strokeLinecap="round" strokeWidth="1.1" />
              <path d={svgPaths.p1ff07000} id="Vector_9" stroke="var(--stroke-0, #A1B2A9)" strokeLinecap="round" strokeWidth="0.9" />
              <path d={svgPaths.p1daba700} id="Vector_10" stroke="var(--stroke-0, #EFB399)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" />
            </g>
            <g id="Group_2">
              <path d={svgPaths.p19efb180} fill="var(--fill-0, #EDF2F0)" id="Vector_11" />
              <path d={svgPaths.p19efb180} id="Vector_12" stroke="var(--stroke-0, #CCD9D2)" strokeWidth="0.6" />
              <path d={svgPaths.p31185fe0} id="Vector_13" stroke="var(--stroke-0, #CCD9D2)" strokeLinecap="round" strokeWidth="1.2" />
              <path d={svgPaths.p32d3eec0} id="Vector_14" stroke="var(--stroke-0, #CCD9D2)" strokeLinecap="round" />
              <path d={svgPaths.p151f3c80} id="Vector_15" stroke="var(--stroke-0, #EFB399)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" />
            </g>
            <path d="M59.2002 112H79.2002" id="Vector_16" stroke="var(--stroke-0, #EFB399)" strokeLinecap="round" />
            <path d="M99.2002 112H109.2" id="Vector_17" stroke="var(--stroke-0, #EFB399)" strokeDasharray="2 3" strokeLinecap="round" strokeWidth="0.8" />
            <path d="M145.2 112H155.2" id="Vector_18" stroke="var(--stroke-0, #EFB399)" strokeDasharray="2 3" strokeLinecap="round" strokeWidth="0.8" />
            <path d="M175.2 112H195.2" id="Vector_19" stroke="var(--stroke-0, #EFB399)" strokeLinecap="round" />
            <g id="Group_3">
              <path d={svgPaths.p3430cf80} fill="var(--fill-0, #F8EADD)" id="Vector_20" stroke="var(--stroke-0, #EFB399)" strokeWidth="0.5" />
            </g>
            <g id="Group_4">
              <path d={svgPaths.p1c9b7f00} fill="var(--fill-0, #E3F3EE)" id="Vector_21" stroke="var(--stroke-0, #CCD9D2)" strokeWidth="0.5" />
            </g>
            <g id="Group_5">
              <path d={svgPaths.p12079f0} fill="var(--fill-0, #E3F3EE)" id="Vector_22" stroke="var(--stroke-0, #A1B2A9)" strokeWidth="0.4" />
            </g>
            <path d={svgPaths.pdac500} fill="var(--fill-0, #D2D2D2)" id="Vector_23" />
            <path d={svgPaths.p3af9bd00} fill="var(--fill-0, #D2D2D2)" id="Vector_24" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[28px] relative shrink-0 w-full">
      <HeaderSubHeader />
      <Group />
    </div>
  );
}

function Message() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start justify-center min-w-[92px] py-[4px] relative shrink-0 w-full" data-name="message">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] min-w-[92px] relative shrink-0 text-[#212223] text-[16px] text-center w-[390px]">Try your request again. If the problem continues, contact Support in the sidebar menu.</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[48px] relative size-full">
          <p className="font-['Clario:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[28px] text-center w-full">Something went wrong</p>
          <Message />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] whitespace-nowrap">
        <p className="leading-[1.5]">Go to home</p>
      </div>
    </div>
  );
}

function ButtonGrouping() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="button-grouping">
      <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[40px] relative rounded-[8px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <Contents />
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

export default function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative size-full">
      <Frame1 />
      <CcButtonFooter />
    </div>
  );
}