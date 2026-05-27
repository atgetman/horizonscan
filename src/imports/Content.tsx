function Frame18() {
  return (
    <div className="content-stretch flex items-center pl-[6px] pt-[2px] relative shrink-0">
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
            <p className="leading-[normal]">circle-info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#314b3e] text-[28px] whitespace-nowrap">
        <p className="leading-[1.1]">Library</p>
      </div>
      <Frame18 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Frame22 />
    </div>
  );
}

function HeaderHelperText() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[16px] relative shrink-0 w-[1206px]" data-name="Header + helper text">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function FirstSlot() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="first slot">
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="saf-tab">
        <div aria-hidden="true" className="absolute border-[#314b3e] border-b-3 border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
        <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#212223] text-[14px] text-center whitespace-nowrap">Prompts</p>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="tabs">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <FirstSlot />
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="saf-tab">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
        <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#666] text-[14px] text-center whitespace-nowrap">Question sets</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="saf-tab">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
        <p className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold leading-[1.35] relative shrink-0 text-[#666] text-[14px] text-center whitespace-nowrap">Documents</p>
      </div>
    </div>
  );
}

function SafTabs() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-[1160px]" data-name="saf-tabs">
      <Tabs />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full">
      <SafTabs />
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="text-input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#666] text-[16px]">
            <p className="leading-[1.35]">Search prompts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="bg-white content-stretch flex items-center relative rounded-[4px] shrink-0 w-full" data-name="field">
      <TextInput />
      <div className="content-stretch flex items-center justify-center relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[32px]" data-name="saf-button-embedded-icon">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
            <p className="leading-[normal]">magnifying-glass</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 w-[360px]" data-name="saf-search-field">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Field />
      </div>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
          <p className="leading-[normal]">plus</p>
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">New prompt</p>
      </div>
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
          <p className="leading-[normal]">filter</p>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon1 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Filter</p>
      </div>
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="left-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
          <p className="leading-[normal]">arrow-up-arrow-down</p>
        </div>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <LeftIcon2 />
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Sort</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents />
      </div>
      <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents1 />
      </div>
      <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents2 />
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="relative shrink-0 w-full" data-name="filter bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[4px] relative w-full">
          <Frame19 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">
        <p className="leading-[1.35]">Beta</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">AI Jurisdiction Surveys</p>
      </div>
      <div className="bg-[#ededed] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="saf-badge-status">
        <div aria-hidden="true" className="absolute border-0 border-[#404040] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <Label />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Get a survey of the law across jurisdictions based on a legal research question</p>
    </div>
  );
}

function Metadata() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody />
      <Metadata />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Agreement Clause Drafting</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame1 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading1 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Create a specific clause for a given agreement type</p>
    </div>
  );
}

function Metadata1() {
  return <div className="content-stretch flex gap-[8px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody1 />
      <Metadata1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">
        <p className="leading-[1.35]">New</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">AI-Assisted Research US</p>
      </div>
      <div className="bg-[#ededed] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="saf-badge-status">
        <div aria-hidden="true" className="absolute border-0 border-[#404040] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <Label1 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame2 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading2 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">{`Get relevant answers to legal research questions with links to Westlaw authority `}</p>
    </div>
  );
}

function Metadata2() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody2 />
      <Metadata2 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content2 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content3 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Allegation Summary Email</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame3 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading3 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Compose email explaining allegations and defense steps to client</p>
    </div>
  );
}

function Metadata3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#6e8178] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody3 />
      <Metadata3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Amendment Term Analysis</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame4 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading4 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Understand contract terms relating to amending and modifying an agreement</p>
    </div>
  );
}

function Metadata4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#6e8178] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody4 />
      <Metadata4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Argument and Counterargument Table</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame5 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading5 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Visualize arguments and corresponding counterarguments</p>
    </div>
  );
}

function Metadata5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#6e8178] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody5 />
      <Metadata5 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content5 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content6 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Argument Outline</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame6 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading6 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Breakdown all arguments made within the provided documents</p>
    </div>
  );
}

function Metadata6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#6e8178] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody6 />
      <Metadata6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Authority Analysis Table</p>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame7 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading7 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Create a list of case law, statuses, and other precedent cited in a litigation document</p>
    </div>
  );
}

function Metadata7() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody7 />
      <Metadata7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Bulk Opinion Summary</p>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame8 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading8 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Summarize court holdings and their effects on cases</p>
    </div>
  );
}

