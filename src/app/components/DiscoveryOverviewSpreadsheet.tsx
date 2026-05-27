import { clsx } from "clsx";
import { FileText } from "lucide-react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { SpreadsheetRowDrawer } from "./SpreadsheetRowDrawer";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";

const COLUMN_HEADERS = ['File Name', 'Bates Range', 'Date Produced', 'Custodian', 'Source/Type', 'Status'];

export const SPREADSHEET_DATA = [
  ['Email_Batch_001.pst', 'P00001 - P00450', 'Oct 12, 2024', 'J. Smith', 'Email / Outlook', 'Reviewed'],
  ['Site_Plans_v2.pdf', 'P00451 - P00900', 'Oct 15, 2024', 'Eng. Dept', 'Blueprints / CAD', 'Processing'],
  ['Internal_Memos_2023.pdf', 'D00001 - D02000', 'Nov 01, 2024', 'Pacific Builders', 'Internal Memos', 'Flagged'],
  ['Daily_Logs_Foreman.pdf', 'D02001 - D03500', 'Nov 05, 2024', 'Site Foreman', 'Daily Logs (Handwritten)', 'Pending OCR'],
  ['Q3_Financials.xlsx', 'D03501 - D03800', 'Nov 08, 2024', 'Acct. Dept', 'Invoices / Ledgers', 'Ready'],
  ['Safety_Reports_2023.pdf', 'D03801 - D04000', 'Nov 12, 2024', 'Safety Officer', 'Incident Reports', 'Reviewed'],
  ['Subcontractor_Agreements.pdf', 'D04001 - D04250', 'Nov 15, 2024', 'Legal Dept', 'Contracts', 'Reviewed'],
  ['Concrete_Specs.pdf', 'D04251 - D04300', 'Nov 18, 2024', 'Eng. Dept', 'Technical Specs', 'Flagged'],
  ['Email_Batch_002.pst', 'P00901 - P01500', 'Nov 20, 2024', 'Sarah Jones', 'Email / Outlook', 'Processing'],
  ['Meeting_Minutes_2023.docx', 'D04301 - D04400', 'Nov 22, 2024', 'Admin', 'Meeting Notes', 'Ready'],
  ['Change_Orders_Log.xlsx', 'D04401 - D04450', 'Nov 25, 2024', 'Project Mgmt', 'Spreadsheets', 'Reviewed'],
  ['Site_Photos_Aug2023.zip', 'P01501 - P01600', 'Nov 28, 2024', 'Site Foreman', 'Images', 'Ready'],
  ['Inspection_Reports_City.pdf', 'D04451 - D04500', 'Dec 01, 2024', 'Compliance', 'Public Records', 'Reviewed'],
  ['Supplier_Invoices_Material.pdf', 'D04501 - D05000', 'Dec 05, 2024', 'Acct. Dept', 'Invoices', 'Processing'],
  ['Employee_Training_Logs.pdf', 'D05001 - D05100', 'Dec 08, 2024', 'HR', 'Training Records', 'Reviewed'],
  ['Zoning_Permits.pdf', 'D05101 - D05150', 'Dec 10, 2024', 'Legal Dept', 'Public Records', 'Reviewed'],
  ['Email_Batch_003.pst', 'P01601 - P02100', 'Dec 12, 2024', 'CEO', 'Email / Outlook', 'Flagged'],
  ['Project_Schedule_Baseline.mpp', 'D05151 - D05200', 'Dec 15, 2024', 'Project Mgmt', 'Schedules', 'Reviewed'],
  ['Equipment_Rental_Agreements.pdf', 'D05201 - D05250', 'Dec 18, 2024', 'Procurement', 'Contracts', 'Ready'],
  ['Soil_Testing_Reports.pdf', 'D05251 - D05300', 'Dec 20, 2024', 'Eng. Dept', 'Technical Reports', 'Reviewed'],
  ['Weather_Logs_2023.xlsx', 'D05301 - D05350', 'Dec 22, 2024', 'Site Foreman', 'Logs', 'Ready'],
  ['Purchase_Orders_Concrete.pdf', 'D05351 - D05400', 'Dec 24, 2024', 'Procurement', 'Financials', 'Flagged'],
  ['Weekly_Status_Reports.docx', 'D05401 - D05500', 'Dec 26, 2024', 'Project Mgmt', 'Reports', 'Reviewed'],
  ['Architect_Correspondence.msg', 'P02101 - P02200', 'Dec 28, 2024', 'Architect', 'Email / Outlook', 'Reviewed'],
  ['Punch_List_Items.xlsx', 'D05501 - D05550', 'Dec 30, 2024', 'Site Foreman', 'Spreadsheets', 'Processing'],
  ['Warranty_Documents.pdf', 'D05551 - D05600', 'Jan 02, 2025', 'Legal Dept', 'Contracts', 'Ready'],
  ['Insurance_Policies.pdf', 'D05601 - D05650', 'Jan 05, 2025', 'Risk Mgmt', 'Policies', 'Reviewed'],
  ['OSHA_Compliance_Docs.pdf', 'D05651 - D05700', 'Jan 08, 2025', 'Safety Officer', 'Compliance', 'Reviewed'],
  ['Utility_Locate_Tickets.pdf', 'D05701 - D05720', 'Jan 10, 2025', 'Site Foreman', 'Permits', 'Ready'],
  ['Survey_Maps.dwg', 'D05721 - D05750', 'Jan 12, 2025', 'Surveyor', 'Blueprints / CAD', 'Processing'],
  ['Payment_Applications.pdf', 'D05751 - D05800', 'Jan 15, 2025', 'Acct. Dept', 'Financials', 'Reviewed'],
  ['Final_Punch_List_Signed.pdf', 'D05801 - D05820', 'Jan 18, 2025', 'Project Mgmt', 'Sign-offs', 'Reviewed']
];

