function ChevronDown() {
  return (
    <div className="absolute left-[77.34px] size-[16px] top-[11px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #212223)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="border border-[#d1d5dc] border-solid relative rounded-[4px] size-full" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Source_Sans_3:Medium',sans-serif] font-medium leading-[21px] left-[43px] text-[#212223] text-[14px] text-center top-[8px] whitespace-nowrap">Can view</p>
      <ChevronDown />
    </div>
  );
}