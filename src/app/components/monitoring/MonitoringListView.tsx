import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Bell } from 'lucide-react';
import { MonitoringCard, Monitor } from './MonitoringCard';
import { MonitoringSetupModal } from './MonitoringSetupModal';
import { MonitoringResultsViewer, MonitoringResult, MonitoringFinding } from './MonitoringResultsViewer';
import { AlertFeedCard, FiredAlert } from './AlertFeedCard';
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
    monitorTopic: 'SEC climate disclosure developments',
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
    monitorTopic: 'EU AI Act implementation',
    type: 'monitor_paused',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Findings surfaced when a brand-new monitor runs its first scan on demand
const NEW_SCAN_FINDINGS: MonitoringFinding[] = [
  {
    id: 'new-finding-1',
    type: 'regulation',
    title: 'SEC adopts amendments to merger disclosure requirements',
    jurisdiction: 'Federal',
    date: 'June 5, 2026',
    summary: 'The SEC finalized amendments expanding the disclosure obligations for material definitive agreements in M&A transactions, with new line-item requirements for representations and warranties.',
    keyPoints: [
      'Expands Item 1.01 disclosure for material definitive agreements',
      'New requirements may affect standard reps & warranties in templates',
      'Compliance date set for Q1 2027',
    ],
    citation: 'SEC Release No. 33-11456 (June 5, 2026)',
    relevanceScore: 92,
  },
  {
    id: 'new-finding-2',
    type: 'guidance',
    title: 'FTC issues updated guidance on HSR premerger notification',
    jurisdiction: 'Federal',
    date: 'June 2, 2026',
    summary: 'Updated FTC guidance clarifies expanded data submission expectations during the HSR waiting period, which may lengthen diligence timelines for covered transactions.',
    keyPoints: [
      'Broader transaction-related document production expected',
      'May affect closing-condition and timing covenants in templates',
    ],
    citation: 'FTC Premerger Notification Guidance (June 2026)',
    relevanceScore: 78,
  },
];

// Mock results data
const MOCK_RESULTS: Record<string, MonitoringResult> = {
  'monitor-1': {
    id: 'result-1',
    monitorId: 'monitor-1',
    monitorTopic: 'SEC climate disclosure developments',
    scanDate: '2 days ago',
    findings: [
      {
        id: 'finding-1',
        type: 'regulation',
        title: 'SEC Staff Issues Compliance Guidance on GHG Emissions Assurance',
        jurisdiction: 'Federal',
        date: 'May 15, 2026',
        summary: 'The SEC staff issued interpretive guidance clarifying the assurance phase-in timeline for Scope 1 and Scope 2 emissions disclosures, emphasizing the need to describe organizational boundaries and methodology consistently with the GHG Protocol.',
        keyPoints: [
          'Clarifies limited vs. reasonable assurance phase-in by filer status',
          'Requires gross presentation of Scope 1 and Scope 2 emissions',
          'Provides a framework for describing organizational boundaries'
        ],
        citation: 'SEC Division of Corporation Finance, C&DI (May 15, 2026)',
        url: 'https://www.sec.gov',
        relevanceScore: 95,
      },
      {
        id: 'finding-2',
        type: 'guidance',
        title: 'Staff Comment Letter Trends Highlight Governance Disclosure Gaps',
        jurisdiction: 'Federal',
        date: 'May 12, 2026',
        summary: 'A review of recent staff comment letters shows the SEC frequently asks registrants to identify the specific board committee overseeing climate risk and to describe management\'s reporting cadence.',
        keyPoints: [
          'Registrants should name the responsible board committee',
          'Disclosure should describe the frequency of management reporting'
        ],
        citation: 'SEC Comment Letter Trends Report (May 12, 2026)',
        relevanceScore: 82,
      },
    ],
  },
};

// Mock data for demonstration
const INITIAL_MONITORS: Monitor[] = [
  {
    id: 'monitor-1',
    topic: 'SEC climate disclosure developments',
    criteria: 'Final rules, staff guidance, and comment letter trends on climate-related and GHG emissions disclosures',
    frequency: 'weekly',
    practiceAreas: ['Securities'],
    jurisdictions: ['Federal'],
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
    topic: 'EU AI Act implementation',
    criteria: 'Implementing acts, guidance, and standards on high-risk AI systems relevant to credit and underwriting models',
    frequency: 'weekly',
    practiceAreas: ['AI Governance'],
    jurisdictions: ['EU'],
    status: 'paused',
    lastScan: '1 week ago',
    alertCount: 0,
    createdDate: '2026-02-10',
  },
];

