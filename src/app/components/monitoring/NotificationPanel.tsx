import { Bell, X, Eye, ExternalLink, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMonitoring, SavedAlert } from '../../contexts/MonitoringContext';
import { useState } from 'react';
import { clsx } from 'clsx';

export interface MonitoringAlert {
  id: string;
  monitorId: string;
  monitorTopic: string;
  title: string;
  summary: string;
  date: string;
  isRead: boolean;
  type: 'case' | 'regulation' | 'guidance';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: MonitoringAlert[];
  onMarkAsRead: (id: string) => void;
  onViewAll: () => void;
}

export function NotificationPanel({
  isOpen,
  onClose,
  alerts,
  onMarkAsRead,
  onViewAll,
}: NotificationPanelProps) {
  const navigate = useNavigate();
  const { savedAlerts } = useMonitoring();
  const [activeTab, setActiveTab] = useState<'mentions' | 'comments' | 'shared' | 'tasks' | 'alerts'>('alerts');

  if (!isOpen) return null;

  const unreadCount = alerts.filter(a => !a.isRead).length;
  const totalNotifications = unreadCount + savedAlerts.length;

  const handleViewAlert = (alert: MonitoringAlert) => {
    onMarkAsRead(alert.id);
    // TODO: Navigate to the alert details or workspace
    console.log('View alert:', alert.id);
  };

  const getAlertTypeColor = (type: MonitoringAlert['type']) => {
    switch (type) {
      case 'case':
        return 'bg-gray-50 text-blue-700 border-blue-200';
      case 'regulation':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'guidance':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const tabs = [
    { id: 'mentions' as const, label: 'Mentions', count: 0 },
    { id: 'comments' as const, label: 'Comments', count: 0 },
    { id: 'shared' as const, label: 'Shared', count: 0 },
    { id: 'tasks' as const, label: 'Tasks', count: 0 },
    { id: 'alerts' as const, label: 'Alerts', count: savedAlerts.length },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-[#F5F5F5] shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="h-[56px] bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="font-['Clario'] font-semibold text-[16px] text-[#212223]">Notifications</h2>
            {totalNotifications > 0 && (
              <div className="w-5 h-5 rounded-full bg-[#DE6633] flex items-center justify-center">
                <span className="text-white text-[11px] font-['Source_Sans_3'] font-semibold">{totalNotifications}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F5F5F5] rounded transition-colors"
          >
            <X className="size-4 text-[#666]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#E5E5E5] px-4 shrink-0">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative pb-3 pt-3 text-[14px] font-['Source_Sans_3'] transition-colors",
                  activeTab === tab.id
                    ? "text-[#1d4b34] font-semibold"
                    : "text-[#666] hover:text-[#212223]"
                )}
              >
                {tab.label}
                {tab.count > 0 && activeTab !== tab.id && (
                  <span className="ml-1 text-[#666]">({tab.count})</span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1d4b34]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'alerts' && (
            <>
              {alerts.length === 0 && savedAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-[14px] text-[#666]">
                    No new alerts yet
                  </p>
                  <p className="text-[12px] text-[#999] mt-1">
                    You'll be notified when there are new legal developments
                  </p>
                </div>
              ) : (
                <>
                  {/* Monitoring Alerts */}
                  {alerts.length > 0 && (
                    <div className="divide-y divide-gray-100">
                      {alerts.map((alert) => (
                        <button
                          key={alert.id}
                          onClick={() => handleViewAlert(alert)}
                          className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${
                            !alert.isRead ? 'bg-gray-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                              alert.isRead ? 'bg-transparent' : 'bg-[#dc2626]'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium border capitalize ${
                                  getAlertTypeColor(alert.type)
                                }`}>
                                  {alert.type}
                                </span>
                                <span className="text-[11px] text-[#999]">
                                  {alert.date}
                                </span>
                              </div>
                              <p className="text-[13px] font-medium text-[#1F1F1F] mb-1">
                                {alert.title}
                              </p>
                              <p className="text-[12px] text-[#666] line-clamp-2 mb-2">
                                {alert.summary}
                              </p>
                              <p className="text-[11px] text-[#999]">
                                From: {alert.monitorTopic}
                              </p>
                            </div>
                            <Eye className="w-4 h-4 text-[#999] shrink-0 mt-1" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Saved Alerts */}
                  {savedAlerts.length > 0 && (
                    <div className="p-4 space-y-2">
                      {savedAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="bg-white rounded-lg border border-[#E5E5E5] p-3 hover:bg-[#F9FAFB] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#eaffe5] border-2 border-[#bce0a2] flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle className="size-4 text-[#387c2b]" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-['Clario'] font-medium text-[14px] text-[#212223] leading-[1.4]">
                                  {alert.topic}
                                </h4>
                                <span className="font-['Source_Sans_3'] text-[12px] text-[#999] shrink-0">
                                  {alert.lastScan}
                                </span>
                              </div>
                              <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.4] mb-2">
                                Alert saved • {alert.frequency} updates
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {alert.practiceAreas.map((area) => (
                                  <span
                                    key={area}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F5F5F5] font-['Source_Sans_3'] text-[11px] text-[#666]"
                                  >
                                    {area}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer - show if there are monitoring alerts */}
                  {alerts.length > 0 && (
                    <div className="px-5 py-3 border-t border-gray-200 bg-white">
                      <button
                        onClick={() => {
                          onViewAll();
                          navigate('/knowledge', { state: { openMonitoring: true } });
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 text-[13px] font-['Clario'] font-medium text-[#1d4b34] hover:text-[#163829] transition-colors"
                      >
                        View all in Knowledge
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {activeTab !== 'alerts' && (
            <div className="text-center py-12">
              <p className="font-['Source_Sans_3'] text-[14px] text-[#666]">
                No {activeTab} yet
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
