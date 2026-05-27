import { Clock, CheckCircle, AlertCircle, Bell, Search, Pause, Play } from 'lucide-react';

export interface MonitoringActivity {
  id: string;
  monitorId: string;
  monitorTopic: string;
  type: 'scan_completed' | 'scan_started' | 'alert_sent' | 'monitor_created' | 'monitor_paused' | 'monitor_resumed' | 'findings_found';
  timestamp: string;
  details?: string;
  findingsCount?: number;
}

interface MonitoringActivityLogProps {
  activities: MonitoringActivity[];
  maxItems?: number;
}

export function MonitoringActivityLog({
  activities,
  maxItems = 20,
}: MonitoringActivityLogProps) {
  const displayedActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: MonitoringActivity['type']) => {
    switch (type) {
      case 'scan_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scan_started':
        return <Search className="w-4 h-4 text-blue-600" />;
      case 'alert_sent':
        return <Bell className="w-4 h-4 text-amber-600" />;
      case 'monitor_created':
        return <CheckCircle className="w-4 h-4 text-[#1d4b34]" />;
      case 'monitor_paused':
        return <Pause className="w-4 h-4 text-gray-600" />;
      case 'monitor_resumed':
        return <Play className="w-4 h-4 text-[#1d4b34]" />;
      case 'findings_found':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getActivityColor = (type: MonitoringActivity['type']) => {
    switch (type) {
      case 'scan_completed':
        return 'bg-green-50 border-green-200';
      case 'scan_started':
        return 'bg-blue-50 border-blue-200';
      case 'alert_sent':
        return 'bg-amber-50 border-amber-200';
      case 'monitor_created':
        return 'bg-emerald-50 border-emerald-200';
      case 'monitor_paused':
        return 'bg-gray-50 border-gray-200';
      case 'monitor_resumed':
        return 'bg-emerald-50 border-emerald-200';
      case 'findings_found':
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getActivityLabel = (activity: MonitoringActivity) => {
    switch (activity.type) {
      case 'scan_completed':
        return `Scan completed${activity.findingsCount ? ` - ${activity.findingsCount} findings` : ''}`;
      case 'scan_started':
        return 'Scan started';
      case 'alert_sent':
        return 'Alert sent';
      case 'monitor_created':
        return 'Monitor created';
      case 'monitor_paused':
        return 'Monitor paused';
      case 'monitor_resumed':
        return 'Monitor resumed';
      case 'findings_found':
        return `${activity.findingsCount} new findings discovered`;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#e8f2ed] rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-[#1d4b34]" />
        </div>
        <div>
          <h3 className="text-[16px] font-medium text-[#1F1F1F]">
            Activity Log
          </h3>
          <p className="text-[13px] text-[#666]">
            Recent monitoring activity and scan history
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {displayedActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-[13px] text-[#666]">No activity yet</p>
          </div>
        ) : (
          displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${getActivityColor(activity.type)}`}
            >
              <div className="shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-[13px] font-medium text-[#1F1F1F] truncate">
                    {activity.monitorTopic}
                  </p>
                  <span className="text-[11px] text-[#999] shrink-0">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                <p className="text-[12px] text-[#666]">
                  {getActivityLabel(activity)}
                </p>
                {activity.details && (
                  <p className="text-[11px] text-[#999] mt-1">
                    {activity.details}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > maxItems && (
        <div className="mt-4 text-center">
          <button className="text-[13px] text-[#1d4b34] hover:text-[#163829] font-medium transition-colors">
            View all activity ({activities.length})
          </button>
        </div>
      )}
    </div>
  );
}
