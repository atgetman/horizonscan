import svgPaths from "./svg-of7t7y3tik";

function ChatMessage() {
  return (
    <div className="bg-[#f0f2f1] relative rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] shrink-0 w-full" data-name="Chat message">
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[12px] py-[8px] relative size-full">
        <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[#212223] text-[15px] text-ellipsis w-full">Explain the key differences between a merger and an acquisition, including the legal implications for shareholders, regulatory requirements, and common deal structures. Use headings, bullet points, and bold text to organize your answer. Just give a response in plain text I dont need you to plan anything to create any documents</p>
      </div>
    </div>
  );
}

function UserMessage() {
  return (
    <div className="relative shrink-0 w-full" data-name="User message">
      <div className="content-stretch flex flex-col items-start pl-[48px] relative size-full">
        <ChatMessage />
      </div>
    </div>
  );
}

function Skill() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[3]" data-name="skill">
      <div className="relative shrink-0 size-[20px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector">
            <path d={svgPaths.p37580740} fill="#D64000" />
            <path d={svgPaths.p20148880} fill="#D64000" />
            <path d={svgPaths.p3c433c00} fill="#D64000" />
            <path d={svgPaths.pea82d00} fill="#D64000" />
            <path d={svgPaths.p38cb7f00} fill="#D64000" />
            <path d={svgPaths.p154c6e00} fill="#D64000" />
            <path d={svgPaths.p16b47400} fill="#D64000" />
            <path d={svgPaths.p10dd9f00} fill="#D64000" />
            <path d={svgPaths.p287133f0} fill="#D64000" />
            <path d={svgPaths.p5e1d900} fill="#D64000" />
            <path d={svgPaths.pd01f8c0} fill="#D64000" />
            <path d={svgPaths.p3aa1ff80} fill="#D64000" />
            <path d={svgPaths.pb176790} fill="#D64000" />
            <path d={svgPaths.p1dc50600} fill="#D64000" />
            <path d={svgPaths.p304ab800} fill="#D64000" />
            <path d={svgPaths.pfe8800} fill="#D64000" />
            <path d={svgPaths.p6131b80} fill="#D64000" />
            <path d={svgPaths.p924cb00} fill="#D64000" />
            <path d={svgPaths.p131ab400} fill="#D64000" />
            <path d={svgPaths.pa197b00} fill="#D64000" />
            <path d={svgPaths.p3bc9d900} fill="#D64000" />
            <path d={svgPaths.p194d1c80} fill="#D64000" />
            <path d={svgPaths.pa4ca400} fill="#D64000" />
            <path d={svgPaths.p3d0aa680} fill="#D64000" />
            <path d={svgPaths.p115b9f80} fill="#D64000" />
            <path d={svgPaths.p12ebfd00} fill="#D64000" />
            <path d={svgPaths.p15c7d400} fill="#D64000" />
            <path d={svgPaths.p4d2e200} fill="#D64000" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#8a8a8a] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.35] overflow-hidden text-ellipsis">CoCounsel - 9:07 AM</p>
      </div>
    </div>
  );
}

function CoCoMessages() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] isolate items-start max-w-[700px] relative shrink-0 w-full" data-name="CoCo messages">
      <Skill />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px not-italic relative" data-name="text">
      <div className="flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] min-w-full relative shrink-0 text-[#212223] text-[15px] w-[min-content]">
        <p className="leading-[1.5]">{`I'd be happy to help draft a breach of fiduciary duty complaint for your client. To get started, I need to gather some key information. Let me ask a few questions:`}</p>
      </div>
      <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0">
        <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] relative shrink-0 text-[#de6633] text-[16px] text-center text-shadow-[0px_4px_33px_rgba(247,93,27,0.4)] w-[20px]">{`\uE5D6`}</p>
        <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['Clario:Regular',sans-serif] from-[#ededed] justify-center leading-[0] relative shrink-0 text-[15px] text-[transparent] to-[#e2e2e2] to-[58.173%] via-[#c3c3c3] via-[20.673%] whitespace-nowrap">
          <p className="leading-[1.5]">Working on it...</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[700px]">
      <Text />
    </div>
  );
}

export default function ChatThreadContent() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative size-full" data-name="Chat thread content">
      <UserMessage />
      <CoCoMessages />
      <Frame />
    </div>
  );
}