function Message() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start min-w-[100px] py-[8px] relative shrink-0" data-name="message">
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-w-[100px] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">Your thread is renamed successfully.</p>
    </div>
  );
}

function Toast() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="toast">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="link/checkmark-circle">
        <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#387c2b] text-[15px] text-center">
          <p className="leading-[normal]">circle-check</p>
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

export default function ToastMsgs() {
  return (
    <div className="content-stretch flex flex-col items-end p-[48px] relative size-full" data-name="Toast msgs">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Sprint6 - cc-alert">
        <div className="content-stretch flex items-center justify-center min-w-[208px] relative shadow-[0px_4px_12px_0px_rgba(31,31,31,0.1)] shrink-0" data-name="cc-alert">
          <Toast />
        </div>
      </div>
    </div>
  );
}