import svgPaths from "./svg-lz27ai59hc";

function Frame1() {
  return (
    <div className="bg-[#0062c4] content-stretch flex items-center justify-center px-[4px] py-[2px] relative rounded-[50px] shrink-0">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[1.35]">1 document</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[537px] top-[30px]">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#0062c4] text-[16px] text-center">
          <p className="leading-[normal]">{`\uF15C`}</p>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function Close() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11.575px] left-[calc(50%-0.16px)] top-[calc(50%+0.16px)] w-[12.823px]" data-name="close">
      <div className="absolute inset-[-3.24%_-9.16%_-18.79%_-9.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1729 14.1254">
          <g filter="url(#filter0_d_5065_3984)" id="close">
            <path d={svgPaths.p319a6900} fill="var(--fill-0, white)" id="Shape" />
            <path clipRule="evenodd" d={svgPaths.p1193a280} fillRule="evenodd" id="Shape_2" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="0.75" />
            <path d={svgPaths.p2c35bc00} fill="var(--fill-0, black)" id="Shape_3" />
            <path d={svgPaths.p1db9d000} fill="var(--fill-0, black)" id="Shape_4" />
            <path d={svgPaths.p130f8680} fill="var(--fill-0, black)" id="Shape_5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="14.1254" id="filter0_d_5065_3984" width="15.1729" x="2.98023e-08" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5065_3984" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_5065_3984" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function SafFileUploadDropArea() {
  return (
    <div className="bg-[#edf6ff] content-stretch flex flex-col gap-[8px] items-center justify-center p-[12px] relative rounded-[8px] size-full" data-name="saf-file-upload-drop-area">
      <div aria-hidden="true" className="absolute border-2 border-[#054688] border-dashed inset-[-2px] pointer-events-none rounded-[10px]" />
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[16px] text-center">
        <p className="leading-[normal]">{`\uF319`}</p>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">{`{Drag your file here to attach.}`}</p>
      </div>
      <Frame />
      <div className="absolute left-[573px] overflow-clip size-[24px] top-[54px]" data-name="cursors">
        <Close />
      </div>
    </div>
  );
}