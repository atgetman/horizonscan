import { useState } from 'react';
import { Mail, Clock, Bell, Check } from 'lucide-react';

interface MonitoringEmailSettingsProps {
  currentSettings?: {
    emailEnabled: boolean;
    emailAddress: string;
    frequency: 'immediate' | 'daily' | 'weekly';
    digestTime: string;
    includeFullContent: boolean;
  };
  onSave?: (settings: any) => void;
}

export function MonitoringEmailSettings({
  currentSettings,
  onSave,
}: MonitoringEmailSettingsProps) {
  const [emailEnabled, setEmailEnabled] = useState(currentSettings?.emailEnabled ?? true);
  const [emailAddress, setEmailAddress] = useState(
    currentSettings?.emailAddress ?? 'user@example.com'
  );
  const [frequency, setFrequency] = useState<'immediate' | 'daily' | 'weekly'>(
    currentSettings?.frequency ?? 'daily'
  );
  const [digestTime, setDigestTime] = useState(currentSettings?.digestTime ?? '09:00');
  const [includeFullContent, setIncludeFullContent] = useState(
    currentSettings?.includeFullContent ?? false
  );

  const handleSave = () => {
    const settings = {
      emailEnabled,
      emailAddress,
      frequency,
      digestTime,
      includeFullContent,
    };
    onSave?.(settings);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#e8f2ed] rounded-lg flex items-center justify-center">
          <Mail className="w-5 h-5 text-[#1d4b34]" />
        </div>
        <div>
          <h3 className="text-[16px] font-medium text-[#1F1F1F]">
            Email Alert Settings
          </h3>
          <p className="text-[13px] text-[#666]">
            Configure how you receive monitoring alerts via email
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Enable Email Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-[14px] font-medium text-[#1F1F1F]">
              Enable email alerts
            </label>
            <p className="text-[12px] text-[#666] mt-1">
              Receive notifications about new monitoring findings
            </p>
          </div>
          <button
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              emailEnabled ? 'bg-[#1d4b34]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                emailEnabled ? 'transform translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {emailEnabled && (
          <>
            {/* Email Address */}
            <div>
              <label className="block text-[14px] font-medium text-[#1F1F1F] mb-2">
                Email address
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#1d4b34] transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Alert Frequency */}
            <div>
              <label className="block text-[14px] font-medium text-[#1F1F1F] mb-3">
                Alert frequency
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setFrequency('immediate')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    frequency === 'immediate'
                      ? 'bg-[#e8f2ed] border-[#1d4b34]'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#1d4b34]" />
                    <div className="text-left">
                      <div className="text-[14px] font-medium text-[#1F1F1F]">
                        Immediate
                      </div>
                      <div className="text-[12px] text-[#666]">
                        Get notified as soon as new findings are discovered
                      </div>
                    </div>
                  </div>
                  {frequency === 'immediate' && (
                    <Check className="w-5 h-5 text-[#1d4b34]" />
                  )}
                </button>

                <button
                  onClick={() => setFrequency('daily')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    frequency === 'daily'
                      ? 'bg-[#e8f2ed] border-[#1d4b34]'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#1d4b34]" />
                    <div className="text-left">
                      <div className="text-[14px] font-medium text-[#1F1F1F]">
                        Daily digest
                      </div>
                      <div className="text-[12px] text-[#666]">
                        Receive a summary once per day
                      </div>
                    </div>
                  </div>
                  {frequency === 'daily' && (
                    <Check className="w-5 h-5 text-[#1d4b34]" />
                  )}
                </button>

                <button
                  onClick={() => setFrequency('weekly')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    frequency === 'weekly'
                      ? 'bg-[#e8f2ed] border-[#1d4b34]'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#1d4b34]" />
                    <div className="text-left">
                      <div className="text-[14px] font-medium text-[#1F1F1F]">
                        Weekly digest
                      </div>
                      <div className="text-[12px] text-[#666]">
                        Receive a summary once per week
                      </div>
                    </div>
                  </div>
                  {frequency === 'weekly' && (
                    <Check className="w-5 h-5 text-[#1d4b34]" />
                  )}
                </button>
              </div>
            </div>

            {/* Digest Time */}
            {(frequency === 'daily' || frequency === 'weekly') && (
              <div>
                <label className="block text-[14px] font-medium text-[#1F1F1F] mb-2">
                  {frequency === 'daily' ? 'Daily' : 'Weekly'} digest time
                </label>
                <input
                  type="time"
                  value={digestTime}
                  onChange={(e) => setDigestTime(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#1d4b34] transition-colors"
                />
                <p className="text-[12px] text-[#666] mt-1">
                  Time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
              </div>
            )}

            {/* Include Full Content */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <label className="text-[14px] font-medium text-[#1F1F1F]">
                  Include full content in emails
                </label>
                <p className="text-[12px] text-[#666] mt-1">
                  Show complete summaries instead of just titles
                </p>
              </div>
              <button
                onClick={() => setIncludeFullContent(!includeFullContent)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  includeFullContent ? 'bg-[#1d4b34]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    includeFullContent ? 'transform translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-[#1d4b34] hover:bg-[#163829] text-white rounded-lg text-[14px] font-medium transition-colors"
          >
            Save email settings
          </button>
        </div>
      </div>
    </div>
  );
}
