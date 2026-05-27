function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pt-[3px] relative shrink-0 w-[16px]">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#404040] text-[15px] text-center w-full">
        <p className="leading-[normal]"></p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[50.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#666] text-[11px] top-[0.5px] tracking-[0.0645px] whitespace-nowrap">18 of 200 files</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[211px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return <div className="bg-[#1d4b34] h-[6px] rounded-[16777200px] shrink-0 w-[28.984px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="bg-[#e5e5e5] h-[6px] relative rounded-[16777200px] shrink-0 w-[171px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[192.016px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Q() {
  return (
    <div className="content-stretch flex flex-col h-[29px] items-start relative shrink-0 w-[171px]" data-name="Q8">
      <Container1 />
      <Container2 />
    </div>
  );
}

function SlotClone() {
  return (
    <div className="bg-[rgba(250,250,250,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border border-[#9f9f9f] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pb-[12px] pt-[8px] px-[18px] relative w-full">
          <Frame />
          <Q />
        </div>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-gradient-to-t content-stretch flex flex-col from-[rgba(214,64,0,0.06)] items-start px-[16px] py-[12px] relative size-full to-[rgba(0,0,0,0)]" data-name="Container">
      <SlotClone />
    </div>
  );
}