import svgPaths from "./svg-qkphqlu2ln";

function H() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[42px] left-0 not-italic text-[#314b3e] text-[28px] top-[-0.5px] whitespace-nowrap">Library</p>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Info">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1563_17003)" id="Info">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667V8" id="Vector_2" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333H8.00667" id="Vector_3" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1563_17003">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Info />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[42px] items-center left-[24px] top-[16px] w-[119.055px]" data-name="Container">
      <H />
      <Button />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[360px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[12px] pr-[40px] relative rounded-[inherit] size-full">
        <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">Search library</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Search">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[324px] size-[36px] top-0" data-name="Container">
      <Search />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[36px] left-[943px] top-[19px] w-[360px]" data-name="Container">
      <Input />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[63px] relative shrink-0 w-[1327px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[83.258px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#314b3e] border-b-3 border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[21px] left-[42px] text-[#212223] text-[14px] text-center top-[7.5px] whitespace-nowrap">Prompts</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[113.063px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[21px] left-[57px] text-[#666] text-[14px] text-center top-[9px] whitespace-nowrap">Question sets</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[40px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[100.375px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[21px] left-[50.5px] text-[#666] text-[14px] text-center top-[9px] whitespace-nowrap">Documents</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-start pb-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[1327px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[36px] left-0 rounded-[8px] top-0 w-[160px]" data-name="button">
      <p className="absolute font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[19.5px] left-[12px] text-[#212223] text-[13px] top-[7.75px] whitespace-nowrap">My prompts</p>
    </div>
  );
}

function ChevronsUpDown() {
  return (
    <div className="absolute left-[132px] size-[16px] top-[10px]" data-name="ChevronsUpDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronsUpDown">
          <path d={svgPaths.p17a0fc80} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3042540} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[36px] relative shrink-0 w-[160px]" data-name="Container">
      <Button4 />
      <ChevronsUpDown />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[36px] left-0 rounded-[8px] top-0 w-[160px]" data-name="button">
      <p className="absolute font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[19.5px] left-[12px] text-[#999] text-[13px] top-[7.75px] whitespace-nowrap">Task type</p>
    </div>
  );
}

function ChevronsUpDown1() {
  return (
    <div className="absolute left-[132px] size-[16px] top-[10px]" data-name="ChevronsUpDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronsUpDown">
          <path d={svgPaths.p17a0fc80} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3042540} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[160px]" data-name="Container">
      <Button5 />
      <ChevronsUpDown1 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[36px] left-0 rounded-[8px] top-0 w-[160px]" data-name="button">
      <p className="absolute font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[19.5px] left-[12px] text-[#999] text-[13px] top-[7.75px] whitespace-nowrap">Practice area</p>
    </div>
  );
}

function ChevronsUpDown2() {
  return (
    <div className="absolute left-[132px] size-[16px] top-[10px]" data-name="ChevronsUpDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronsUpDown">
          <path d={svgPaths.p17a0fc80} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3042540} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[36px] relative shrink-0 w-[160px]" data-name="Container">
      <Button6 />
      <ChevronsUpDown2 />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[36px] left-0 rounded-[8px] top-0 w-[160px]" data-name="button">
      <p className="absolute font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[19.5px] left-[12px] text-[#999] text-[13px] top-[7.75px] whitespace-nowrap">Tags</p>
    </div>
  );
}

function ChevronsUpDown3() {
  return (
    <div className="absolute left-[132px] size-[16px] top-[10px]" data-name="ChevronsUpDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronsUpDown">
          <path d={svgPaths.p17a0fc80} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3042540} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[36px] relative shrink-0 w-[160px]" data-name="Container">
      <Button7 />
      <ChevronsUpDown3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <Container8 />
        <Container9 />
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#314b3e] h-[36px] relative rounded-[8px] shrink-0 w-[135.469px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Plus />
        <p className="-translate-x-1/2 absolute font-['Clario:Medium',sans-serif] leading-[21px] left-[80px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">New prompt</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[61px] relative shrink-0 w-[1327px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[24px] relative size-full">
        <Container7 />
        <Button8 />
      </div>
    </div>
  );
}

function PromptIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p280ce600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p33447800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 12.25H9.91667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 1.75V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p393bd830} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(254, 154, 0) 0%, rgb(245, 73, 0) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon />
      </div>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[156.922px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">AI Jurisdiction Surveys</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container18 />
        <H1 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Span() {
  return <div className="absolute h-[20px] left-[346.66px] top-[17.9px] w-0" data-name="span" />;
}

function P() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[0] left-0 text-[#666] text-[14px] top-[-1px] w-[347px]">
          <span className="leading-[18.9px]">{`Please provide a comprehensive survey of the law across different jurisdictions regarding: `}</span>
          <span className="leading-[18.9px] text-[#bd3f10]">[INSERT LEGAL QUESTION]</span>
        </p>
        <Span />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[81.469px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Client-Facing</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span1 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <P />
      <Container19 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container15 />
    </div>
  );
}

function PromptIcon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p26576520} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p10d5d600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(79, 57, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon1 />
      </div>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[188.133px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Agreement Clause Drafting</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container24 />
        <H2 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function Span2() {
  return <div className="absolute h-[20px] left-[373.95px] top-[17.9px] w-0" data-name="span" />;
}

function P1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[0] left-0 text-[#666] text-[14px] top-[-1px] w-[374px]">
          <span className="leading-[18.9px]">{`Draft a `}</span>
          <span className="leading-[18.9px] text-[#bd3f10]">[CLAUSE TYPE]</span>
          <span className="leading-[18.9px]">{` clause for a `}</span>
          <span className="leading-[18.9px] text-[#bd3f10]">[AGREEMENT TYPE]</span>
          <span className="leading-[18.9px]">{` that addresses the following requirements: `}</span>
          <span className="leading-[18.9px] text-[#bd3f10]">[INSERT REQUIREMENTS]</span>
        </p>
        <Span2 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[73.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <P1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[431.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container21 />
    </div>
  );
}

function PromptIcon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p280ce600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p33447800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 12.25H9.91667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 1.75V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p393bd830} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(254, 154, 0) 0%, rgb(245, 73, 0) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon2 />
      </div>
    </div>
  );
}

function H3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[170.031px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">AI-Assisted Research US</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container29 />
        <H3 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Span3() {
  return <div className="absolute h-[20px] left-[376.7px] top-[17.9px] w-0" data-name="span" />;
}

function P2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[0] left-0 text-[#666] text-[14px] top-[-1px] w-[377px]">
          <span className="leading-[18.9px]">{`Research the following legal question and provide relevant answers with citations to Westlaw authority: `}</span>
          <span className="leading-[18.9px] text-[#bd3f10]">[INSERT QUESTION]</span>
        </p>
        <Span3 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[55.398px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Internal</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span4 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <P2 />
      <Container30 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[863.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container26 />
    </div>
  );
}

function PromptIcon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p2dd40300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2a640080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M11.0833 9.33333V12.8333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 11.0833H12.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(79, 57, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon3 />
      </div>
    </div>
  );
}

function H4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[180.367px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Allegation Summary Email</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container35 />
        <H4 />
      </div>
    </div>
  );
}

function Star() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #6E8178)" id="Vector" stroke="var(--stroke-0, #6E8178)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container34 />
        <Button9 />
      </div>
    </div>
  );
}

function P3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[357px]">Draft a professional email to the client summarizing the allegations and outlining the recommended defense strategy.</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[81.469px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Client-Facing</p>
    </div>
  );
}

function Span6() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-[87.47px] px-[8px] py-[2px] rounded-[16777200px] top-0 w-[50.25px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Urgent</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span5 />
        <Span6 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <P3 />
      <Container36 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[157.8px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container32 />
    </div>
  );
}

function PromptIcon4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.25H12.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 8.75H12.25" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 5.25V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 5.25V12.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon4 />
      </div>
    </div>
  );
}

