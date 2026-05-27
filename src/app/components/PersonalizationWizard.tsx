import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUp, Check, Scale, Building2, FileText, Lightbulb, Users, Home, Calculator, ShieldCheck, TrendingUp, Bell } from 'lucide-react';

interface PersonalizationWizardProps {
  isOpen: boolean;
  onComplete: () => void;
}

const ROLE_OPTIONS = [
  'Lawyer',
  'Knowledge Manager',
  'Admin',
  'Judge',
  'Paralegal',
  'Compliance Officer'
] as const;

const PRACTICE_AREAS = [
  { id: 'litigation', label: 'Litigation', icon: Scale },
  { id: 'corporate', label: 'Corporate Law', icon: Building2 },
  { id: 'contracts', label: 'Contracts', icon: FileText },
  { id: 'ip', label: 'Intellectual Property', icon: Lightbulb },
  { id: 'employment', label: 'Employment Law', icon: Users },
  { id: 'real-estate', label: 'Real Estate', icon: Home },
  { id: 'tax', label: 'Tax Law', icon: Calculator },
  { id: 'compliance', label: 'Regulatory Compliance', icon: ShieldCheck },
  { id: 'ma', label: 'M&A', icon: TrendingUp },
] as const;

const MONITORING_TOPICS = [
  { id: 'jurisdiction', label: 'Personal jurisdiction developments', type: 'Case law', practiceAreas: ['litigation'] },
  { id: 'patent-eligibility', label: 'Patent eligibility under Section 101', type: 'Case law', practiceAreas: ['ip', 'litigation'] },
  { id: 'gdpr', label: 'GDPR enforcement and guidance', type: 'Regulatory', practiceAreas: ['compliance', 'corporate'] },
  { id: 'summary-judgment', label: 'Summary judgment standards', type: 'Case law', practiceAreas: ['litigation'] },
  { id: 'employment-discrimination', label: 'Employment discrimination case law', type: 'Case law', practiceAreas: ['employment', 'litigation'] },
  { id: 'force-majeure', label: 'Force majeure interpretations', type: 'Case law', practiceAreas: ['contracts', 'litigation'] },
  { id: 'discovery-sanctions', label: 'Discovery sanctions and ESI', type: 'Case law', practiceAreas: ['litigation'] },
  { id: 'class-certification', label: 'Class action certification', type: 'Case law', practiceAreas: ['litigation'] },
  { id: 'merger-review', label: 'HSR and merger review timelines', type: 'Regulatory', practiceAreas: ['ma', 'corporate', 'compliance'] },
  { id: 'securities-disclosure', label: 'SEC disclosure requirements', type: 'Regulatory', practiceAreas: ['corporate', 'compliance'] },
  { id: 'environmental-compliance', label: 'EPA enforcement priorities', type: 'Regulatory', practiceAreas: ['compliance', 'real-estate'] },
  { id: 'tax-code', label: 'Tax code changes and IRS guidance', type: 'Regulatory', practiceAreas: ['tax', 'corporate'] },
  { id: 'trademark-infringement', label: 'Trademark infringement standards', type: 'Case law', practiceAreas: ['ip', 'litigation'] },
  { id: 'noncompete-enforcement', label: 'Non-compete agreement enforcement', type: 'Case law', practiceAreas: ['employment', 'contracts'] },
] as const;

