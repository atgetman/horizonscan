import { Filter, FilePlus, Table2, WrapText, Minus, Sparkles, MessageSquareText, Clock, Bell, Check, X, Save } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useMonitoring } from "../contexts/MonitoringContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface SpreadsheetToolbarProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  isCommentsOpen?: boolean;
  onToggleComments?: () => void;
  isHistoryOpen?: boolean;
  onToggleHistory?: () => void;
}

export function SpreadsheetToolbar({ isChatOpen, onToggleChat, isCommentsOpen = false, onToggleComments, isHistoryOpen = false, onToggleHistory }: SpreadsheetToolbarProps) {
    const { savedAlerts, addAlert } = useMonitoring();
    const regulatoryAlert = savedAlerts.find(a => a.sourceType === 'regulatory-table');
    const alertSaved = Boolean(regulatoryAlert);
    const [textWrap, setTextWrap] = useState<"truncate" | "wrap">("truncate");
    const [showFrequencyMenu, setShowFrequencyMenu] = useState(false);
    const [selectedFrequency, setSelectedFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSaveAlert = () => {
        // Create the alert (shared across surfaces via MonitoringContext)
        addAlert({
            topic: 'M&A Regulatory Updates - Project Atlas',
            criteria: 'Monitor regulatory changes affecting M&A transactions including antitrust guidelines, SPAC disclosure rules, CFIUS requirements, and other merger-related regulations',
            frequency: selectedFrequency,
            practiceAreas: ['Corporate', 'M&A'],
            jurisdictions: ['Federal', 'Multi-jurisdictional'],
            status: 'active',
            lastScan: 'Just now',
            nextScan: selectedFrequency === 'daily' ? 'Tomorrow' : selectedFrequency === 'weekly' ? '7 days' : '30 days',
            alertCount: 0,
            sourceType: 'regulatory-table'
        });

        setShowFrequencyMenu(false);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3000);
    };

    return (
        <div className="h-11 border-b border-[#E5E5E5] bg-[#FCFCFC] flex items-center justify-between px-3 gap-4">
        <div className="flex items-center gap-2">
            {/* All buttons aligned left */}
            <button className="h-7 px-2 flex items-center gap-1.5 bg-transparent rounded text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-[#F5F5F5] transition-colors">
                <FilePlus className="size-3.5" />
                Add file
            </button>
            
            {/* Separator */}
            <div className="h-4 w-px bg-[#D2D2D2]" />
            
            <button className="h-7 px-2 flex items-center gap-1.5 bg-transparent rounded text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-[#F5F5F5] transition-colors">
                <Table2 className="size-3.5" />
                Columns
            </button>
            
            {/* Separator */}
            <div className="h-4 w-px bg-[#D2D2D2]" />
            
            <button className="h-7 px-2 flex items-center gap-1.5 bg-transparent rounded text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-[#F5F5F5] transition-colors">
                <Filter className="size-3.5" />
                Filter
            </button>

            {/* Divider */}
            <div className="h-4 w-px bg-[#D2D2D2]" />

            {/* Text Wrapping Toggle */}
            <ToggleGroup 
                type="single" 
                value={textWrap} 
                onValueChange={(value) => value && setTextWrap(value as "truncate" | "wrap")}
                className="border border-[#D2D2D2] p-[0px] ml-[4px] mr-[0px] my-[0px]"
            >
                <ToggleGroupItem value="truncate" aria-label="Truncate to single line" className="h-[26px] w-7 p-0 data-[state=on]:bg-white data-[state=off]:bg-[#F5F5F5]">
                    <Minus className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="wrap" aria-label="Wrap text" className="h-[26px] w-7 p-0 data-[state=on]:bg-white data-[state=off]:bg-[#F5F5F5]">
                    <WrapText className="size-3.5" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-1">
            <button 
                onClick={onToggleChat}
                className={clsx(
                    "flex items-center gap-2 rounded text-[13px] transition-colors px-[10px] py-[4px]", 
                    isChatOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
                )}
            >
                <Sparkles className="size-3.5" />
                <span>Assistant</span>
            </button>
            {onToggleComments && (
                <button 
                    onClick={onToggleComments}
                    className={clsx(
                        "flex items-center gap-2 rounded text-[13px] transition-colors px-[10px] py-[4px]", 
                        isCommentsOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
                    )}
                >
                    <MessageSquareText className="size-3.5" />
                    <span>Comments</span>
                </button>
            )}
            {onToggleHistory && (
                <button 
                    onClick={onToggleHistory}
                    className={clsx(
                        "flex items-center gap-2 rounded text-[13px] transition-colors px-[10px] py-[4px]", 
                        isHistoryOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
                    )}
                >
                    <Clock className="size-3.5" />
                    <span>History</span>
                </button>
            )}
            <div className="relative">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => !alertSaved && setShowFrequencyMenu(!showFrequencyMenu)}
                            disabled={alertSaved}
                            className={clsx(
                                "flex items-center gap-2 rounded text-[13px] transition-colors px-[10px] py-[4px]",
                                alertSaved ? "text-[#1d4b34] cursor-not-allowed" :
                                showFrequencyMenu ? "bg-[#edf2f0] text-[#1d4b34]" : "hover:bg-[#E5E5E5] text-[#212223]"
                            )}
                        >
                            {alertSaved ? <Check className="size-3.5" strokeWidth={2} /> : <Save className="size-3.5" strokeWidth={1.5} />}
                            <span>{alertSaved ? 'Alert saved' : 'Save as alert'}</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={4}>
                        Save as alert
                    </TooltipContent>
                </Tooltip>

                {showFrequencyMenu && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowFrequencyMenu(false)} />
                        <div className="absolute right-0 top-[calc(100%+4px)] bg-white rounded-[8px] z-50 min-w-[200px]">
                            <div className="flex flex-col items-start overflow-clip p-[12px] relative rounded-[inherit] gap-[12px]">
                                {/* Header */}
                                <div className="font-['Source_Sans_3'] font-semibold text-[15px] text-[#212223] text-left">
                                    Select frequency
                                </div>

                                {/* Radio options */}
                                <div className="flex flex-col gap-[12px] w-full">
                                    {/* Daily option */}
                                    <button
                                        onClick={() => setSelectedFrequency('daily')}
                                        className="flex gap-[8px] items-center relative shrink-0 w-full text-left"
                                    >
                                        <div className={`relative rounded-[88px] shrink-0 size-[16px] ${
                                            selectedFrequency === 'daily' ? 'bg-[#1d4b34]' : 'bg-white'
                                        }`}>
                                            <div className="flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                                                <div className="flex items-center justify-center relative shrink-0">
                                                    {selectedFrequency === 'daily' && (
                                                        <div className="size-[6px] bg-white rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[89px] ${
                                                selectedFrequency === 'daily' ? 'border-[#1d4b34]' : 'border-[#8a8a8a]'
                                            }`} />
                                        </div>
                                        <div className="font-['Source_Sans_3'] font-normal text-[#212223] text-[15px] leading-[1.5] text-left">
                                            Daily
                                        </div>
                                    </button>

                                    {/* Weekly option */}
                                    <button
                                        onClick={() => setSelectedFrequency('weekly')}
                                        className="flex gap-[8px] items-center relative shrink-0 w-full text-left"
                                    >
                                        <div className={`relative rounded-[88px] shrink-0 size-[16px] ${
                                            selectedFrequency === 'weekly' ? 'bg-[#1d4b34]' : 'bg-white'
                                        }`}>
                                            <div className="flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                                                <div className="flex items-center justify-center relative shrink-0">
                                                    {selectedFrequency === 'weekly' && (
                                                        <div className="size-[6px] bg-white rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[89px] ${
                                                selectedFrequency === 'weekly' ? 'border-[#1d4b34]' : 'border-[#8a8a8a]'
                                            }`} />
                                        </div>
                                        <div className="font-['Source_Sans_3'] font-normal text-[#212223] text-[15px] leading-[1.5] text-left">
                                            Weekly
                                        </div>
                                    </button>

                                    {/* Monthly option */}
                                    <button
                                        onClick={() => setSelectedFrequency('monthly')}
                                        className="flex gap-[8px] items-center relative shrink-0 w-full text-left"
                                    >
                                        <div className={`relative rounded-[88px] shrink-0 size-[16px] ${
                                            selectedFrequency === 'monthly' ? 'bg-[#1d4b34]' : 'bg-white'
                                        }`}>
                                            <div className="flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                                                <div className="flex items-center justify-center relative shrink-0">
                                                    {selectedFrequency === 'monthly' && (
                                                        <div className="size-[6px] bg-white rounded-full" />
                                                    )}
                                                </div>
                                            </div>
                                            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[89px] ${
                                                selectedFrequency === 'monthly' ? 'border-[#1d4b34]' : 'border-[#8a8a8a]'
                                            }`} />
                                        </div>
                                        <div className="font-['Source_Sans_3'] font-normal text-[#212223] text-[15px] leading-[1.5] text-left">
                                            Monthly
                                        </div>
                                    </button>
                                </div>

                                {/* Save alert button */}
                                <button
                                    onClick={handleSaveAlert}
                                    className="w-full h-[32px] px-[12px] py-[6px] flex items-center justify-center text-[14px] font-['Clario'] font-medium text-white bg-[#1d4b34] rounded-[4px] hover:bg-[#153a28] transition-colors"
                                >
                                    Save alert
                                </button>
                            </div>
                            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_4px_12px_4px_rgba(31,31,31,0.1)]" />
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* Bottom-right toast notification */}
        {showConfirmation && (
            <div className="fixed bottom-6 right-6 z-50">
                <div className="bg-white border border-[#d2d2d2] rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 min-w-[320px] relative">
                    <div className="flex items-center justify-center size-8 bg-[#eaffe5] rounded-full shrink-0 relative">
                        <div className="absolute border-2 border-[#bce0a2] rounded-full inset-0 pointer-events-none" />
                        <Check className="size-4 text-[#387c2b] stroke-[2.5]" />
                    </div>
                    <div className="flex-1">
                        <p className="font-['Clario'] font-medium text-[15px] text-[#212223]">
                            Alert saved
                        </p>
                        <p className="font-['Source_Sans_3'] text-[13px] text-[#666]">
                            You'll receive {selectedFrequency} alerts when this data changes.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowConfirmation(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </div>
        )}
        </div>
    );
}
