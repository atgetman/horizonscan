import svgPaths from "./svg-bxu3m4vr80";

function Frame36() {
  return (
    <div className="content-stretch flex items-center pt-[4px] relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#de6633] text-[16px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] w-[20px]">{`\uE5D6`}</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame36 />
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold from-[#ededed] justify-center leading-[0] relative self-stretch shrink-0 text-[16px] text-[transparent] to-[#e2e2e2] to-[58.173%] via-[#c3c3c3] via-[20.673%] w-[502px]">
        <p className="leading-[1.5]">Select a discovery documents</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame38 />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#212223] text-[14px] w-[min-content]">
        <p className="leading-[1.35]">Please upload the executed lease agreement so I can review the termination clause and identify any early exit penalties.</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative">
      <Frame31 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative">
      <Frame21 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame37 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Sprint6 - Input Header">
        <Frame19 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame15 />
      <Metadata />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame9 />
    </div>
  );
}

function File() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame8 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame />
        </div>
        <File />
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-[#edf2f0] relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame14 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container">
          <path clipRule="evenodd" d={svgPaths.p2cb70200} fill="var(--fill-0, white)" fillRule="evenodd" id="check" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxOption1() {
  return (
    <div className="bg-[#1d4b34] relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container1 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-full relative shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption1 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata1() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame17 />
      <Metadata1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame11 />
    </div>
  );
}

function File1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame10 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-[16px]" data-name="loading-icon">
          <div className="flex flex-row items-center self-stretch">
            <Frame1 />
          </div>
        </div>
        <File1 />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame16 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container">
          <path clipRule="evenodd" d={svgPaths.p2cb70200} fill="var(--fill-0, white)" fillRule="evenodd" id="check" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxOption2() {
  return (
    <div className="bg-[#1d4b34] relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container2 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-full relative shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption2 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata2() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame24 />
      <Metadata2 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame20 />
    </div>
  );
}

function File2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame12 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-[16px]" data-name="loading-icon">
          <div className="flex flex-row items-center self-stretch">
            <Frame2 />
          </div>
        </div>
        <File2 />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame18 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption3() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container3 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption3 />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata3() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame33 />
      <Metadata3 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame32 />
    </div>
  );
}

function File3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame30 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame3 />
        </div>
        <File3 />
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame25 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption4() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container4 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption4 />
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata4() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame41 />
      <Metadata4 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame40 />
    </div>
  );
}

function File4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame39 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame4 />
        </div>
        <File4 />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame35 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption5() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container5 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption5 />
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata5() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame46 />
      <Metadata5 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame45 />
    </div>
  );
}

function File5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame44 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame5 />
        </div>
        <File5 />
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame43 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption6() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container6 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption6 />
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata6() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame51 />
      <Metadata6 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame50 />
    </div>
  );
}

function File6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame49 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame6 />
        </div>
        <File6 />
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame48 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption7() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container7 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption7 />
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center not-italic relative shrink-0 text-[14px] w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center relative shrink-0 text-[#0062c4] text-center">
        <p className="leading-[normal]">{`\uF15C`}</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223]">
        <p className="leading-[1.2]">Smith v. Acme Corp (2024)</p>
      </div>
    </div>
  );
}

function Metadata7() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:Regular',sans-serif] font-normal gap-[4px] items-center px-[20px] relative shrink-0 text-[#666] text-[12px] w-[207.333px]" data-name="Metadata">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">NY Supreme Court</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Breach of Contract</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">•</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.2]">Favorable — $2.3M verdict</p>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[0] relative shrink-0 whitespace-nowrap">
      <Frame56 />
      <Metadata7 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame55 />
    </div>
  );
}

function File7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame54 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[18px] items-start relative shrink-0 w-[16px]" data-name="loading-icon">
          <Frame7 />
        </div>
        <File7 />
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[58px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame53 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start max-h-[261px] overflow-clip relative shrink-0 w-full">
      <Frame23 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[rgba(252,252,252,0.01)] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0.01)] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame27 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame28 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame29 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame34 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame42 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame47 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame52 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[323px] items-start min-w-px relative">
      <Frame22 />
      <Frame26 />
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pb-[16px] pt-[20px] px-[24px] relative size-full">
          <Frame13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
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

function CcTextArea() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full" data-name="cc-text-area">
      <OuterFrame />
    </div>
  );
}

function CocoTextField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Coco-text-field">
      <CcTextArea />
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
        <p className="leading-[1.2]">Submit</p>
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
      <CocoTextField />
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