function H5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[185.539px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Amendment Term Analysis</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container41 />
        <H5 />
      </div>
    </div>
  );
}

function Star1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #6E8178)" id="Vector" stroke="var(--stroke-0, #6E8178)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star1 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container40 />
        <Button10 />
      </div>
    </div>
  );
}

function P4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[344px]">Analyze the amendment and modification provisions in the attached contract and explain their implications.</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[84.18px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Due Diligence</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span7 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <P4 />
      <Container42 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[431.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[157.8px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container38 />
    </div>
  );
}

function PromptIcon5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.25H12.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 8.75H12.25" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 5.25V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 5.25V12.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon5 />
      </div>
    </div>
  );
}

function H6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[266.617px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Argument and Counterargument Table</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container47 />
        <H6 />
      </div>
    </div>
  );
}

function Star2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #6E8178)" id="Vector" stroke="var(--stroke-0, #6E8178)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star2 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container46 />
        <Button11 />
      </div>
    </div>
  );
}

function P5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[366px]">Create a table showing the main arguments and corresponding counterarguments for this legal matter.</p>
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[63.961px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Trial Prep</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span8 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <P5 />
      <Container48 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[863.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[157.8px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container44 />
    </div>
  );
}

function PromptIcon6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d="M12.25 7H7.58333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 3.5H4.66667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 10.5H7.58333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1a8c4100} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1fd0e700} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon6 />
      </div>
    </div>
  );
}

function H7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[122.508px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Argument Outline</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container53 />
        <H7 />
      </div>
    </div>
  );
}

function Star3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #6E8178)" id="Vector" stroke="var(--stroke-0, #6E8178)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star3 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container52 />
        <Button12 />
      </div>
    </div>
  );
}

function P6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[345px]">Provide a detailed outline of all arguments presented in the attached documents.</p>
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[63.961px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Trial Prep</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span9 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <P6 />
      <Container54 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[315.59px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container50 />
    </div>
  );
}

function PromptIcon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.25H12.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 8.75H12.25" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 5.25V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 5.25V12.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon7 />
      </div>
    </div>
  );
}

function H8() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[165.563px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Authority Analysis Table</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container59 />
        <H8 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container58 />
      </div>
    </div>
  );
}

function P7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[350px]">Extract and analyze all legal authorities cited in the attached litigation document.</p>
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[93.766px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Motion Practice</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span10 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container57 />
      <P7 />
      <Container60 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[431.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[315.59px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container56 />
    </div>
  );
}

function PromptIcon8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p9ebf00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p30364f80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p300018c0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2278200} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 4.66667H8.75" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 7H9.91667" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 9.33333H7.58333" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon8 />
      </div>
    </div>
  );
}

function H9() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[156.992px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Bulk Opinion Summary</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container65 />
        <H9 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container64 />
      </div>
    </div>
  );
}

function P8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[348px]">Provide summaries of the court holdings and their potential impact on similar cases.</p>
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[110.758px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Case Law Research</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span11 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <P8 />
      <Container66 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[863.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[315.59px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container62 />
    </div>
  );
}

function PromptIcon9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.25H12.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 8.75H12.25" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 5.25V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 5.25V12.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon9 />
      </div>
    </div>
  );
}

function H10() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[223.922px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Claim Identification and Analysis</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container71 />
        <H10 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container70 />
      </div>
    </div>
  );
}

function P9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[331px]">Identify all claims against the defendants and outline the supporting facts for each claim.</p>
      </div>
    </div>
  );
}

function Span12() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[64.641px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Discovery</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span12 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <P9 />
      <Container72 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[473.39px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container68 />
    </div>
  );
}

function PromptIcon10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p9ebf00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p30364f80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p300018c0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2278200} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 4.66667H8.75" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 7H9.91667" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 9.33333H7.58333" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon10 />
      </div>
    </div>
  );
}

function H11() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[109.219px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Claim Summary</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container77 />
        <H11 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container76 />
      </div>
    </div>
  );
}

