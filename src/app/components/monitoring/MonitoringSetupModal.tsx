import { useState, useEffect } from 'react';
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
  { value: 'monthly', label: 'Monthly' },
] as const;

interface JurisdictionRegion {
  id: string;
  label: string;
  jurisdictions: string[];
  moreJurisdictions?: string[];
}

const JURISDICTION_REGIONS: JurisdictionRegion[] = [
  {
    id: 'us',
    label: 'United States',
    jurisdictions: [
      'Federal', 'All US jurisdictions', 'California', 'New York', 'Texas',
      'Florida', 'Illinois', 'Delaware', 'New Jersey', 'Pennsylvania',
      'Georgia', 'Washington', 'Massachusetts', 'Virginia', 'Colorado',
    ],
    moreJurisdictions: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'Connecticut', 'Hawaii',
      'Idaho', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
      'Maryland', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
      'Nebraska', 'Nevada', 'New Hampshire', 'New Mexico', 'North Carolina',
      'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Utah', 'Vermont',
      'West Virginia', 'Wisconsin', 'Wyoming',
    ],
  },
  {
    id: 'canada',
    label: 'Canada',
    jurisdictions: ['Federal', 'Ontario', 'British Columbia', 'Quebec', 'Alberta'],
  },
  {
    id: 'uk',
    label: 'United Kingdom',
    jurisdictions: ['England & Wales', 'Scotland', 'Northern Ireland'],
  },
  {
    id: 'eu',
    label: 'European Union',
    jurisdictions: ['EU-wide', 'Germany', 'France', 'Netherlands', 'Ireland', 'Luxembourg', 'Spain', 'Italy'],
  },
  {
    id: 'apac',
    label: 'Asia Pacific',
    jurisdictions: ['Australia', 'Singapore', 'Hong Kong', 'Japan'],
  },
];

const SOURCE_OPTIONS = ['TR Product', 'Reuters News', 'Web sources'];

