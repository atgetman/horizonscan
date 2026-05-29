import { useState, useEffect } from 'react';
import { Plus, Bell } from 'lucide-react';
import { MonitoringCard, Monitor } from './MonitoringCard';
import { MonitoringSetupModal } from './MonitoringSetupModal';
import { MonitoringResultsViewer, MonitoringResult, MonitoringFinding } from './MonitoringResultsViewer';
import { Toggle } from '../ui/SegmentedToggle';
import { Toast } from '../Toast';
import { useMonitoring } from '../../contexts/MonitoringContext';

interface MonitoringListViewProps {
  availablePracticeAreas?: string[];
}

// Mock activity data
const MOCK_ACTIVITIES: MonitoringActivity[] = [
  {
    id: 'act-1',
    monitorId: 'monitor-1',
    monitorTopic: 'Personal jurisdiction developments',
    type: 'findings_found',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    findingsCount: 3,
  },
  {
    id: 'act-2',
    monitorId: 'monitor-2',
    monitorTopic: 'GDPR enforcement and guidance',
    type: 'scan_completed',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    findingsCount: 1,
  },
  {
    id: 'act-3',
    monitorId: 'monitor-3',
    monitorTopic: 'Patent eligibility under Section 101',
    type: 'monitor_paused',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock results data
const MOCK_RESULTS: Record<string, MonitoringResult> = {
  'monitor-1': {
    id: 'result-1',
    monitorId: 'monitor-1',
    monitorTopic: 'Personal jurisdiction developments in Second Circuit',
    scanDate: '2 days ago',
    findings: [
      {
        id: 'finding-1',
        type: 'case',
        title: 'New Second Circuit Decision on Minimum Contacts Analysis',
        jurisdiction: 'Second Circuit',
        date: 'May 15, 2026',
        summary: 'The Second Circuit issued a significant decision refining the analysis for specific jurisdiction in cases involving defendants with limited contacts with the forum state. The court emphasized the need for a direct relationship between the forum contacts and the cause of action.',
        keyPoints: [
          'Clarifies "purposeful availment" requirement in the digital commerce context',
          'Distinguishes between general and specific jurisdiction more sharply',
          'Provides framework for analyzing stream-of-commerce cases'
        ],
        citation: 'Smith v. TechCorp, No. 24-1234 (2d Cir. May 15, 2026)',
        url: 'https://example.com/case',
        relevanceScore: 95,
      },
      {
        id: 'finding-2',
        type: 'case',
        title: 'District Court Applies Daimler Framework to Corporate Presence',
        jurisdiction: 'S.D.N.Y.',
        date: 'May 12, 2026',
        summary: 'Southern District of New York applies the Daimler general jurisdiction framework to dismiss claims against a foreign corporation with limited U.S. presence.',
        keyPoints: [
          'Reaffirms that "at home" standard requires more than significant business activity',
          'Corporate registration alone insufficient for general jurisdiction'
        ],
        citation: 'Johnson v. GlobalCo, No. 25-CV-789 (S.D.N.Y. May 12, 2026)',
        relevanceScore: 82,
      },
    ],
  },
};

// Mock data for demonstration
const INITIAL_MONITORS: Monitor[] = [
  {
    id: 'monitor-1',
    topic: 'Personal jurisdiction developments in Second Circuit',
    criteria: 'Cases involving specific jurisdiction, minimum contacts analysis, and due process challenges in federal courts',
    frequency: 'weekly',
    practiceAreas: ['Litigation'],
    jurisdictions: ['Federal', 'New York'],
    status: 'active',
    lastScan: '2 days ago',
    nextScan: '5 days',
    alertCount: 3,
    createdDate: '2026-04-15',
  },
  {
    id: 'monitor-2',
    topic: 'GDPR enforcement actions and guidance',
    criteria: 'New enforcement actions, regulatory guidance, and court decisions from EU data protection authorities',
    frequency: 'daily',
    practiceAreas: ['Corporate'],
    jurisdictions: [],
    status: 'active',
    lastScan: 'Today',
    nextScan: 'Tomorrow',
    alertCount: 1,
    createdDate: '2026-03-20',
  },
  {
    id: 'monitor-3',
    topic: 'Patent eligibility under Section 101',
    criteria: 'Federal Circuit decisions applying Alice/Mayo framework to software and business method patents',
    frequency: 'weekly',
    practiceAreas: ['IP'],
    jurisdictions: ['Federal'],
    status: 'paused',
    lastScan: '1 week ago',
    alertCount: 0,
    createdDate: '2026-02-10',
  },
];

export function MonitoringListView({ availablePracticeAreas }: MonitoringListViewProps) {
  const { savedAlerts } = useMonitoring();

  // Monitoring list view component
  const [monitors, setMonitors] = useState<Monitor[]>(INITIAL_MONITORS);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<Monitor | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all');
  const [showResultsViewer, setShowResultsViewer] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MonitoringResult | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Merge saved alerts with initial monitors
  useEffect(() => {
    const alertMonitors: Monitor[] = savedAlerts.map(alert => ({
      id: alert.id,
      topic: alert.topic,
      criteria: alert.criteria,
      frequency: alert.frequency,
      practiceAreas: alert.practiceAreas,
      jurisdictions: alert.jurisdictions,
      status: alert.status,
      lastScan: alert.lastScan,
      nextScan: alert.nextScan,
      alertCount: alert.alertCount,
      createdDate: alert.createdDate,
    }));

    setMonitors([...alertMonitors, ...INITIAL_MONITORS]);
  }, [savedAlerts]);

  const handleSaveMonitor = (monitor: Partial<Monitor>) => {
    if (editingMonitor) {
      // Update existing monitor
      setMonitors(prev => prev.map(m => m.id === monitor.id ? { ...m, ...monitor } as Monitor : m));
    } else {
      // Add new monitor
      setMonitors(prev => [...prev, monitor as Monitor]);
    }
    setEditingMonitor(null);
  };

  const handleEdit = (monitor: Monitor) => {
    setEditingMonitor(monitor);
    setIsSetupModalOpen(true);
  };

  const handlePause = (id: string) => {
    setMonitors(prev => prev.map(m => m.id === id ? { ...m, status: 'paused' as const } : m));
    setToastMessage('Monitor paused.');
    setShowToast(true);
  };

  const handleResume = (id: string) => {
    setMonitors(prev => prev.map(m => m.id === id ? { ...m, status: 'active' as const } : m));
    setToastMessage('Monitor resumed.');
    setShowToast(true);
  };

  const handleDelete = (id: string) => {
    setMonitors(prev => prev.filter(m => m.id !== id));
  };

  const handleViewResults = (id: string) => {
    const result = MOCK_RESULTS[id];
    if (result) {
      setSelectedResult(result);
      setShowResultsViewer(true);
    }
  };

  const handleCreateNew = () => {
    setEditingMonitor(null);
    setIsSetupModalOpen(true);
  };

  const filteredMonitors = monitors.filter(monitor => {
    if (filterStatus === 'all') return true;
    return monitor.status === filterStatus;
  });

  const activeCount = monitors.filter(m => m.status === 'active').length;
  const pausedCount = monitors.filter(m => m.status === 'paused').length;

  return (
    <div className="max-w-[1100px] mx-auto px-[32px] pt-[50px]">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1]">Monitoring & alerts</h1>
        <button
          onClick={handleCreateNew}
          className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
        >
          <Plus className="size-4" />
          New monitor
        </button>
      </div>

      <div className="mb-6">
        <Toggle
          value={filterStatus}
          onChange={(value) => setFilterStatus(value as 'all' | 'active' | 'paused')}
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'paused', label: 'Paused' },
          ]}
        />
      </div>

      {filteredMonitors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-[#999]" />
          </div>
          <h3 className="text-[16px] font-medium text-[#1F1F1F] mb-2">
            No monitors yet
          </h3>
          <p className="text-[14px] text-[#666] mb-6 max-w-md">
            Set up monitoring to get notified about new legal developments relevant to your practice areas.
          </p>
          <button
            onClick={handleCreateNew}
            className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
          >
            <Plus className="size-4" />
            Create your first monitor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMonitors.map((monitor) => (
            <MonitoringCard
              key={monitor.id}
              monitor={monitor}
              onEdit={handleEdit}
              onPause={handlePause}
              onResume={handleResume}
              onDelete={handleDelete}
              onViewResults={handleViewResults}
            />
          ))}
        </div>
      )}

      {/* Setup Modal */}
      <MonitoringSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => {
          setIsSetupModalOpen(false);
          setEditingMonitor(null);
        }}
        onSave={handleSaveMonitor}
        editingMonitor={editingMonitor}
        availablePracticeAreas={availablePracticeAreas}
      />

      {/* Results Viewer */}
      <MonitoringResultsViewer
        isOpen={showResultsViewer}
        onClose={() => setShowResultsViewer(false)}
        result={selectedResult}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
