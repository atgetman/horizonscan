function Contents() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="[word-break:break-word] flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] whitespace-nowrap">
        <p className="leading-[1.35]">Label text</p>
      </div>
    </div>
  );
}

export default function CcButton() {
  return (
    <div className="bg-[#123021] content-stretch flex items-start justify-center relative rounded-[4px] size-full" data-name="cc-button">
      <div aria-hidden="true" className="absolute border border-[#123021] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents />
    </div>
  );
}