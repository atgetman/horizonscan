import svgPaths from "./svg-esnypa43dc";

export default function CcCheckbox() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="cc-checkbox">
      <div className="flex flex-row items-center self-stretch">
        <div className="h-full relative shrink-0">
          <div className="content-stretch flex items-start pt-[2px] relative size-full">
            <div className="bg-[#1d4b34] relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox-option">
              <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="-scale-y-100 flex-none rotate-180">
                    <div className="relative size-[14px]" data-name="container">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                        <g id="container">
                          <path clipRule="evenodd" d={svgPaths.p2cb70200} fill="var(--fill-0, white)" fillRule="evenodd" id="check" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
            </div>
          </div>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] min-w-px relative text-[#212223] text-[15px]">Checkbox text label</p>
    </div>
  );
}