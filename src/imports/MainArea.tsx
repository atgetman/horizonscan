import svgPaths from "./svg-q8dafyrzch";

function Frame() {
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

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#314b3e] text-[28px] whitespace-nowrap">
        <p className="leading-[1.1]">Projects</p>
      </div>
      <Frame />
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
        <p className="leading-[1.2]">New project</p>
      </div>
    </div>
  );
}

function PageTitleAndControls() {
  return (
    <div className="content-stretch flex h-[32px] items-start justify-between relative shrink-0 w-full" data-name="page-title-and-controls">
      <Frame8 />
      <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="coco3-button">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <Contents />
      </div>
    </div>
  );
}

function CocoPageHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="coco-page-header">
      <PageTitleAndControls />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="input">
      <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#666] text-[16px]">
        <p className="leading-[1.35]">Search projects</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="text-input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] py-[4px] relative size-full">
          <Input />
        </div>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="bg-white content-stretch flex items-center relative rounded-[4px] shrink-0 w-[360px]" data-name="field">
      <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <TextInput />
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="saf-button-embedded-icon">
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.01)] border-l border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=true">
          <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[16px] text-center w-full">
            <p className="leading-[normal]">magnifying-glass</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="right-icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="arrow/chevron-down*">
        <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[14px] text-center w-full">
          <p className="leading-[normal]">chevron-down</p>
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="contents">
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[0px] whitespace-nowrap">
        <p className="text-[14px]">
          <span className="font-['Clario:Regular',sans-serif] leading-[1.2] not-italic">Sort by:</span>
          <span className="leading-[1.2]">{` `}</span>
          <span className="leading-[1.2]">Recent</span>
        </p>
      </div>
      <RightIcon />
    </div>
  );
}

function SafButton() {
  return (
    <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0" data-name="saf-button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
      <Contents1 />
    </div>
  );
}

function SearchBarDiv() {
  return (
    <div className="content-stretch flex h-[32px] items-start justify-between relative shrink-0 w-[800px]" data-name="search-bar-div">
      <div className="content-stretch flex flex-col items-start relative rounded-[4px] shrink-0" data-name="saf-search-field-compact">
        <Field />
      </div>
      <SafButton />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Hernandez v. Pacific Builders Inc.</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">In re: Blue Ridge Trust 2025</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="row-3">
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame1 />
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">Employee sues for unpaid overtime wages under labor law violations.</p>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame2 />
          <div className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">
            <p className="mb-0">Dispute over trustee mismanagement of $2M real estate trust.</p>
            <p>&nbsp;</p>
          </div>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">State v. Marcus T. Reynolds</p>
      </div>
    </div>
  );
}

function ActionsContainer() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[336px] top-[-3px]" data-name="actions container">
      <div className="content-stretch flex items-start relative shrink-0" data-name="LRE saf-button-icon - email">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0" data-name="saf-button-icon">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]" data-name="filled=false">
            <div className="flex flex-[1_0_0] flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[14px] text-center w-full">
              <p className="leading-[normal]"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[15px]">
        <p className="leading-[1.2]">{`{North Star use case}`}</p>
      </div>
      <ActionsContainer />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="row-1">
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame3 />
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">Prosecution for insider trading in pharmaceutical company stock.</p>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="bg-[#f5f7f6] relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame4 />
          <div className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">
            <p className="mb-0">{`{Description for M&A / transactional use case}`}</p>
            <p>&nbsp;</p>
          </div>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Rivera Compliance Review</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Doe v. Apex Corp.</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="row-2">
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame5 />
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">EPA compliance review for chemical plant emissions violations.</p>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame6 />
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">Class action for data breach exposing customer personal information.</p>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center relative shrink-0 size-[16px] text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]">folder</p>
      </div>
      <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
        <p className="leading-[1.2]">Matter of Green Estates</p>
      </div>
    </div>
  );
}

function Pointing() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.309px] left-[calc(50%+0.56px)] top-[calc(50%+0.04px)] w-[14.396px]" data-name="pointing">
      <div className="absolute inset-[-2.45%_-8.16%_-14.21%_-8.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7461 17.8588">
          <g filter="url(#filter0_d_1104_17252)" id="pointing">
            <path d={svgPaths.p4154640} fill="var(--fill-0, white)" id="Shape" />
            <path clipRule="evenodd" d={svgPaths.p4154640} fillRule="evenodd" id="Shape_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d={svgPaths.p3cd716c0} fill="var(--fill-0, black)" id="Shape_3" />
            <path d={svgPaths.p3fa35500} fill="var(--fill-0, black)" id="Shape_4" />
            <path d={svgPaths.p1b2ab280} fill="var(--fill-0, black)" id="Shape_5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="17.8588" id="filter0_d_1104_17252" width="16.7461" x="2.98023e-08" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1104_17252" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1104_17252" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ProjectCards() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="project-cards">
      <Row2 />
      <Row />
      <Row1 />
      <div className="bg-white relative rounded-[8px] shrink-0 w-[392px]" data-name="project-cards">
        <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip pb-[12px] pt-[16px] px-[16px] relative rounded-[inherit] w-full">
          <Frame7 />
          <div className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#404040] text-[14px] w-full">
            <p className="mb-0">Contested will involving division of $5M family estate assets.</p>
            <p>&nbsp;</p>
          </div>
          <p className="font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.35] relative shrink-0 text-[#666] text-[14px] w-full">2 days ago</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="absolute left-[580px] overflow-clip size-[24px] top-[211px]" data-name="cursors">
        <Pointing />
      </div>
    </div>
  );
}

function PageWidth() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[800px] relative shrink-0 w-full" data-name="page-width">
      <CocoPageHeader />
      <SearchBarDiv />
      <ProjectCards />
    </div>
  );
}

export default function MainArea() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center pt-[40px] px-[24px] relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)] size-full" data-name="main-area">
      <PageWidth />
    </div>
  );
}