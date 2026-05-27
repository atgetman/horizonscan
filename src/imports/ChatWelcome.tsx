function Frame9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center not-italic relative shrink-0">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] relative shrink-0 text-[#de6633] text-[14px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] whitespace-nowrap">
        <p className="leading-[normal]"></p>
      </div>
      <p className="font-['Clario:Medium',sans-serif] leading-[1.2] relative shrink-0 text-[#666] text-[20px]">State v. Marcus T. Reynolds</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 text-center">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] h-[42px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[28px] w-[712px]">
        <p className="leading-[1.2] whitespace-pre-wrap">Let's take some work off your plate</p>
      </div>
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[16px] w-[712px] whitespace-pre-wrap">{`Add files to your workspace and reference them with natural language. `}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Draft a legal document...</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Ask a research question...</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 size-[32px]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap"></p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">Analyze document sets...</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full">
      <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <Frame5 />
        <Frame />
      </div>
      <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <Frame6 />
        <Frame2 />
      </div>
      <div className="bg-white content-stretch flex gap-[8px] items-center p-[10px] relative rounded-[12px] shrink-0 w-[226px]" data-name="Suggestion">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <Frame7 />
        <Frame8 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

export default function ChatWelcome() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center justify-center pt-[72px] relative size-full" data-name="Chat welcome">
      <Frame3 />
      <Frame4 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#666] text-[14px] text-center underline w-[min-content] whitespace-pre-wrap">Browse all prompts</p>
    </div>
  );
}