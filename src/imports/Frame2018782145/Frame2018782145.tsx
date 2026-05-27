function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
        <p className="leading-[1.35]">{`{Or drag file here to attach.}`}</p>
      </div>
    </div>
  );
}

function SafFileUploadDropArea() {
  return (
    <div className="bg-white h-[96px] relative rounded-[8px] shrink-0 w-full" data-name="saf-file-upload-drop-area">
      <div aria-hidden="true" className="absolute border-2 border-[#8a8a8a] border-dashed inset-[-2px] pointer-events-none rounded-[10px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-center p-[12px] relative size-full">
          <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#404040] text-[16px] text-center whitespace-nowrap">
            <p className="leading-[normal]">{`\uF319`}</p>
          </div>
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start py-[12px] relative size-full">
      <SafFileUploadDropArea />
    </div>
  );
}