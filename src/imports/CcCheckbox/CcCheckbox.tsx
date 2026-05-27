export default function CcCheckbox() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative size-full" data-name="cc-checkbox">
      <div className="relative self-stretch shrink-0">
        <div className="content-stretch flex items-start pt-[2px] relative size-full">
          <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
              <div className="flex items-center justify-center relative shrink-0">
                <div className="-scale-y-100 flex-none rotate-180">
                  <div className="relative size-[14px]" data-name="container">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <g id="container" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
          </div>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] min-w-px relative text-[#212223] text-[15px]">Checkbox text label</p>
    </div>
  );
}