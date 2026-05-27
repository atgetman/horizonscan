import { Bell, Plus } from 'lucide-react';
import { useState } from 'react';
import { MonitoringSetupModal } from './MonitoringSetupModal';
import { Monitor } from './MonitoringCard';

interface ConvertToMonitorButtonProps {
  chatTopic?: string;
  chatContext?: string;
  onMonitorCreated?: (monitor: Partial<Monitor>) => void;
}

export function ConvertToMonitorButton({
  chatTopic,
  chatContext,
  onMonitorCreated,
}: ConvertToMonitorButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveMonitor = (monitor: Partial<Monitor>) => {
    // Save the monitor
    console.log('Monitor created from chat:', monitor);
    onMonitorCreated?.(monitor);
    setIsModalOpen(false);

    // Show success toast
    // TODO: Integrate with toast system
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#1d4b34] content-stretch flex items-start justify-center relative rounded-[4px] hover:bg-[#123021] transition-colors group"
      >
        <div aria-hidden="true" className="absolute border border-[#1d4b34] group-hover:border-[#123021] border-solid inset-[-1px] pointer-events-none rounded-[5px] transition-colors" />
        <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          <Bell className="w-4 h-4 text-[#fcfcfc] group-hover:text-[#f7f7f7]" />
          <div className="[word-break:break-word] flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] group-hover:text-[#f7f7f7] text-[15px] whitespace-nowrap">
            <p className="leading-[1.35]">Monitor this topic</p>
          </div>
        </div>
      </button>

      <MonitoringSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMonitor}
        editingMonitor={
          chatTopic
            ? {
                id: '',
                topic: chatTopic,
                criteria: chatContext || '',
                frequency: 'weekly',
                practiceAreas: [],
                status: 'active',
                alertCount: 0,
                createdDate: new Date().toISOString(),
              }
            : null
        }
      />
    </>
  );
}