function P10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[334px]">Summarize all claims presented in the pleading in a clear, structured format.</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[73.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <P10 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[431.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[473.39px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container74 />
    </div>
  );
}

function PromptIcon11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p280ce600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p33447800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M4.08333 12.25H9.91667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 1.75V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p393bd830} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(254, 154, 0) 0%, rgb(245, 73, 0) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon11 />
      </div>
    </div>
  );
}

function H12() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[107.57px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Claims Explorer</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container82 />
        <H12 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container81 />
      </div>
    </div>
  );
}

function P11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[381px]">Analyze the fact pattern and identify all potential claims including statutory, common law, and constitutional causes of action.</p>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[101.656px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Case Assessment</p>
    </div>
  );
}

function Span14() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-[107.66px] px-[8px] py-[2px] rounded-[16777200px] top-0 w-[55.398px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Internal</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span13 />
        <Span14 />
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container80 />
      <P11 />
      <Container83 />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[863.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[473.39px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container79 />
    </div>
  );
}

function PromptIcon12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p29ede480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pfab8980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p32292480} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p35afeac0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon12 />
      </div>
    </div>
  );
}

function H13() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[147.289px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Compare Documents</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container88 />
        <H13 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container87 />
      </div>
    </div>
  );
}

function P12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[352px]">Compare the attached documents and identify all significant differences and changes.</p>
      </div>
    </div>
  );
}

function Span15() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[84.18px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Due Diligence</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span15 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <P12 />
      <Container89 />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[631.19px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container85 />
    </div>
  );
}

function PromptIcon13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.p29ede480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pfab8980} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p32292480} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p35afeac0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon13 />
      </div>
    </div>
  );
}

function H14() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[128.477px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Compare Opinions</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container94 />
        <H14 />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container93 />
      </div>
    </div>
  );
}

function P13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[351px]">Compare the substantive legal analysis in the attached court opinions and highlight key differences.</p>
      </div>
    </div>
  );
}

function Span16() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[110.758px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Case Law Research</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span16 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <P13 />
      <Container95 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[431.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[631.19px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container91 />
    </div>
  );
}

function PromptIcon14() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="PromptIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="PromptIcon">
          <path d={svgPaths.pc71600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.25H12.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 8.75H12.25" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 5.25V12.25" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M8.75 5.25V12.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container100() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 166, 62) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PromptIcon14 />
      </div>
    </div>
  );
}

function H15() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[187.414px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Clario:Medium',sans-serif] leading-[22.5px] left-0 not-italic text-[#212223] text-[15px] top-[-0.5px] whitespace-nowrap">Contract Provision Analysis</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container100 />
        <H15 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[24px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[24px] relative size-full">
        <Container99 />
      </div>
    </div>
  );
}

function P14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[381.664px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18.9px] left-0 text-[#666] text-[14px] top-[-1px] w-[342px]">Analyze the contract and organize all provisions by topic or clause type.</p>
      </div>
    </div>
  );
}

