function Label() {
  return (
    <div className="content-stretch flex items-end overflow-clip relative shrink-0 w-full" data-name="label">
      <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px relative text-[#212223] text-[14px]">
        <p className="leading-[1.35]">Document_name.doc</p>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="bg-[#387c2b] content-stretch flex flex-col h-[4px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="progress-bar">
      <div className="bg-[#387c2b] flex-[1_0_0] min-h-px opacity-0 w-full" data-name="vector-progress-bar" />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="main-content">
      <Label />
      <div className="bg-[#ededed] content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-full" data-name="saf-progress-bar">
        <ProgressBar />
      </div>
    </div>
  );
}

export default function SafProgress() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="saf-progress">
      <MainContent />
    </div>
  );
}