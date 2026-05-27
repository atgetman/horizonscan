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

export default function MiddleToolbar() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="Middle toolbar">
      <SafToolbarBottomLeft />
    </div>
  );
}