export const DiscoveryOverviewSpreadsheet = forwardRef((props, ref) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<{ data: Record<string, string>, number: number } | null>(null);
  const { setRowDrawerOpen } = useWorkspaceNavigation();

  console.log('DiscoveryOverviewSpreadsheet RENDERED');

  const handleCellClick = (rowIndex: number) => {
    console.log('Cell clicked!', rowIndex);
    const rowData: Record<string, string> = {};
    COLUMN_HEADERS.forEach((header, colIndex) => {
      rowData[header] = SPREADSHEET_DATA[rowIndex][colIndex];
    });
    setSelectedRow({ data: rowData, number: rowIndex + 1 });
    setDrawerOpen(true);
    setRowDrawerOpen(true);
    console.log('Drawer should be open now:', true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setRowDrawerOpen(false);
  };

  // Listen for navigation events from comments
  useEffect(() => {
    const handleNavigateToCell = (event: CustomEvent) => {
      const { document } = event.detail;
      const rowIndex = SPREADSHEET_DATA.findIndex(row => row[0] === document);
      if (rowIndex !== -1) {
        handleCellClick(rowIndex);
      }
    };

    window.addEventListener('navigateToSpreadsheetCell' as any, handleNavigateToCell);
    return () => {
      window.removeEventListener('navigateToSpreadsheetCell' as any, handleNavigateToCell);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    openDrawer: (rowIndex: number) => handleCellClick(rowIndex)
  }));

  return (
    <>
      <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans">
        {/* Spreadsheet Grid */}
        <div className="flex-1 overflow-auto">
          <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
              <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
              <div className="w-[300px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">File Name</div>
              <div className="w-[220px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Bates Range</div>
              <div className="w-[220px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Date Produced</div>
              <div className="w-[220px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Custodian</div>
              <div className="w-[220px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Source/Type</div>
              <div className="w-[220px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Status</div>
            </div>

            {/* Rows */}
            {SPREADSHEET_DATA.map((row, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "flex border-b border-[#E5E5E5] group",
                  drawerOpen && selectedRow?.number === idx + 1 && "bg-blue-50"
                )}
                onClick={() => handleCellClick(idx)}
              >
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 1}</div>
                {row.map((cell, cIdx) => (
                  <div 
                    key={cIdx} 
                    className={clsx(
                      "shrink-0 border-r border-[#E5E5E5] px-2 py-1 truncate cursor-pointer selection:bg-blue-100 flex items-center gap-2", 
                      cIdx === 0 ? "w-[300px]" : "w-[220px]",
                      drawerOpen && selectedRow?.number === idx + 1 ? "bg-blue-50" : "hover:bg-blue-50 group-hover:bg-blue-50"
                    )}
                  >
                    {cIdx === 0 && (
                      <FileText className="size-3.5 text-gray-400 shrink-0" />
                    )}
                    {cIdx === 5 ? (
                      <span className={clsx(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                        cell === 'Reviewed' ? "bg-green-100 text-green-800" :
                        cell === 'Processing' ? "bg-yellow-100 text-yellow-800" :
                        cell === 'Flagged' ? "bg-red-100 text-red-800" :
                        cell === 'Pending OCR' ? "bg-gray-100 text-gray-800" :
                        "bg-blue-100 text-blue-800"
                      )}>
                        {cell}
                      </span>
                    ) : cell}
                  </div>
                ))}
              </div>
            ))}

            {/* Empty Rows to fill space */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={`empty-${idx}`} className="flex border-b border-[#E5E5E5]">
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 33}</div>
                {Array.from({ length: 6 }).map((_, cIdx) => (
                  <div key={cIdx} className={clsx("shrink-0 border-r border-[#E5E5E5] px-2 py-1 hover:bg-blue-50 cursor-cell", cIdx === 0 ? "w-[300px]" : "w-[220px]")}></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Sheet Tabs */}
        <div className="bg-[#F5F5F5] border-t border-[#E5E5E5] px-1 flex gap-1 h-[32px] items-end">
          <div className="px-4 py-1 bg-white border-t border-x border-[#E5E5E5] text-sm font-medium rounded-t text-[#1D4B34] border-b border-white relative top-[1px]">Sheet1</div>
          <div className="px-4 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">Sheet2</div>
          <div className="px-2 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">+</div>
        </div>
      </div>

      {/* Row Detail Drawer */}
      <SpreadsheetRowDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        rowData={selectedRow?.data || null}
        columnHeaders={COLUMN_HEADERS}
        rowNumber={selectedRow?.number || 0}
      />
    </>
  );
});

DiscoveryOverviewSpreadsheet.displayName = 'DiscoveryOverviewSpreadsheet';