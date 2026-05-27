function Actions() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="actions">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="cc-anchor">
        <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0062c4] text-[15px] whitespace-nowrap">
          <p className="[text-decoration-skip-ink:none] decoration-solid leading-[1.5] underline">Optional link here</p>
        </div>
      </div>
    </div>
  );
}

function Message() {
  return (
    <div className="content-start flex flex-[1_0_0] flex-wrap gap-[16px] items-start min-w-[100px] py-[8px] relative" data-name="message">
      <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-w-[100px] relative text-[#212223] text-[16px]">Replace this message with your own notification message.</p>
      <Actions />
    </div>
  );
}

export default function Toast() {
  return (
    <div className="bg-[#fff8e5] content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative rounded-[4px] size-full" data-name="toast">
      <div aria-hidden="true" className="absolute border border-[#ab3300] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col items-center justify-center pt-[12px] relative shrink-0" data-name="link/alert-triangle">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#ab3300] text-[16px] text-center">
          <p className="leading-[normal]">triangle-exclamation</p>
        </div>
      </div>
      <Message />
      <div className="bg-[rgba(252,252,252,0.01)] content-stretch flex gap-[32px] items-center justify-center p-[12px] relative rounded-[4px] shrink-0" data-name="cc-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">xmark-large</p>
          </div>
        </div>
      </div>
    </div>
  );
}