function Metadata8() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody8 />
      <Metadata8 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content8 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content9 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Claim Identification and Analysis</p>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame9 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading9 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Determine claims against defendants and outline supporting facts</p>
    </div>
  );
}

function Metadata9() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody9 />
      <Metadata9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Claim Summary</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame10 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading10 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Create a formatted summary of a pleading’s claims</p>
    </div>
  );
}

function Metadata10() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody10 />
      <Metadata10 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">
        <p className="leading-[1.35]">New</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Claims Explorer</p>
      </div>
      <div className="bg-[#ededed] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="saf-badge-status">
        <div aria-hidden="true" className="absolute border-0 border-[#404040] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <Label2 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame11 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading11 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Find potential claims for your fact pattern and highlight specific statutory, common law, and constitutional causes of action</p>
    </div>
  );
}

function Metadata11() {
  return <div className="content-stretch flex gap-[4px] items-center justify-end shrink-0 w-full" data-name="metadata" />;
}

function Content13() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody11 />
      <Metadata11 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content11 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content12 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[12px] whitespace-nowrap">
        <p className="leading-[1.35]">Beta</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Compare Documents</p>
      </div>
      <div className="bg-[#ededed] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="saf-badge-status">
        <div aria-hidden="true" className="absolute border-0 border-[#404040] border-solid inset-0 pointer-events-none rounded-[16px]" />
        <Label3 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame12 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading12 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Compare documents side-by-side to identify differences.</p>
    </div>
  );
}

function Metadata12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody12 />
      <Metadata12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Compare Opinions</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame13 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading13 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Compare substantive analysis in court opinions</p>
    </div>
  );
}

function Metadata13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody13 />
      <Metadata13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Contract Provision Analysis</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame14 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading14 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Identify and group provisions or clause by topic</p>
    </div>
  );
}

function Metadata14() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody14 />
      <Metadata14 />
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content14 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content15 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content16 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Clario:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap">Contract Provision Comparison</p>
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame15 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading15 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">{`Identify substantive differences in contract provisions `}</p>
    </div>
  );
}

function Metadata15() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody15 />
      <Metadata15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Clario:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap">Contract Requirement Analysis</p>
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame16 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading16 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Describe contractual requirements by clause or topic</p>
    </div>
  );
}

function Metadata16() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody16 />
      <Metadata16 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Clario:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[16px] whitespace-nowrap">Court Decision Summary Letter</p>
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="heading">
      <Frame17 />
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic opacity-0 relative text-[16px] text-black text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadingBody17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="heading+body">
      <Heading17 />
      <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] overflow-hidden relative shrink-0 text-[#666] text-[14px] text-ellipsis w-full">Compose letter to client explaining court’s decision and impact on case</p>
    </div>
  );
}

function Metadata17() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="metadata">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]"></p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">trash-can</p>
          </div>
        </div>
      </div>
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-px" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-px overflow-clip relative w-[24px]" data-name="saf-divider">
            <div className="absolute bg-[#d2d2d2] h-px left-0 right-0 top-0" data-name="divider-vector" />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">star</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[94px] items-start relative shrink-0 w-full" data-name="content">
      <HeadingBody17 />
      <Metadata17 />
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Row">
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content17 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content18 />
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] max-h-[300px] min-h-px min-w-[280px] relative rounded-[8px]" data-name="coco-library-card">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex flex-col items-start max-h-[inherit] min-w-[inherit] p-[16px] relative w-full">
          <Content19 />
        </div>
      </div>
    </div>
  );
}

function PromptCardExample() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="prompt-card-example">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center pt-[24px] px-[24px] relative size-full">
          <Row />
          <Row1 />
          <Row2 />
          <Row3 />
          <Row4 />
          <Row5 />
          <div className="absolute content-stretch flex h-[222px] items-start max-w-[960px] pb-[100px] pt-[14px] px-[4px] right-0 top-0" data-name="scrollbar">
            <div className="bg-[#212223] h-full opacity-50 rounded-[4px] shrink-0 w-[6px]" data-name="scrollbar-slider" />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="body">
      <FilterBar />
      <PromptCardExample />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[686px] items-center min-h-px min-w-px relative">
      <Body />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="content">
      <Frame20 />
    </div>
  );
}

function DrawerContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-[1206px]" data-name="drawer-content">
      <Content1 />
    </div>
  );
}

export default function Content() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center px-[24px] relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] size-full" data-name="content">
      <HeaderHelperText />
      <Frame23 />
      <DrawerContent />
    </div>
  );
}