// Maps onboarding practice-area ids to this modal's practice-area labels
const PRACTICE_AREA_ID_TO_LABEL: Record<string, string> = {
  litigation: 'Litigation',
  corporate: 'Corporate',
  contracts: 'Contracts',
  ip: 'IP',
  employment: 'Employment',
  'real-estate': 'Real Estate',
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Pre-populate practice areas from the user's onboarding profile
function getDefaultPracticeAreas(available: string[]): string[] {
  const ids = readJSON<string[]>('cocounsel-user-practice-areas', []);
  const labels = ids
    .map((id) => PRACTICE_AREA_ID_TO_LABEL[id])
    .filter((label): label is string => Boolean(label) && available.includes(label));
  return labels;
}

// Pre-populate jurisdictions from the user's onboarding profile.
// Onboarding stores values namespaced as `regionId:jurisdiction`.
function getDefaultJurisdictions(): string[] {
  const stored = readJSON<string[]>('cocounsel-user-jurisdictions', []);
  const valid = new Set<string>();
  JURISDICTION_REGIONS.forEach((region) => {
    [...region.jurisdictions, ...(region.moreJurisdictions ?? [])].forEach((j) => {
      valid.add(`${region.id}:${j}`);
    });
  });
  // Alias onboarding "All states" to this modal's "All US jurisdictions"
  return stored
    .map((v) => (v === 'us:All states' ? 'us:All US jurisdictions' : v))
    .filter((v) => valid.has(v));
}

function getDefaultRegions(jurisdictions: string[]): string[] {
  return Array.from(new Set(jurisdictions.map((v) => v.split(':')[0])));
}

// Re-namespace plain jurisdiction labels (from a saved monitor) back to `regionId:label`
function namespaceJurisdictions(labels: string[]): string[] {
  return labels
    .map((label) => {
      const region = JURISDICTION_REGIONS.find((r) =>
        [...r.jurisdictions, ...(r.moreJurisdictions ?? [])].includes(label)
      );
      return region ? `${region.id}:${label}` : null;
    })
    .filter((v): v is string => v !== null);
}

export function MonitoringSetupModal({
  isOpen,
  onClose,
  onSave,
  editingMonitor,
  availablePracticeAreas = ['Litigation', 'Corporate', 'IP', 'Employment', 'Real Estate']
}: MonitoringSetupModalProps) {
  const [topic, setTopic] = useState(editingMonitor?.topic || '');
  const [criteria, setCriteria] = useState(editingMonitor?.criteria || '');
  const [frequency, setFrequency] = useState<'real-time' | 'daily' | 'weekly' | 'monthly'>(
    editingMonitor?.frequency || 'daily'
  );
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>(
    editingMonitor?.practiceAreas ?? getDefaultPracticeAreas(availablePracticeAreas)
  );
  const initialJurisdictions = editingMonitor?.jurisdictions
    ? namespaceJurisdictions(editingMonitor.jurisdictions)
    : getDefaultJurisdictions();
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(initialJurisdictions);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    getDefaultRegions(initialJurisdictions)
  );
  const [expandedMoreStates, setExpandedMoreStates] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>(
    editingMonitor?.sources ?? [...SOURCE_OPTIONS]
  );

  // The modal stays mounted in its parents and only toggles `isOpen`, so the
  // useState initializers above run once (when editingMonitor was null). Re-sync
  // all fields each time the modal opens so edit mode reflects the chosen monitor.
  useEffect(() => {
    if (!isOpen) return;
    setTopic(editingMonitor?.topic || '');
    setCriteria(editingMonitor?.criteria || '');
    setFrequency(editingMonitor?.frequency || 'daily');
    setSelectedPracticeAreas(
      editingMonitor?.practiceAreas ?? getDefaultPracticeAreas(availablePracticeAreas)
    );
    const jurisdictions = editingMonitor?.jurisdictions
      ? namespaceJurisdictions(editingMonitor.jurisdictions)
      : getDefaultJurisdictions();
    setSelectedJurisdictions(jurisdictions);
    setSelectedRegions(getDefaultRegions(jurisdictions));
    setExpandedMoreStates([]);
    setSelectedSources(editingMonitor?.sources ?? [...SOURCE_OPTIONS]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editingMonitor]);

  const handleRegionToggle = (regionId: string) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId) ? prev.filter((r) => r !== regionId) : [...prev, regionId]
    );
  };

  const handleMoreStatesToggle = (regionId: string) => {
    setExpandedMoreStates((prev) =>
      prev.includes(regionId) ? prev.filter((r) => r !== regionId) : [...prev, regionId]
    );
  };

  const handleSave = () => {
    const monitor: Partial<Monitor> = {
      id: editingMonitor?.id || `monitor-${Date.now()}`,
      topic,
      criteria,
      frequency,
      practiceAreas: selectedPracticeAreas,
      jurisdictions: selectedJurisdictions.map((v) => v.split(':').slice(1).join(':')),
      sources: selectedSources,
      status: 'active',
      createdDate: editingMonitor?.createdDate || new Date().toISOString(),
      alertCount: editingMonitor?.alertCount || 0,
    };
    onSave(monitor);
    onClose();
  };

  // Required fields must be filled in for any save.
  const isValid = Boolean(topic) && selectedPracticeAreas.length > 0;

  // Compare current values against the monitor we opened with. When creating a
  // new monitor there is nothing to diff against, so a valid form is enough.
  const sameSet = (a: string[], b: string[]) =>
    a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');

  const isDirty = !editingMonitor
    ? true
    : topic !== (editingMonitor.topic || '') ||
      criteria !== (editingMonitor.criteria || '') ||
      frequency !== (editingMonitor.frequency || 'daily') ||
      !sameSet(selectedPracticeAreas, editingMonitor.practiceAreas ?? []) ||
      !sameSet(
        selectedJurisdictions.map((v) => v.split(':').slice(1).join(':')),
        editingMonitor.jurisdictions ?? []
      ) ||
      !sameSet(selectedSources, editingMonitor.sources ?? [...SOURCE_OPTIONS]);

  const canSave = isValid && isDirty;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">
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
                placeholder="e.g., CCPA amendments, HSR filing thresholds, EU AI Act enforcement"
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

              {/* Row 1 — Region pills (always visible, multi-select) */}
              <div className="flex flex-wrap gap-[6px]">
                {JURISDICTION_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionToggle(region.id)}
                    className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                      selectedRegions.includes(region.id)
                        ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>

              {/* Row 2 — Jurisdiction pills for each selected region */}
              {JURISDICTION_REGIONS.filter((region) => selectedRegions.includes(region.id)).map((region) => {
                const showMore = expandedMoreStates.includes(region.id);
                const visibleJurisdictions = showMore && region.moreJurisdictions
                  ? [...region.jurisdictions, ...region.moreJurisdictions]
                  : region.jurisdictions;
                return (
                  <div key={region.id} className="flex flex-col gap-[6px] w-full">
                    <span className="text-[12px] font-['Source_Sans_3'] font-medium uppercase tracking-wide text-[#8a8a8a]">
                      {region.label}
                    </span>
                    <div className="flex flex-wrap gap-[6px]">
                      {visibleJurisdictions.map((jurisdiction) => {
                        const value = `${region.id}:${jurisdiction}`;
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              setSelectedJurisdictions((prev) =>
                                prev.includes(value)
                                  ? prev.filter((j) => j !== value)
                                  : [...prev, value]
                              );
                            }}
                            className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                              selectedJurisdictions.includes(value)
                                ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                                : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                            }`}
                          >
                            {jurisdiction}
                          </button>
                        );
                      })}
                      {region.moreJurisdictions && (
                        <button
                          onClick={() => handleMoreStatesToggle(region.id)}
                          className="h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
                        >
                          {showMore ? 'Show fewer states' : 'More states'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sources */}
            <div className="content-stretch flex flex-col gap-[8px] items-start">
              <div className="content-stretch flex flex-col items-start shrink-0 w-full">
                <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                  Sources (optional)
                </label>
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {SOURCE_OPTIONS.map((source) => (
                  <button
                    key={source}
                    onClick={() => {
                      setSelectedSources((prev) =>
                        prev.includes(source)
                          ? prev.filter((s) => s !== source)
                          : [...prev, source]
                      );
                    }}
                    className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                      selectedSources.includes(source)
                        ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {source}
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
                onChange={(value) => setFrequency(value as 'real-time' | 'daily' | 'weekly' | 'monthly')}
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
            !canSave ? 'bg-[#f2f2f2]' : 'bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors'
          }`}>
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
              !canSave ? 'border-[#f2f2f2]' : 'border-[#1d4b34]'
            }`} />
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
            >
              <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${
                !canSave ? 'text-[#8a8a8a]' : 'text-[#fcfcfc]'
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
