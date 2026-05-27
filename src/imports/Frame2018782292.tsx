import svgPaths from "./svg-9x7eqtx8es";

function Frame5() {
  return (
    <div className="absolute bg-white left-0 rounded-[8px] top-0 w-[528px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip p-[8px] relative rounded-[inherit] w-full">
        <div className="bg-[#ebf0ed] relative rounded-[8px] shrink-0 w-full" data-name="Result">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start px-[10px] py-[8px] relative w-full">
              <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p>
                  <span className="leading-[1.2] text-[#8a8a8a]">Draft</span>
                  <span className="leading-[1.2]">{` a motion to dismiss`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Result">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start px-[10px] py-[8px] relative w-full">
              <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p>
                  <span className="leading-[1.2] text-[#8a8a8a]">Draft</span>
                  <span className="leading-[1.2]">{` an agreement`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Result">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start px-[10px] py-[8px] relative w-full">
              <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p>
                  <span className="leading-[1.2] text-[#8a8a8a]">Draft</span>
                  <span className="leading-[1.2]">{` a policy`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Result">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-start px-[10px] py-[8px] relative w-full">
              <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-black whitespace-nowrap">
                <p>
                  <span className="leading-[1.2] text-[#8a8a8a]">Draft</span>
                  <span className="leading-[1.2]">{` an email`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[7px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="h-[14px] relative shrink-0 w-[12.25px]" data-name="vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 14">
          <path d={svgPaths.p29c3a00} fill="var(--fill-0, #404040)" id="vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Explore more prompts</p>
      </div>
    </div>
  );
}

function SafButton() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents />
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Left Actions">
      <SafButton />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 top-[176px] w-[528px]">
      <LeftActions />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[208px] left-[12px] top-[63px] w-[528px]">
      <Frame5 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative rounded-[4px] shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[14px] text-center text-white">
          <p className="leading-[normal]">edit</p>
        </div>
      </div>
    </div>
  );
}

function Labels() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Labels">
      <Frame />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[1.2]">Draft a document...</p>
      </div>
    </div>
  );
}

function SkillCard() {
  return (
    <div className="bg-[#1d4b34] content-stretch flex flex-col items-start justify-center px-[12px] py-[6px] relative rounded-[24px] shrink-0" data-name="skill card">
      <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Labels />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative rounded-[4px] shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
          <p className="leading-[normal]"></p>
        </div>
      </div>
    </div>
  );
}

function Labels1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Labels">
      <Frame1 />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Create research reports...</p>
      </div>
    </div>
  );
}

function SkillCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center px-[12px] py-[6px] relative rounded-[24px] shrink-0" data-name="skill card">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Labels1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center py-[2px] relative rounded-[4px] shrink-0">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="iconography/saf-icon">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
          <p className="leading-[normal]"></p>
        </div>
      </div>
    </div>
  );
}

function Labels2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Labels">
      <Frame2 />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Analyze document sets...</p>
      </div>
    </div>
  );
}

function SkillCard2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center px-[12px] py-[6px] relative rounded-[24px] shrink-0" data-name="skill card">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <Labels2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[7px] items-start justify-center left-0 pt-[4px] top-0 w-[584px]">
      <SkillCard />
      <SkillCard1 />
      <SkillCard2 />
    </div>
  );
}

export default function Frame7() {
  return (
    <div className="relative size-full">
      <Frame6 />
      <Frame3 />
    </div>
  );
}