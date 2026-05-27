import svgPaths from "./svg-cvoytk49g";

function Icon() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[13px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_3413_186)" id="Icon">
          <path d={svgPaths.p115b3700} fill="var(--fill-0, #D64000)" id="Vector" stroke="var(--stroke-0, #D64000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <g id="Vector_2">
            <path d="M11.6667 1.75V4.08333Z" fill="var(--fill-0, #D64000)" />
            <path d="M11.6667 1.75V4.08333" stroke="var(--stroke-0, #D64000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
          <g id="Vector_3">
            <path d="M12.8333 2.91667H10.5Z" fill="var(--fill-0, #D64000)" />
            <path d="M12.8333 2.91667H10.5" stroke="var(--stroke-0, #D64000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
          <g id="Vector_4">
            <path d="M2.33333 9.91667V11.0833Z" fill="var(--fill-0, #D64000)" />
            <path d="M2.33333 9.91667V11.0833" stroke="var(--stroke-0, #D64000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
          <g id="Vector_5">
            <path d="M2.91667 10.5H1.75Z" fill="var(--fill-0, #D64000)" />
            <path d="M2.91667 10.5H1.75" stroke="var(--stroke-0, #D64000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3413_186">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BetaToggle() {
  return (
    <div className="absolute h-[20px] left-[32px] top-[10px] w-[127.57px]" data-name="BetaToggle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Try new CoCounsel</p>
    </div>
  );
}

function Container1() {
  return <div className="bg-white h-[12px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function BetaToggle1() {
  return (
    <div className="absolute bg-[#d1d5dc] content-stretch flex flex-col h-[16px] items-start left-[169.57px] pl-[2px] pr-[18px] pt-[2px] rounded-[16777200px] top-[12px] w-[32px]" data-name="BetaToggle">
      <Container1 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white border border-[#e5e7eb] border-solid relative rounded-[16777200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-full" data-name="Container">
      <Icon />
      <BetaToggle />
      <BetaToggle1 />
    </div>
  );
}