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

function Checkbox() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[24px] pt-[2px] relative shrink-0" data-name="checkbox">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[89px]" data-name="cc-checkbox">
        <Frame />
        <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] min-w-px relative text-[#212223] text-[16px]">Select all</p>
      </div>
    </div>
  );
}

function SafTableSelected() {
  return (
    <div className="content-stretch flex font-['Source_Sans_3:SemiBold',sans-serif] font-semibold gap-[8px] items-start leading-[1.35] relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap" data-name="saf-table-selected">
      <p className="relative shrink-0">0</p>
      <p className="relative shrink-0">selected</p>
    </div>
  );
}

function SelectAll() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[4px] relative shrink-0" data-name="select-all">
      <Checkbox />
      <SafTableSelected />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]" data-name="filled=false">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#8a8a8a] text-[16px] text-center w-full">
          <p className="leading-[normal]">circle-xmark</p>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8a8a8a] text-[16px] whitespace-nowrap">
        <p className="leading-[1.35]">Remove</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="actions">
      <div className="bg-[rgba(252,252,252,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="cc-button">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents />
      </div>
    </div>
  );
}

function SafToolbarBottomLeft() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="saf-toolbar-bottom-left">
      <SelectAll />
      <Actions />
    </div>
  );
}

function MiddleToolbar() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Middle toolbar">
      <SafToolbarBottomLeft />
    </div>
  );
}

function SafToolbar() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="saf-toolbar">
      <MiddleToolbar />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="content-stretch flex items-start relative shrink-0" data-name="cc-flexgrid-cell-content">
        <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden text-ellipsis">Select</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption1() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container1 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption2() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container2 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption2 />
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

function Container8() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption8() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container8 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption8 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption9() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container9 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption10() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container10 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative size-[14px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="container" />
      </svg>
    </div>
  );
}

function CheckboxOption11() {
  return (
    <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container11 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative self-stretch shrink-0">
      <div className="content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxOption11 />
      </div>
    </div>
  );
}

function CcFlexgridColumns() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[24px]" data-name="cc-flexgrid-columns">
      <div className="bg-[#f0f2f1] min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-column-header">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
            <Label />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame1 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame2 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame3 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame4 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame5 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame6 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame7 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame8 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame9 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame10 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[8px] h-[24px] items-start relative shrink-0" data-name="selection=unchecked, state=default">
              <Frame11 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
              <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="content-stretch flex items-start relative shrink-0" data-name="cc-flexgrid-cell-content">
        <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden text-ellipsis">Name</p>
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="content-stretch flex items-start relative shrink-0" data-name="cc-flexgrid-cell-content">
        <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden text-ellipsis">Size</p>
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="content-stretch flex items-start relative shrink-0" data-name="cc-flexgrid-cell-content">
        <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden text-ellipsis">Status</p>
        </div>
      </div>
    </div>
  );
}

function StatusDot() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Uploaded</p>
    </div>
  );
}

function StatusDot1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/error*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#ffeded] text-[16px] text-center w-full">
            <p className="leading-[normal]">hexagon-exclamation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot1 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">File too large</p>
    </div>
  );
}

function StatusDot2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/error*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#ffeded] text-[16px] text-center w-full">
            <p className="leading-[normal]">hexagon-exclamation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot2 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">File type not accepted</p>
    </div>
  );
}

function StatusDot3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/information*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#edf6ff] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot3 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Uploading...</p>
    </div>
  );
}

function StatusDot4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot4 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot5 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridCellsMXxxl() {
  return (
    <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status6() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot6 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridCellsMXxxl1() {
  return (
    <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status7() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot7 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridCellsMXxxl2() {
  return (
    <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot8 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridCellsMXxxl3() {
  return (
    <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status9() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot9 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridCellsMXxxl4() {
  return (
    <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status9 />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status10() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot10 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status11() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot11 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status12() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot12 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status13() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot13 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot14 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status15() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot15 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status16() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot16 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot17 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status18() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot18 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function StatusDot19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="status-dot">
      <div className="relative rounded-[88px] shrink-0 size-[16px]" data-name="cc-status-dot">
        <div className="absolute content-stretch flex flex-col items-center justify-center left-0 size-[16px] top-0" data-name="action/checkmark-circle*">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#f5fff3] text-[16px] text-center w-full">
            <p className="leading-[normal]">circle-check</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="status">
      <StatusDot19 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">Status text</p>
    </div>
  );
}

function CcFlexgridColumns1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[184px]" data-name="cc-flexgrid-columns">
      <div className="bg-[#f0f2f1] min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-column-header">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
            <Label3 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <Status />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <Status1 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <Status2 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <Status3 />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <Status4 />
            </div>
          </div>
        </div>
      </div>
      <CcFlexgridCellsMXxxl />
      <CcFlexgridCellsMXxxl1 />
      <CcFlexgridCellsMXxxl2 />
      <CcFlexgridCellsMXxxl3 />
      <CcFlexgridCellsMXxxl4 />
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status10 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status11 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status12 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status13 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status14 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status15 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status16 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status17 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status18 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
            <Status19 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="content-stretch flex items-start relative shrink-0" data-name="cc-flexgrid-cell-content">
        <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[1.2] overflow-hidden text-ellipsis">Remove</p>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function Contents10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

function CcFlexgridColumns2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[86px]" data-name="cc-flexgrid-columns">
      <div className="bg-[#f0f2f1] min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-column-header">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
            <Label4 />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
                <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
                  <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
                    <p className="leading-[normal]">circle-xmark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents1 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents2 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents3 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents4 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents5 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents6 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents7 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents8 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents9 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
        <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="cc-flexgrid-cell-content">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[4px] shrink-0" data-name="cc-button">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <Contents10 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileGrid() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px overflow-clip relative w-full" data-name="file grid">
      <CcFlexgridColumns />
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="cc-flexgrid-columns">
        <div className="bg-[#f0f2f1] min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-column-header">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
              <Label1 />
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{Document name}.{type}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[124px]" data-name="cc-flexgrid-columns">
        <div className="bg-[#f0f2f1] min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-column-header">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
              <Label2 />
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center min-h-[inherit] size-full">
            <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
                <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[1.2] overflow-hidden text-ellipsis">{`{1.5 MB}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[40px] relative shrink-0 w-full" data-name="cc-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="cc-flexgrid-cell-content">
              <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[1.2] overflow-hidden text-ellipsis">Cell text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CcFlexgridColumns1 />
      <CcFlexgridColumns2 />
    </div>
  );
}

export default function CcSlot() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start justify-center relative rounded-[4px] size-full" data-name="cc-slot">
      <SafToolbar />
      <FileGrid />
    </div>
  );
}