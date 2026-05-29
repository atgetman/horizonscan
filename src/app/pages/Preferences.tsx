import { useState } from "react";
import { User, Palette, Bell, Camera, ChevronDown, X, Check, MousePointer2 } from "lucide-react";
import { clsx } from "clsx";

type PreferenceTab = "profile" | "appearance" | "notifications";

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
      <div className="w-[340px] shrink-0 border-r border-[#E5E5E5] flex flex-col pt-[50px] px-8">
        <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1] mb-8">
          Preferences
        </h1>
        <nav className="flex flex-col gap-1">
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
    <h2 className="text-[26px] font-['Clario'] font-medium text-[#212223] leading-[1.1] mb-8">
      {children}
    </h2>
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
    <h3 className="text-[18px] font-['Source_Sans_3'] font-semibold text-[#212223] mb-6">
      {children}
    </h3>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[14px] font-['Source_Sans_3'] text-[#666666] mb-1.5">
      {children}
    </label>
  );
}

function TextField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full h-11 bg-white border border-[#d2d2d2] rounded-lg px-3.5 text-[15px] font-['Source_Sans_3'] text-[#212223] focus:outline-none focus:border-gray-400"
      />
    </div>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <button className="w-full h-11 bg-white border border-[#d2d2d2] rounded-lg px-3.5 flex items-center justify-between text-[15px] font-['Source_Sans_3'] text-[#212223] hover:border-gray-400 transition-colors">
        <span>{value}</span>
        <ChevronDown className="size-4 text-[#666666]" strokeWidth={1.5} />
      </button>
    </div>
  );
}

/* ---------------- Profile ---------------- */

function ProfilePanel() {
  return (
    <>
      <PanelTitle>Profile</PanelTitle>

      <Card>
        <SectionHeading>Photo</SectionHeading>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="size-20 rounded-full bg-[#1D4B34] flex items-center justify-center text-white text-[24px] font-['Source_Sans_3'] font-medium">
              AJ
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
          <TextField label="Name" defaultValue="Alex Johnson" />
          <TextField label="Email" defaultValue="alex.johnson@lawfirm.com" />
          <TextField label="Title" defaultValue="Senior Associate" />
          <TextField label="Organization" defaultValue="Hartwell & Partners LLP" />
        </div>
      </Card>

      <Card>
        <SectionHeading>Professional information</SectionHeading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <FieldLabel>Practice area</FieldLabel>
            <button className="w-full min-h-11 bg-white border border-[#d2d2d2] rounded-lg px-3 flex items-center justify-between hover:border-gray-400 transition-colors">
              <span className="inline-flex items-center gap-1.5 bg-[#f0f2f1] text-[#314b3e] text-[14px] font-['Source_Sans_3'] rounded-md px-2 py-1">
                Litigation
                <X className="size-3.5" strokeWidth={2} />
              </span>
              <ChevronDown className="size-4 text-[#666666]" strokeWidth={1.5} />
            </button>
          </div>
          <SelectField label="Role" value="Associate Attorney" />
        </div>
      </Card>

      <Card>
        <SectionHeading>Region &amp; language</SectionHeading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <SelectField label="Region" value="United States" />
          <SelectField label="Language" value="English (US)" />
        </div>
      </Card>
    </>
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
