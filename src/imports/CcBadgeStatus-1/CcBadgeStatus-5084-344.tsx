function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#dc0a0a] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">Label</p>
      </div>
    </div>
  );
}

export default function CcBadgeStatus() {
  return (
    <div className="bg-[#ffeded] content-stretch flex gap-[4px] items-center justify-center px-[4px] relative rounded-[88px] size-full" data-name="cc-badge-status">
      <div aria-hidden="true" className="absolute border border-[#dc0a0a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
      <Label />
    </div>
  );
}