export function PersonalizationWizard({ isOpen, onComplete }: PersonalizationWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('Dan Barnard');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);
  const [selectedMonitoringTopics, setSelectedMonitoringTopics] = useState<string[]>([]);

  const handleNameSubmit = () => {
    // Store the name preference
    localStorage.setItem('cocounsel-user-name', name);
    setStep(2);
  };

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handlePracticeAreaToggle = (area: string) => {
    setSelectedPracticeAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleMonitoringTopicToggle = (topic: string) => {
    setSelectedMonitoringTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleComplete = () => {
    // Store the preferences
    localStorage.setItem('cocounsel-user-roles', JSON.stringify(selectedRoles));
    localStorage.setItem('cocounsel-user-practice-areas', JSON.stringify(selectedPracticeAreas));
    localStorage.setItem('cocounsel-monitoring-topics', JSON.stringify(selectedMonitoringTopics));
    localStorage.setItem('personalizationCompleted', 'true');
    onComplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 1) {
      handleNameSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#FCFCFC] z-[100] flex items-center justify-center"
        >
          <div className="max-w-xl w-full px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#D64000] to-[#FF7A3D] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white fill-white" />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Question text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-5"
                  >
                    <h2 className="text-[22px] leading-[1.4] text-[#1F1F1F] font-light">
                      Is {name} how I should refer to you? If not, you can change that now.
                    </h2>
                  </motion.div>

                  {/* Input field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="relative flex items-center bg-white rounded-2xl border-2 border-[#E0DDD7] hover:border-[#C5C1B8] focus-within:border-[#D64000] transition-colors">
                      {/* Avatar circle */}
                      <div className="ml-4 flex items-center justify-center w-10 h-10 bg-[#E8E6E0] rounded-full text-[#5D5D5D] font-medium text-sm">
                        {name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      
                      {/* Input */}
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-4 py-5 text-[17px] text-[#1F1F1F] bg-transparent outline-none placeholder-[#999]"
                        placeholder="Your name"
                      />
                      
                      {/* Submit button */}
                      <button
                        onClick={handleNameSubmit}
                        className="mr-3 w-10 h-10 bg-[#1d4b34] hover:bg-[#163829] rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowUp className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Question text */}
                  <div className="mb-6">
                    <h2 className="text-[24px] leading-[1.4] text-[#1F1F1F] font-light">
                      Good to meet you, {name.split(' ')[0]}. Which role best describes you?
                    </h2>
                    <p className="text-[15px] text-[#666] mt-2">
                      Select all that apply
                    </p>
                  </div>

                  {/* Role selection */}
                  <div className="space-y-2 mb-6">
                    {ROLE_OPTIONS.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all ${
                          selectedRoles.includes(role)
                            ? 'bg-[#e8f2ed] border-[#1d4b34] text-[#1d4b34]'
                            : 'bg-white border-[#E0DDD7] hover:border-[#C5C1B8] text-[#1F1F1F]'
                        }`}
                      >
                        <span className="text-[16px]">{role}</span>
                        {selectedRoles.includes(role) && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Continue button */}
                  <button
                    onClick={() => setStep(3)}
                    disabled={selectedRoles.length === 0}
                    className={`px-6 py-3 rounded-full text-[15px] font-medium transition-all ${
                      selectedRoles.length > 0
                        ? 'bg-[#1d4b34] hover:bg-[#163829] text-white'
                        : 'bg-[#E8E6E0] text-[#999] cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </motion.div>
              ) : step === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Question text */}
                  <div className="mb-6">
                    <h2 className="text-[24px] leading-[1.4] text-[#1F1F1F] font-light">
                      Which practice areas are you interested in?
                    </h2>
                    <p className="text-[15px] text-[#666] mt-2">
                      Select all that apply
                    </p>
                  </div>

                  {/* Practice area selection - wrapped cloud layout */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {PRACTICE_AREAS.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => handlePracticeAreaToggle(area.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${
                          selectedPracticeAreas.includes(area.id)
                            ? 'bg-[#e8f2ed] border-[#1d4b34] text-[#1d4b34]'
                            : 'bg-white border-[#E0DDD7] hover:border-[#C5C1B8] text-[#1F1F1F]'
                        }`}
                      >
                        <area.icon className="w-4 h-4" />
                        <span className="text-[14px]">{area.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Continue button */}
                  <button
                    onClick={() => setStep(4)}
                    disabled={selectedPracticeAreas.length === 0}
                    className={`px-6 py-3 rounded-full text-[15px] font-medium transition-all ${
                      selectedPracticeAreas.length > 0
                        ? 'bg-[#1d4b34] hover:bg-[#163829] text-white'
                        : 'bg-[#E8E6E0] text-[#999] cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Question text */}
                  <div className="mb-6">
                    <h2 className="text-[24px] leading-[1.4] text-[#1F1F1F] font-light">
                      Which legal developments should I monitor for you?
                    </h2>
                    <p className="text-[15px] text-[#666] mt-2">
                      Get notified about new cases, regulations, and guidance in these areas
                    </p>
                  </div>

                  {/* Monitoring topics selection - list layout with icons */}
                  <div className="space-y-2 mb-6 max-h-[400px] overflow-y-auto">
                    {MONITORING_TOPICS
                      .filter((topic) => 
                        selectedPracticeAreas.length === 0 || 
                        topic.practiceAreas.some((area) => selectedPracticeAreas.includes(area))
                      )
                      .map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleMonitoringTopicToggle(topic.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all ${
                          selectedMonitoringTopics.includes(topic.id)
                            ? 'bg-[#e8f2ed] border-[#1d4b34] text-[#1d4b34]'
                            : 'bg-white border-[#E0DDD7] hover:border-[#C5C1B8] text-[#1F1F1F]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Bell className={`w-4 h-4 ${
                            selectedMonitoringTopics.includes(topic.id)
                              ? 'text-[#1d4b34]'
                              : 'text-[#999]'
                          }`} />
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-[15px]">{topic.label}</span>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                              topic.type === 'Regulatory' 
                                ? 'bg-[#E8F4FF] text-[#0066CC]' 
                                : 'bg-[#FFF4E6] text-[#CC6600]'
                            }`}>
                              {topic.type}
                            </span>
                          </div>
                        </div>
                        {selectedMonitoringTopics.includes(topic.id) && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Skip or Continue */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleComplete}
                      className="px-6 py-3 rounded-full text-[15px] font-medium text-[#666] hover:text-[#1F1F1F] transition-colors"
                    >
                      Skip for now
                    </button>
                    <button
                      onClick={handleComplete}
                      disabled={selectedMonitoringTopics.length === 0}
                      className={`flex-1 px-6 py-3 rounded-full text-[15px] font-medium transition-all ${
                        selectedMonitoringTopics.length > 0
                          ? 'bg-[#1d4b34] hover:bg-[#163829] text-white'
                          : 'bg-[#E8E6E0] text-[#999] cursor-not-allowed'
                      }`}
                    >
                      Start working
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}