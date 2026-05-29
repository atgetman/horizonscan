import { useState, useRef, useEffect } from "react";
import { User, Palette, Bell, Camera, ChevronDown, ChevronUp, X, Check, MousePointer2 } from "lucide-react";
import { clsx } from "clsx";

type PreferenceTab = "profile" | "appearance" | "notifications";

const PRACTICE_AREAS = [
  "Litigation",
  "Corporate Law",
  "Contracts",
  "Intellectual Property",
  "Employment Law",
  "Real Estate",
  "Tax Law",
  "Regulatory Compliance",
  "M&A",
];

const ROLE_OPTIONS = [
  "Lawyer",
  "Knowledge Manager",
  "Admin",
  "Judge",
  "Paralegal",
  "Compliance Officer",
];

const REGION_OPTIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "European Union",
];

const LANGUAGE_OPTIONS = [
  "English (US)",
  "English (UK)",
  "Spanish",
  "French",
  "German",
];

const navItems: { id: PreferenceTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function Preferences() {
  const [activeTab, setActiveTab] = useState<PreferenceTab>("profile");

  return (
    <div className="flex-1 h-full flex bg-[#FCFCFC] overflow-hidden">
      {/* Left nav column */}
      <div className="w-[280px] min-[1440px]:w-[328px] bg-[#fcfcfc] border-r border-[#E5E5E5] flex flex-col shrink-0">
        <div className="px-4 pt-6 pb-4">
          <h2 className="text-[20px] font-medium text-[#212223] leading-snug">
            Preferences
          </h2>
        </div>
        <nav className="px-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors text-left",
                  isActive
                    ? "bg-gray-100 text-[#212223] font-semibold"
                    : "text-[#212223] hover:bg-gray-100 font-normal"
                )}
              >
                <item.icon className="size-[18px] shrink-0" strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content column */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-[32px] pt-[50px] pb-16">
          {activeTab === "profile" && <ProfilePanel />}
          {activeTab === "appearance" && <AppearancePanel />}
          {activeTab === "notifications" && <NotificationsPanel />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Shared building blocks ---------------- */

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1] mb-8">
      {children}
    </h1>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 mb-6">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[18px] font-['Clario'] font-medium text-[#212223] mb-6">
      {children}
    </h3>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35] mb-1.5">
      {children}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 bg-white border border-[#d2d2d2] rounded-lg px-3.5 text-[15px] font-['Source_Sans_3'] text-[#212223] focus:outline-none focus:border-gray-400"
      />
    </div>
  );
}

