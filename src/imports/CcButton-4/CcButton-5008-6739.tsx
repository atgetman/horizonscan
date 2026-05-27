function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[1.2]">Label text</p>
      </div>
    </div>
  );
}

export default function CcButton() {
  return (
    <div className="bg-[#50665b] content-stretch flex items-start justify-center relative rounded-[4px] size-full" data-name="cc-button">
      <div aria-hidden="true" className="absolute border border-[#50665b] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents />
    </div>
  );
}