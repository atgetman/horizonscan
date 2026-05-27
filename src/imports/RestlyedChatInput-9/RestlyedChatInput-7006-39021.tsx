import svgPaths from "./svg-vpjiqn3zdy";

function Frame25() {
  return (
    <div className="content-stretch flex items-center pt-[4px] relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#de6633] text-[16px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] w-[20px]">{`\uE5D6`}</p>
    </div>
  );
}

function IconQuestion() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="Icon/Question">
      <Frame25 />
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap">
        <p className="leading-[1.5]">What tone and level of formality should this output maintain?</p>
      </div>
    </div>
  );
}

function Range() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="range">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.5]">4</p>
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
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="page-controls">
      <PrevNext />
    </div>
  );
}

function SafPaginationContent() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end justify-center relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-[92px]" data-name="saf-pagination-content">
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

function Frame13() {
  return (
    <div className="content-stretch flex gap-[16px] h-full items-start relative shrink-0 w-[659px]">
      <IconQuestion />
      <CcPagination />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-h-px relative w-full">
      <Frame13 />
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
      <Frame26 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Header />
    </div>
  );
}

function Container() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function RadioOption() {
  return (
    <div className="bg-[#1d4b34] relative rounded-[88px] shrink-0 size-[16px]" data-name="radio-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Highly formal and traditional legal language</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[207.333px]">
      <Frame7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame1 />
    </div>
  );
}

function File() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame />
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="cc-radio">
          <RadioOption />
        </div>
        <File />
      </div>
    </div>
  );
}

function InputItem() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Input Item">
      <div className="bg-[#edf2f0] content-stretch flex items-center py-[12px] relative rounded-[8px] shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
        <Frame6 />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
      <InputItem />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function RadioOption1() {
  return (
    <div className="bg-white relative rounded-[88px] shrink-0 size-[16px]" data-name="radio-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container1 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Professional but conversational business tone</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[207.333px]">
      <Frame9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame3 />
    </div>
  );
}

function File1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame2 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="cc-radio">
          <RadioOption1 />
        </div>
        <File1 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[44px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame8 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function RadioOption2() {
  return (
    <div className="bg-white relative rounded-[88px] shrink-0 size-[16px]" data-name="radio-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container2 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Academic and technical writing style</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[207.333px]">
      <Frame12 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame11 />
    </div>
  );
}

function File2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame4 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="cc-radio">
          <RadioOption2 />
        </div>
        <File2 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[44px] items-start relative shrink-0" data-name="Input Item">
        <div className="bg-white relative rounded-[8px] self-stretch shrink-0 w-[702px]" data-name="Sprint6 - List-selection-item">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center py-[12px] relative size-full">
              <Frame10 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function RadioOption3() {
  return (
    <div className="bg-white relative rounded-[88px] shrink-0 size-[16px]" data-name="radio-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container3 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Casual and approachable communication</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[207.333px]">
      <Frame22 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame21 />
    </div>
  );
}

function File3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="file">
      <Frame17 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="content-stretch flex gap-[18px] items-start pl-[12px] relative size-full">
        <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="cc-radio">
          <RadioOption3 />
        </div>
        <File3 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="content-stretch flex h-[44px] items-start relative shrink-0" data-name="Input Item">
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

function Container4() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

function RadioOption4() {
  return (
    <div className="bg-white relative rounded-[88px] shrink-0 size-[16px]" data-name="radio-option">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container4 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="text-input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-w-px relative text-[#212223] text-[16px]">
            <p className="leading-[1.35]">{`Type your own words `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full z-[2]" data-name="field">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <TextInput />
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18px] items-center px-[12px] relative size-full">
          <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="cc-radio">
            <RadioOption4 />
          </div>
          <div className="content-stretch flex flex-col gap-[8px] isolate items-start justify-center py-[8px] relative shrink-0 w-[356px]" data-name="cc-text-field">
            <Field />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col h-[234px] items-start max-h-[261px] relative shrink-0 w-[702px]">
      <Frame15 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[rgba(252,252,252,0.01)] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0.01)] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame18 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame19 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame20 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame24 />
      <div className="h-px relative shrink-0 w-full" data-name="saf-divider">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute bg-[#8a8a8a] h-px left-0 right-0 top-0" data-name="divider-vector" />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col h-[234px] items-start max-h-[261px] relative shrink-0 w-full" data-name="Input">
      <Frame23 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] h-[270px] items-start min-w-px relative">
      <Frame14 />
      <Input />
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white h-[304px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full z-[2]" data-name="text-area-field">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pb-[16px] pt-[20px] px-[24px] relative size-full">
          <Frame5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
    </div>
  );
}

function CcTextArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start min-h-px relative w-full" data-name="cc-text-area">
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
    <div className="content-stretch flex flex-col h-[352px] items-center justify-end relative shrink-0 w-full z-[1]" data-name="CoCo-Prompt MFE">
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