function PracticeAreaSelect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (area: string) => {
    onChange(
      selected.includes(area)
        ? selected.filter((a) => a !== area)
        : [...selected, area]
    );
  };

  const remove = (area: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((a) => a !== area));
  };

  return (
    <div>
      <FieldLabel>Practice area</FieldLabel>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={clsx(
            "w-full min-h-11 bg-white border rounded-lg px-3 py-1.5 flex items-center justify-between gap-2 transition-colors",
            open ? "border-[#1D4B34]" : "border-[#d2d2d2] hover:border-gray-400"
          )}
        >
          <span className="flex flex-wrap items-center gap-1.5">
            {selected.length === 0 ? (
              <span className="text-[15px] font-['Source_Sans_3'] text-[#666666]">
                Select practice areas
              </span>
            ) : (
              selected.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 bg-[#edf2f0] text-[#1d4b34] text-[14px] font-['Source_Sans_3'] rounded-md px-2 py-1"
                >
                  {area}
                  <X
                    className="size-3.5 cursor-pointer"
                    strokeWidth={2}
                    onClick={(e) => remove(area, e)}
                  />
                </span>
              ))
            )}
          </span>
          {open ? (
            <ChevronUp className="size-4 text-[#666666] shrink-0" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="size-4 text-[#666666] shrink-0" strokeWidth={1.5} />
          )}
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-1 max-h-72 overflow-y-auto">
            {PRACTICE_AREAS.map((area) => {
              const isSelected = selected.includes(area);
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggle(area)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                >
                  {area}
                  {isSelected && (
                    <Check className="size-4 text-[#1d4b34]" strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={clsx(
            "w-full h-11 bg-white border rounded-lg px-3.5 flex items-center justify-between text-[15px] font-['Source_Sans_3'] text-[#212223] transition-colors",
            open ? "border-[#1D4B34]" : "border-[#d2d2d2] hover:border-gray-400"
          )}
        >
          <span>{value}</span>
          {open ? (
            <ChevronUp className="size-4 text-[#666666] shrink-0" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="size-4 text-[#666666] shrink-0" strokeWidth={1.5} />
          )}
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-1 max-h-72 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
              >
                {option}
                {value === option && (
                  <Check className="size-4 text-[#1d4b34]" strokeWidth={2.5} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Profile ---------------- */

type ProfileForm = {
  name: string;
  email: string;
  title: string;
  organization: string;
  practiceAreas: string[];
  role: string;
  region: string;
  language: string;
};

const INITIAL_PROFILE: ProfileForm = {
  name: "Alex Johnson",
  email: "alex.johnson@lawfirm.com",
  title: "Senior Associate",
  organization: "Hartwell & Partners LLP",
  practiceAreas: ["Litigation"],
  role: "Lawyer",
  region: "United States",
  language: "English (US)",
};

function ProfilePanel() {
  const [savedForm, setSavedForm] = useState<ProfileForm>(INITIAL_PROFILE);
  const [form, setForm] = useState<ProfileForm>(INITIAL_PROFILE);

  const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

  const update = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => setSavedForm(form);
  const handleDiscard = () => setForm(savedForm);

  return (
    <div className={clsx(isDirty && "pb-24")}>
      <PanelTitle>Profile</PanelTitle>

      <Card>
        <SectionHeading>Photo</SectionHeading>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="size-20 rounded-full bg-[#1D4B34] flex items-center justify-center text-white text-[24px] font-['Clario'] font-medium">
              AG
            </div>
            <div className="absolute bottom-0 right-0 size-7 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center shadow-sm">
              <Camera className="size-3.5 text-[#666666]" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-[15px] font-['Source_Sans_3'] font-medium text-[#212223]">
              Upload a photo
            </p>
            <p className="text-[14px] font-['Source_Sans_3'] text-[#666666] mt-0.5">
              JPG, PNG or GIF · Max 5 MB
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeading>Personal information</SectionHeading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <TextField label="Name" value={form.name} onChange={(v) => update("name", v)} />
          <TextField label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <TextField label="Title" value={form.title} onChange={(v) => update("title", v)} />
          <TextField
            label="Organization"
            value={form.organization}
            onChange={(v) => update("organization", v)}
          />
        </div>
      </Card>

      <Card>
        <SectionHeading>Professional information</SectionHeading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <PracticeAreaSelect
            selected={form.practiceAreas}
            onChange={(v) => update("practiceAreas", v)}
          />
          <SelectField
            label="Role"
            options={ROLE_OPTIONS}
            value={form.role}
            onChange={(v) => update("role", v)}
          />
        </div>
      </Card>

      <Card>
        <SectionHeading>Region &amp; language</SectionHeading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <SelectField
            label="Region"
            options={REGION_OPTIONS}
            value={form.region}
            onChange={(v) => update("region", v)}
          />
          <SelectField
            label="Language"
            options={LANGUAGE_OPTIONS}
            value={form.language}
            onChange={(v) => update("language", v)}
          />
        </div>
      </Card>

      {isDirty && (
        <div className="fixed bottom-0 left-[340px] min-[1440px]:left-[388px] right-0 z-30 border-t border-[#E5E5E5] bg-white/95 backdrop-blur-sm">
          <div className="max-w-[1100px] mx-auto px-[32px] py-3.5 flex items-center justify-end gap-4">
            <div className="flex items-center justify-end gap-3">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                    <p className="leading-[1.35]">Discard</p>
                  </div>
                </button>
              </div>
              <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
                <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  type="button"
                  onClick={handleSave}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                    <p className="leading-[1.35]">Save changes</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Appearance ---------------- */

function AppearancePanel() {
  const [contrast, setContrast] = useState<"default" | "high">("default");

  const options: { id: "default" | "high"; label: string }[] = [
    { id: "default", label: "Default contrast" },
    { id: "high", label: "High contrast" },
  ];

  return (
    <>
      <PanelTitle>Appearance</PanelTitle>
      <Card>
        <SectionHeading>Color contrast</SectionHeading>
        <p className="text-[15px] font-['Source_Sans_3'] text-[#666666] -mt-3 mb-6">
          Adjusts the borders and backgrounds of interactive elements in CoCounsel.
        </p>
        <div className="flex gap-4">
          {options.map((option) => {
            const isActive = contrast === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setContrast(option.id)}
                className={clsx(
                  "w-[180px] h-[150px] rounded-xl border flex flex-col items-center justify-center gap-5 transition-colors",
                  isActive
                    ? "border-[#1D4B34] bg-[#f0f2f1]"
                    : "border-[#E5E5E5] bg-white hover:border-gray-300"
                )}
              >
                <MousePointer2 className="size-9 text-[#212223]" strokeWidth={1.25} />
                <span className="text-[15px] font-['Source_Sans_3'] font-medium text-[#212223]">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </Card>
    </>
  );
}

/* ---------------- Notifications ---------------- */

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative w-11 h-6 rounded-full transition-colors shrink-0",
        checked ? "bg-[#1D4B34]" : "bg-[#d2d2d2]"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 left-0.5 size-5 bg-white rounded-full flex items-center justify-center transition-transform",
          checked && "translate-x-5"
        )}
      >
        {checked && <Check className="size-3 text-[#1D4B34]" strokeWidth={3} />}
      </span>
    </button>
  );
}

function NotificationRow({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223]">
          {title}
        </p>
        <p className="text-[14px] font-['Source_Sans_3'] text-[#666666] mt-1">
          {description}
        </p>
      </div>
      <ToggleSwitch checked={checked} onChange={setChecked} />
    </div>
  );
}

function NotificationsPanel() {
  return (
    <>
      <PanelTitle>Notifications</PanelTitle>

      <Card>
        <SectionHeading>In-app notifications</SectionHeading>
        <div className="flex flex-col gap-6">
          <NotificationRow
            title="Sounds"
            description="Play a sound when tasks complete or need attention on a different page or while you're in a different application."
            defaultChecked
          />
          <NotificationRow
            title="Alert cards"
            description="Show notification cards when tasks complete or require your input on a different page."
            defaultChecked
          />
        </div>
      </Card>

      <Card>
        <SectionHeading>Email notifications</SectionHeading>
        <div className="flex flex-col gap-6">
          <NotificationRow
            title="Tabular Analysis"
            description="Receive an email when a Tabular Analysis task completes or requires your attention."
            defaultChecked
          />
          <NotificationRow
            title="Deep research"
            description="Receive an email when a Deep research task completes or requires your attention."
            defaultChecked={false}
          />
        </div>
      </Card>
    </>
  );
}
