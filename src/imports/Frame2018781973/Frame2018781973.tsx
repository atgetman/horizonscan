function Label() {
  return <div className="h-[40px] shrink-0 w-[310px]" data-name="label" />;
}

function SafFlexgridColumnHeader() {
  return (
    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-column-header">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
      <Label />
    </div>
  );
}

function SafFlexgridCellContent() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[209px]" data-name="saf-flexgrid-cell-content">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[0px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden text-[14px] text-ellipsis">Merger</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <SafFlexgridCellContent />
    </div>
  );
}

function SafFlexgridColumnHeader1() {
  return (
    <div className="bg-[#f0f2f1] flex-[1_0_0] min-h-[40px] min-w-px relative" data-name="saf-flexgrid-column-header">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
          <Label1 />
        </div>
      </div>
    </div>
  );
}

function SafFlexgridCellContent1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="saf-flexgrid-cell-content">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[0px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden text-[14px] text-ellipsis">Acquisition</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <SafFlexgridCellContent1 />
    </div>
  );
}

function SafFlexgridColumnHeader2() {
  return (
    <div className="bg-[#f0f2f1] flex-[1_0_0] min-h-[40px] min-w-px relative" data-name="saf-flexgrid-column-header">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
          <Label2 />
        </div>
      </div>
    </div>
  );
}

function SafFlexgridCellContent2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="saf-flexgrid-cell-content">
      <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] overflow-hidden relative shrink-0 text-[#212223] text-[0px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.2] overflow-hidden text-[14px] text-ellipsis">Acquisition</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="label">
      <SafFlexgridCellContent2 />
    </div>
  );
}

function SafFlexgridColumnHeader3() {
  return (
    <div className="bg-[#f0f2f1] flex-[1_0_0] min-h-[40px] min-w-px relative" data-name="saf-flexgrid-column-header">
      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] relative size-full">
          <Label3 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <SafFlexgridColumnHeader />
      <SafFlexgridColumnHeader1 />
      <SafFlexgridColumnHeader2 />
      <SafFlexgridColumnHeader3 />
    </div>
  );
}

function DocReviewLinkRow() {
  return (
    <div className="content-stretch flex h-[50px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Shareholder vote</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2] min-w-px not-italic overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Usually required (both sides)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Generally not required</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	Target vote may be required`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocReviewLinkRow1() {
  return (
    <div className="content-stretch flex h-[50px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Liability transfer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2] min-w-px not-italic overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">All liabilities transfer by law</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">All liabilities remain with target</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	Selective assumption`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocReviewLinkRow2() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Appraisal rights</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	Yes`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2] min-w-px not-italic overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">No (voluntary sale)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Depends on state law</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocReviewLinkRow3() {
  return (
    <div className="content-stretch flex h-[50px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Contract assignment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2] min-w-px not-italic overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Automatic (by operation of law)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">No assignment needed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Requires consent/assignment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocReviewLinkRow4() {
  return (
    <div className="content-stretch flex h-[67px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Tax treatment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Can be tax-free if structured properly</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Taxable to selling shareholders (unless § 368 reorganization)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Taxable; but buyer gets stepped-up basis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocReviewLinkRow5() {
  return (
    <div className="content-stretch flex h-[50px] items-center relative shrink-0 w-full" data-name="Doc Review: Link row">
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-white h-full min-h-[40px] relative shrink-0 w-[161px]" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">Complexity</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	Moderate`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	Low to moderate`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative" data-name="saf-flexgrid-cells-m-xxxl">
          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] relative size-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px relative" data-name="saf-flexgrid-cell-content">
              <p className="flex-[1_0_0] font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2] min-w-px not-italic overflow-hidden relative text-[#404040] text-[14px] text-ellipsis">{`	High (asset-by-asset transfer)`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rows() {
  return (
    <div className="relative shrink-0 w-full" data-name="Rows">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Frame />
        <DocReviewLinkRow />
        <DocReviewLinkRow1 />
        <DocReviewLinkRow2 />
        <DocReviewLinkRow3 />
        <DocReviewLinkRow4 />
        <DocReviewLinkRow5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full">
      <Rows />
    </div>
  );
}