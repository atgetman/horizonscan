function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#24594c] text-[12px] whitespace-nowrap">
        <p className="leading-[1.2]">New</p>
      </div>
    </div>
  );
}

export default function CcNewBadgeStatus() {
  return (
    <div className="bg-[#e3f3ee] relative rounded-[88px] size-full" data-name="cc-new-badge-status">
      <div className="content-stretch flex gap-[4px] items-center justify-center min-h-[inherit] overflow-clip px-[8px] py-[2px] relative rounded-[inherit] size-full">
        <Label />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-[-1px] pointer-events-none rounded-[89px] shadow-[0px_0px_0px_1px_white]" />
    </div>
  );
}