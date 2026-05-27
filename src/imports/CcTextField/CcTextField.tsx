export default function CcTextField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start pb-[20px] relative size-full" data-name="cc-text-field">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="labels">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="label">
          <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">Email address</p>
        </div>
        <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal h-[17px] leading-[1.2] relative shrink-0 text-[#212223] text-[14px] w-[356px]">Use the format email@address.com.</p>
      </div>
      <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full z-[2]" data-name="field">
        <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
          <div className="flex-[1_0_0] h-full min-w-px relative" data-name="text-input">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[12px] py-[4px] size-full" />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      </div>
    </div>
  );
}