// Mock fired-alert feed data
const MOCK_FIRED_ALERTS: FiredAlert[] = [
  {
    id: 'fired-1',
    category: 'regulatory',
    title: 'New SEC climate disclosure rules may affect your 10-K disclosures',
    body: 'Updated disclosure requirements could require changes to the climate risk governance section in the SEC Climate Disclosure Program.',
    sourceType: 'Regulatory',
    matterName: 'SEC Climate Disclosure Program',
    topic: 'SEC Climate Disclosure',
    matterPath: '/workspace/sec-climate-disclosure-program',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'fired-2',
    category: 'deadline',
    title: 'Filing deadline approaching for Hart-Scott-Rodino notification',
    body: 'The HSR waiting period response is due in 5 days for the Sterling Capital acquisition.',
    sourceType: 'Deadline',
    matterName: 'Project Harbor — Fintech Acquisition Diligence',
    topic: 'HSR Filing',
    matterPath: '/workspace/project-harbor-fintech-acquisition-diligence',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'fired-3',
    category: 'contract',
    title: 'Vendor proposed redlines to the data processing agreement',
    body: 'Three clauses were modified, including the sub-processor and breach-notification provisions in the Cloudspan DPA.',
    sourceType: 'Contract',
    matterName: 'Vendor DPA Remediation',
    topic: 'Data Processing Agreement',
    matterPath: '/workspace/vendor-dpa-remediation',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: 'fired-4',
    category: 'regulatory',
    title: 'EU AI Act guidance refines high-risk system obligations',
    body: 'New implementing guidance may affect governance requirements for credit underwriting models in EU AI Act Readiness.',
    sourceType: 'Regulatory',
    matterName: 'EU AI Act Readiness',
    topic: 'EU AI Act',
    matterPath: '/workspace/eu-ai-act-readiness',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

export function MonitoringListView({ availablePracticeAreas }: MonitoringListViewProps) {
  const { savedAlerts } = useMonitoring();
  const navigate = useNavigate();

  // Monitoring list view component
  const [activeTab, setActiveTab] = useState<'alerts' | 'monitors'>('monitors');
  const [firedAlerts, setFiredAlerts] = useState<FiredAlert[]>(MOCK_FIRED_ALERTS);
  const [monitors, setMonitors] = useState<Monitor[]>(INITIAL_MONITORS);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<Monitor | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all');
  const [showResultsViewer, setShowResultsViewer] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MonitoringResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
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
    const monitor = monitors.find(m => m.id === id);
    const cached = MOCK_RESULTS[id];

    if (cached) {
      setSelectedResult(cached);
      setShowResultsViewer(true);
      return;
    }

    // No cached results yet (e.g. a freshly created monitor) — kick off a new
    // scan. We show the results viewer in a scanning state, then populate it
    // with freshly "found" results.
    setIsScanning(true);
    setSelectedResult({
      id: `result-${id}`,
      monitorId: id,
      monitorTopic: monitor?.topic ?? 'Monitor',
      scanDate: 'just now',
      findings: [],
    });
    setShowResultsViewer(true);

    window.setTimeout(() => {
      setSelectedResult({
        id: `result-${id}`,
        monitorId: id,
        monitorTopic: monitor?.topic ?? 'Monitor',
        scanDate: 'just now',
        findings: NEW_SCAN_FINDINGS,
      });
      setMonitors(prev => prev.map(m => m.id === id
        ? { ...m, lastScan: 'just now', alertCount: NEW_SCAN_FINDINGS.length }
        : m
      ));
      setIsScanning(false);
    }, 2600);
  };

  const handleCreateNew = () => {
    setEditingMonitor(null);
    setIsSetupModalOpen(true);
  };

  const handleReviewAlert = (alert: FiredAlert) => {
    setFiredAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a));
    navigate(alert.matterPath);
  };

  const handleSnoozeAlert = (id: string) => {
    setFiredAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
    setToastMessage('Alert snoozed for 7 days.');
    setShowToast(true);
  };

  const filteredMonitors = monitors.filter(monitor => {
    if (filterStatus === 'all') return true;
    return monitor.status === filterStatus;
  });

  const activeCount = monitors.filter(m => m.status === 'active').length;
  const pausedCount = monitors.filter(m => m.status === 'paused').length;

  return (
    <div className="max-w-[1100px] mx-auto px-[32px] pt-[50px] pb-8">
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1]">Monitoring & alerts</h1>
        {activeTab === 'monitors' && (
          <button
            onClick={handleCreateNew}
            className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
          >
            <Plus className="size-4" />
            New monitor
          </button>
        )}
      </div>

      {/* Top-level tabs */}
      <div className="mb-6">
        <Toggle
          value={activeTab}
          onChange={(value) => setActiveTab(value as 'alerts' | 'monitors')}
          options={[
            { value: 'monitors', label: 'Monitors' },
            { value: 'alerts', label: 'Alerts' },
          ]}
        />
      </div>

      {activeTab === 'alerts' ? (
        firedAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-4 py-16">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-[#999]" />
            </div>
            <h3 className="text-[16px] font-['Clario'] font-medium text-[#1F1F1F] mb-2">
              No alerts
            </h3>
            <p className="text-[14px] font-['Source_Sans_3'] text-[#666] max-w-md">
              When your monitors detect new developments, fired alerts will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {firedAlerts.map((alert) => (
              <AlertFeedCard
                key={alert.id}
                alert={alert}
                onReview={handleReviewAlert}
                onSnooze={handleSnoozeAlert}
              />
            ))}
          </div>
        )
      ) : (
        <>
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
        </>
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
        isScanning={isScanning}
        onClose={() => {
          setShowResultsViewer(false);
          setIsScanning(false);
        }}
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
