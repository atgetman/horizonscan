import svgPaths from "./svg-2zye11595e";

function Container() {
  return (
    <div className="relative size-[20px]" data-name="container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="container">
          <path d={svgPaths.p27209dc0} fill="var(--fill-0, white)" id="vector" />
        </g>
      </svg>
    </div>
  );
}

export default function RadioOption() {
  return (
    <div className="bg-[#1d4b34] relative rounded-[88px] size-full" data-name="radio-option">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Container />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
    </div>
  );
}