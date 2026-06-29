import { clsx } from "clsx";
import { FileText } from "lucide-react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { SpreadsheetRowDrawer } from "./SpreadsheetRowDrawer";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";

const COLUMN_HEADERS = ['Vendor', 'Data Category', 'Transfer Region', 'Lawful Basis', 'Risk Level', 'Status'];

export const SPREADSHEET_DATA = [
  ['Cloudspan Inc.', 'EU Customer PII', 'US East / US West', 'SCCs (incomplete)', 'High', 'Remediation'],
  ['Beacon Analytics', 'Account Identifiers', 'United States', 'Legitimate Interests', 'High', 'Flagged'],
  ['Northwind Hosting', 'Backup Storage', 'United States', 'SCCs', 'Medium', 'Reviewed'],
  ['Helix Payments', 'Payment Data', 'EU (Ireland)', 'Contract Necessity', 'Medium', 'Reviewed'],
  ['Lumen Support', 'Support Tickets', 'United States', 'SCCs', 'Medium', 'Processing'],
  ['Atlas CRM', 'Contact Records', 'EU (Germany)', 'Contract Necessity', 'Low', 'Reviewed'],
  ['Verity Identity', 'KYC Documents', 'United States', 'Legal Obligation', 'High', 'Flagged'],
  ['Cobalt Mail', 'Email Metadata', 'United States', 'Legitimate Interests', 'Medium', 'Pending DPA'],
  ['Sentinel Logs', 'Security Logs', 'EU (Netherlands)', 'Legitimate Interests', 'Low', 'Reviewed'],
  ['Pulse Marketing', 'Marketing Lists', 'United States', 'Consent', 'Medium', 'Ready'],
  ['Ledger360', 'Financial Records', 'United States', 'Legal Obligation', 'Medium', 'Reviewed'],
  ['Orbit Storage', 'Document Archive', 'EU (France)', 'SCCs', 'Low', 'Ready'],
  ['Meridian HR Cloud', 'Employee PII', 'US East', 'SCCs (pending)', 'High', 'Remediation'],
  ['Quanta Insights', 'Usage Telemetry', 'United States', 'Legitimate Interests', 'Medium', 'Processing'],
  ['Cypress Training', 'Training Records', 'EU (Spain)', 'Contract Necessity', 'Low', 'Reviewed'],
  ['Harbor Legal', 'Diligence Files', 'United States', 'Legitimate Interests', 'Medium', 'Reviewed'],
  ['Vantage BI', 'Aggregated Metrics', 'United States', 'Legitimate Interests', 'Low', 'Flagged'],
  ['Solstice Backup', 'Disaster Recovery', 'EU (Ireland)', 'SCCs', 'Low', 'Reviewed'],
  ['Apex Procurement', 'Supplier Records', 'United States', 'Contract Necessity', 'Low', 'Ready'],
  ['Tessera AI', 'Model Training Data', 'United States', 'Legitimate Interests', 'High', 'Flagged'],
  ['Nimbus Notify', 'Notification Logs', 'EU (Germany)', 'Contract Necessity', 'Low', 'Ready'],
  ['Granite Vault', 'Encryption Keys', 'United States', 'Contract Necessity', 'Medium', 'Reviewed'],
  ['Bridge Surveys', 'Survey Responses', 'United States', 'Consent', 'Low', 'Reviewed'],
  ['Echo Transcripts', 'Call Recordings', 'United States', 'Consent', 'High', 'Processing'],
  ['Forge Identity', 'Auth Tokens', 'EU (Netherlands)', 'Contract Necessity', 'Medium', 'Reviewed'],
  ['Cardinal Docs', 'Contract Repository', 'United States', 'Legitimate Interests', 'Low', 'Ready'],
  ['Aster Risk', 'Risk Scores', 'United States', 'Legitimate Interests', 'Medium', 'Reviewed'],
  ['Bluepeak Email', 'Marketing Email', 'United States', 'Consent', 'Medium', 'Reviewed'],
  ['Ironwood Cloud', 'Compute Logs', 'EU (France)', 'Legitimate Interests', 'Low', 'Ready'],
  ['Polaris Maps', 'Geolocation Data', 'United States', 'Consent', 'High', 'Processing'],
  ['Summit Billing', 'Invoice Data', 'United States', 'Legal Obligation', 'Medium', 'Reviewed'],
  ['Cedar Archive', 'Long-Term Records', 'EU (Ireland)', 'Legal Obligation', 'Low', 'Reviewed']
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
