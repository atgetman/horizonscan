import { useState } from 'react';
import { X } from 'lucide-react';
import { Monitor } from './MonitoringCard';
import { Toggle } from '../ui/SegmentedToggle';

interface MonitoringSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (monitor: Partial<Monitor>) => void;
  editingMonitor?: Monitor | null;
  availablePracticeAreas?: string[];
}

const FREQUENCY_OPTIONS = [
  { value: 'real-time', label: 'Real-time' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
] as const;

const JURISDICTION_OPTIONS = [
  'Federal',
  'New York',
  'California',
  'Texas',
  'Florida',
  'Illinois',
  'All US jurisdictions',
];

export function MonitoringSetupModal({
  isOpen,
  onClose,
  onSave,
  editingMonitor,
  availablePracticeAreas = ['Litigation', 'Corporate', 'IP', 'Employment', 'Real Estate']
}: MonitoringSetupModalProps) {
  const [topic, setTopic] = useState(editingMonitor?.topic || '');
  const [criteria, setCriteria] = useState(editingMonitor?.criteria || '');
  const [frequency, setFrequency] = useState<'real-time' | 'daily' | 'weekly'>(
    editingMonitor?.frequency || 'daily'
  );
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>(
    editingMonitor?.practiceAreas || []
  );
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(
    editingMonitor?.jurisdictions || []
  );

  const handleSave = () => {
    const monitor: Partial<Monitor> = {
      id: editingMonitor?.id || `monitor-${Date.now()}`,
      topic,
      criteria,
      frequency,
      practiceAreas: selectedPracticeAreas,
      jurisdictions: selectedJurisdictions,
      status: 'active',
      createdDate: editingMonitor?.createdDate || new Date().toISOString(),
      alertCount: editingMonitor?.alertCount || 0,
    };
    onSave(monitor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
              {editingMonitor ? 'Edit monitor' : 'Set up monitoring'}
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
              <X className="size-5 text-gray-500" />
            </button>
          </div>
          <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Get notified about new legal developments relevant to your practice areas.</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
          <div className="space-y-6">
            {/* Topic */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  What should I monitor?
                </label>
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Personal jurisdiction developments in Second Circuit"
                className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
              />
            </div>

            {/* Criteria */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Specific criteria (optional)
                </label>
              </div>
              <textarea
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="Add specific keywords, case types, or other criteria..."
                rows={3}
                className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] leading-[1.35] focus:outline-none focus:border-gray-400 resize-none"
              />
            </div>

            {/* Practice Areas */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Practice areas
                </label>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {availablePracticeAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedPracticeAreas(prev =>
                        prev.includes(area)
                          ? prev.filter(a => a !== area)
                          : [...prev, area]
                      );
                    }}
                    className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                      selectedPracticeAreas.includes(area)
                        ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Jurisdictions */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Jurisdictions (optional)
                </label>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {JURISDICTION_OPTIONS.map((jurisdiction) => (
                  <button
                    key={jurisdiction}
                    onClick={() => {
                      setSelectedJurisdictions(prev =>
                        prev.includes(jurisdiction)
                          ? prev.filter(j => j !== jurisdiction)
                          : [...prev, jurisdiction]
                      );
                    }}
                    className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                      selectedJurisdictions.includes(jurisdiction)
                        ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {jurisdiction}
                  </button>
                ))}
              </div>
            </div>

            {/* Alert Frequency */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Alert frequency
                </label>
              </div>
              <Toggle
                value={frequency}
                onChange={(value) => setFrequency(value as 'real-time' | 'daily' | 'weekly')}
                options={FREQUENCY_OPTIONS}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] p-6 bg-white">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={onClose}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Cancel</p>
              </div>
            </button>
          </div>
          <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 ${
            !topic || selectedPracticeAreas.length === 0 ? 'bg-[#f2f2f2]' : 'bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors'
          }`}>
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
              !topic || selectedPracticeAreas.length === 0 ? 'border-[#f2f2f2]' : 'border-[#1d4b34]'
            }`} />
            <button
              onClick={handleSave}
              disabled={!topic || selectedPracticeAreas.length === 0}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
            >
              <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
                !topic || selectedPracticeAreas.length === 0 ? 'text-[#8a8a8a]' : 'text-[#fcfcfc]'
              }`}>
                <p className="leading-[1.35]">{editingMonitor ? 'Save changes' : 'Start monitoring'}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