function Span17() {
  return (
    <div className="absolute bg-[#ededed] content-stretch flex h-[22px] items-start left-0 px-[8px] py-[2px] rounded-[16777200px] top-0 w-[84.18px]" data-name="span">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">Due Diligence</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[22px] relative shrink-0 w-[381.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span17 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[107.797px] items-start relative shrink-0 w-full" data-name="Container">
      <Container98 />
      <P14 />
      <Container101 />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[141.797px] items-start left-[863.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[631.19px] w-[415.664px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container97 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[772.984px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container20 />
      <Container25 />
      <Container31 />
      <Container37 />
      <Container43 />
      <Container49 />
      <Container55 />
      <Container61 />
      <Container67 />
      <Container73 />
      <Container78 />
      <Container84 />
      <Container90 />
      <Container96 />
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1327px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] px-[24px] relative size-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="bg-[#fcfcfc] flex-[1_0_0] min-h-px min-w-px relative w-[1327px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container />
        <Container4 />
        <Container6 />
        <Container12 />
      </div>
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="bg-[#fcfcfc] flex-[1_0_0] min-h-px min-w-px relative w-[1327px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Div1 />
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute content-stretch flex flex-col h-[993px] items-start left-0 overflow-clip top-0 w-[1327px]" data-name="div">
      <MotionDiv />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute bg-[#fcfcfc] h-[993px] left-[60px] overflow-clip top-0 w-[1327px]" data-name="main">
      <Div />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[11.44%_11.48%_75.05%_75.01%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.7837 3.78331">
          <path d={svgPaths.p28b7de00} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[75.03%_75.01%_11.46%_11.49%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.7818 3.7836">
          <path d={svgPaths.pcba1400} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[2.56%_26.87%_85.6%_61.3%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.31203 3.31292">
          <path d={svgPaths.p113d0300} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[85.59%_61.29%_2.57%_26.89%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.3114 3.31445">
          <path d={svgPaths.p1c231c71} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_44.93%_89.87%_44.94%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.8368 2.8368">
          <path d={svgPaths.p2094ad00} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[89.87%_44.94%_0_44.93%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.8368 2.8368">
          <path d={svgPaths.p13111300} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[4.26%_62.95%_87.29%_28.59%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.36802 2.36796">
          <path d={svgPaths.p25ba4d00} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[87.28%_28.59%_4.27%_62.95%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.36947 2.36702">
          <path d={svgPaths.p2e472d00} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[14.87%_78.39%_78.37%_14.83%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.89843 1.89516">
          <path d={svgPaths.p37bd40c0} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[78.39%_14.88%_14.85%_78.35%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.8948 1.8937">
          <path d={svgPaths.pbe8df0} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.57%_87.27%_62.97%_4.26%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.36906 2.36792">
          <path d={svgPaths.p5da0d80} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[62.99%_4.25%_28.56%_87.3%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.3673 2.36687">
          <path d={svgPaths.p28af6180} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[44.96%_89.87%_44.91%_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.8368 2.8368">
          <path d={svgPaths.p3a65f800} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[44.96%_0_44.91%_89.87%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.8368 2.8368">
          <path d={svgPaths.p2bb339c0} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[61.28%_85.62%_26.89%_2.55%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.31201 3.31262">
          <path d={svgPaths.p22d39700} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[26.89%_2.6%_61.29%_85.58%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.30985 3.31111">
          <path d={svgPaths.p2ce11900} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[63%_27.51%_27.52%_62.99%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.65953 2.65342">
          <path d={svgPaths.p3a9b8720} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[39.73%_70.49%_52.74%_22%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.10373 2.10674">
          <path d={svgPaths.p292c5900} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[52.72%_22%_39.75%_70.47%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.10865 2.10855">
          <path d={svgPaths.p2d797900} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[53.48%_71.22%_40.48%_22.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.68829 1.69083">
          <path d={svgPaths.p368e1180} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[40.51%_22.75%_53.46%_71.22%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.68839 1.68893">
          <path d={svgPaths.p2c80ac80} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[65.44%_65.48%_30.04%_29.98%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.27005 1.2667">
          <path d={svgPaths.p317fda00} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[29.99%_30.01%_65.48%_65.45%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.2709 1.26882">
          <path d={svgPaths.p35d8d400} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[71.22%_53.49%_22.75%_40.49%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.68831 1.68694">
          <path d={svgPaths.p2f9e3900} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[22.77%_40.52%_71.2%_53.46%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.68573 1.68808">
          <path d={svgPaths.p159da600} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[70.48%_39.73%_22%_52.74%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.10792 2.10735">
          <path d={svgPaths.p3e2214f0} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[22.02%_52.74%_70.47%_39.74%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.10567 2.10488">
          <path d={svgPaths.p3daa1880} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[27.48%_63%_63.04%_27.52%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.65407 2.65401">
          <path d={svgPaths.p37b9e900} fill="var(--fill-0, #D64000)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[28px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <Group />
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Svg />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-0 top-0 w-[59px]" data-name="Container">
      <Link />
    </div>
  );
}

function ItemIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d={svgPaths.p3a151200} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1811de30} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span18() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[28.219px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12.5px] left-0 not-italic text-[#666] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <ItemIcon />
        <Span18 />
      </div>
    </div>
  );
}

function ItemIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d={svgPaths.p4dabe00} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3772af80} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span19() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[39.508px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12.5px] left-0 not-italic text-[#666] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Projects</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <ItemIcon1 />
        <Span19 />
      </div>
    </div>
  );
}

function ItemIcon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d="M10.6667 4L13.3333 13.3333" id="Vector" stroke="var(--stroke-0, #1D4B34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V13.3333" id="Vector_2" stroke="var(--stroke-0, #1D4B34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 5.33333V13.3333" id="Vector_3" stroke="var(--stroke-0, #1D4B34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #1D4B34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span20() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[33.727px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12.5px] left-0 not-italic text-[#1d4b34] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Library</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 size-[48px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <ItemIcon2 />
        <Span20 />
      </div>
    </div>
  );
}

function ItemIcon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d={svgPaths.p12949080} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 2V5.33333H5.33333" id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4.66667V8L10.6667 9.33333" id="Vector_3" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span21() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[34.656px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[12.5px] left-0 not-italic text-[#666] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">History</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <ItemIcon3 />
        <Span21 />
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[749px] items-center left-0 pb-[533px] top-[76px] w-[59px]" data-name="Container">
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function S1() {
  return (
    <div className="absolute inset-[17.73%_90.61%_49.36%_6.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p1d5e6f00} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p2db88980} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p2ab1a300} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p13c16f00} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p263b3900} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function S() {
  return (
    <div className="absolute inset-[21.37%_87.61%_53%_9.61%]" data-name="s4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 3.58805">
        <g id="s4">
          <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
          <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
          <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
          <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
        </g>
      </svg>
    </div>
  );
}

function S5() {
  return (
    <div className="absolute contents inset-[17.73%_87.61%_49.36%_6.61%]" data-name="s9">
      <S1 />
      <S />
    </div>
  );
}

function S2() {
  return (
    <div className="absolute inset-[17.73%_84.61%_49.36%_12.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p2b5a6d00} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function S3() {
  return (
    <div className="absolute inset-[21.37%_81.61%_53%_15.61%]" data-name="s4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 3.58805">
        <g id="s4">
          <path d={svgPaths.p285b9500} fill="var(--fill-0, white)" id="s" />
          <path d={svgPaths.p2232ba00} fill="var(--fill-0, white)" id="s_2" />
          <path d={svgPaths.p395a100} fill="var(--fill-0, white)" id="s_3" />
          <path d={svgPaths.p1cc55000} fill="var(--fill-0, white)" id="s_4" />
        </g>
      </svg>
    </div>
  );
}

function S6() {
  return (
    <div className="absolute contents inset-[17.73%_81.61%_49.36%_12.61%]" data-name="s9">
      <S2 />
      <S3 />
    </div>
  );
}

function S14() {
  return (
    <div className="absolute contents inset-[17.73%_81.61%_49.36%_6.61%]" data-name="s18">
      <S5 />
      <S6 />
    </div>
  );
}

function S4() {
  return (
    <div className="absolute inset-[17.73%_78.61%_49.36%_18.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p2b5a6d00} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function S8() {
  return (
    <div className="absolute inset-[21.37%_75.61%_53%_21.61%]" data-name="s4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 3.58805">
        <g id="s4">
          <path d={svgPaths.p14cbe900} fill="var(--fill-0, white)" id="s" />
          <path d={svgPaths.p2e4a9080} fill="var(--fill-0, white)" id="s_2" />
          <path d={svgPaths.p20fd7740} fill="var(--fill-0, white)" id="s_3" />
          <path d={svgPaths.paea4380} fill="var(--fill-0, white)" id="s_4" />
        </g>
      </svg>
    </div>
  );
}

function S7() {
  return (
    <div className="absolute contents inset-[17.73%_75.61%_49.36%_18.61%]" data-name="s9">
      <S4 />
      <S8 />
    </div>
  );
}

function S10() {
  return (
    <div className="absolute inset-[17.73%_72.61%_49.36%_24.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p2b5a6d00} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function S11() {
  return (
    <div className="absolute inset-[21.37%_69.61%_53%_27.61%]" data-name="s4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 3.58805">
        <g id="s4">
          <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
          <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
          <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
          <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
        </g>
      </svg>
    </div>
  );
}

function S9() {
  return (
    <div className="absolute contents inset-[17.73%_69.61%_49.36%_24.61%]" data-name="s9">
      <S10 />
      <S11 />
    </div>
  );
}

function S15() {
  return (
    <div className="absolute contents inset-[17.73%_69.61%_49.36%_18.61%]" data-name="s18">
      <S7 />
      <S9 />
    </div>
  );
}

function S13() {
  return (
    <div className="absolute inset-[17.73%_66.61%_49.36%_30.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554463 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p2b5a6d00} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function S16() {
  return (
    <div className="absolute inset-[21.37%_63.61%_53%_33.61%]" data-name="s4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 3.58805">
        <g id="s4">
          <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
          <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
          <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
          <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
        </g>
      </svg>
    </div>
  );
}

function S12() {
  return (
    <div className="absolute contents inset-[17.73%_63.61%_49.36%_30.61%]" data-name="s9">
      <S13 />
      <S16 />
    </div>
  );
}

function S17() {
  return (
    <div className="absolute inset-[17.73%_60.61%_49.36%_36.61%]" data-name="s5">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.554462 4.6083">
        <g id="s5">
          <g id="s4">
            <path d={svgPaths.p2414c100} fill="var(--fill-0, white)" id="s" />
            <path d={svgPaths.p17e5b480} fill="var(--fill-0, white)" id="s_2" />
            <path d={svgPaths.p25928800} fill="var(--fill-0, white)" id="s_3" />
            <path d={svgPaths.p161c6200} fill="var(--fill-0, white)" id="s_4" />
          </g>
          <path d={svgPaths.p2b5a6d00} fill="var(--fill-0, white)" id="s_5" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[17.73%_60.61%_49.36%_6.61%]" data-name="Group">
      <S14 />
      <S15 />
      <S12 />
      <S17 />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[14px] relative rounded-[1px] shrink-0 w-[20px]" data-name="img">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[16.17%_5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 9.47368">
            <path d="M0 0H18V9.47368H0" fill="var(--fill-0, #B31942)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[23.97%_5%]" data-name="Vector">
          <div className="absolute inset-[-5%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 8.01619">
              <g id="Vector">
                <path d={svgPaths.p67a9300} fill="var(--fill-0, black)" />
                <path d={svgPaths.p3e334500} stroke="var(--stroke-0, white)" strokeWidth="0.728745" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[16.17%_59%_47.4%_5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 5.10121">
            <path d="M0 0H7.2V5.10121H0" fill="var(--fill-0, #0A3161)" id="Vector" />
          </svg>
        </div>
        <Group1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[1px]" />
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Img />
      </div>
    </div>
  );
}

function UserCircle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="UserCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1563_16918)" id="UserCircle">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3dfd2600} id="Vector_3" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1563_16918">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <UserCircle />
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[168px] items-center left-0 pb-[16px] pt-[52px] top-[825px] w-[59px]" data-name="Container">
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute bg-[#f2f2f2] border-[#e5e5e5] border-r border-solid h-[993px] left-0 top-0 w-[60px]" data-name="Container">
      <Container103 />
      <Container104 />
      <Container105 />
    </div>
  );
}

export default function LegalAiAssistant() {
  return (
    <div className="bg-white relative size-full" data-name="Legal AI Assistant">
      <Main />
      <Container102 />
    </div>
  );
}