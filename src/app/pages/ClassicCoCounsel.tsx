import { useNavigate } from 'react-router';
import {
  Sparkles,
  ArrowLeftFromLine,
  Plus,
  Folder,
  Table2,
  Search,
  Database,
  LayoutGrid,
  CircleUser,
  Paperclip,
  BookOpen,
  ChevronDown,
  ArrowUp,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { BetaPromoModal } from '../components/BetaPromoModal';
import { LoadingInterstitial } from '../components/LoadingInterstitial';
import { PersonalizationWizard } from '../components/PersonalizationWizard';
import ToggleInactive from '../../imports/Container-3417-35';

// ============ SIDEBAR COMPONENTS ============

function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['Clario:Medium',sans-serif] gap-[2px] items-start justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap">
      <div className="flex flex-col justify-end relative shrink-0 text-[#212223]">
        <p className="leading-none">Thomson Reuters®</p>
      </div>
      <div className="flex flex-col justify-end relative shrink-0 text-[#d64000]">
        <p className="leading-none">CoCounsel</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="brand-header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between pb-[8px] pt-[12px] px-[12px] relative w-full">
          <Frame />
          <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0 z-[1]">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[16px]">
              <ArrowLeftFromLine className="size-4 text-[#666]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewChatButton() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full">
      <div className="bg-[#1d4b34] content-stretch flex h-[32px] items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 w-full">
        <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          <div className="content-stretch flex items-center relative shrink-0">
            <Plus className="size-4 text-[#f7f7f7]" />
          </div>
          <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] whitespace-nowrap">
            <p className="leading-[1.2]">New chat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavMenuItem({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="bg-[rgba(252,252,252,0)] content-stretch flex items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]">
        <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          {icon && (
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]">
              {icon}
            </div>
          )}
          <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
            <p className="leading-[1.2]">{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreMenuItem() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative size-full">
              <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]">
                <LayoutGrid className="size-3.5 text-[#212223]" />
              </div>
              <div className="flex flex-[1_0_0] flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#212223] text-[15px]">
                <p className="leading-[1.2] whitespace-pre-wrap">More</p>
              </div>
              <div className="content-stretch flex items-center justify-center relative shrink-0">
                <ChevronRight className="size-3 text-[#212223]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavMenu() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start py-[4px] relative shrink-0 w-full">
      <NavMenuItem icon={<Folder className="size-3.5 text-[#212223]" />}>Matters</NavMenuItem>
      <NavMenuItem icon={<Table2 className="size-3.5 text-[#212223]" />}>Tabular analysis</NavMenuItem>
      <NavMenuItem icon={<Search className="size-3.5 text-[#212223]" />}>Knowledge search</NavMenuItem>
      <NavMenuItem icon={<Database className="size-3.5 text-[#212223]" />}>Databases</NavMenuItem>
      <MoreMenuItem />
    </div>
  );
}

function RecentChatItem({ text }: { text: string }) {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-full">
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start px-[9px] py-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.35] overflow-hidden">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentChats() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full">
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[8px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black w-full">
            <p className="leading-[1.35] whitespace-pre-wrap">Recent chats</p>
          </div>
        </div>
      </div>
      <RecentChatItem text="NDA uploaded for doc compliance validatio..." />
      <RecentChatItem text="Limited liability in Florida" />
      <RecentChatItem text="Researching employee rights" />
      <RecentChatItem text="Limited liability in New York" />
      <RecentChatItem text="Researching human rights" />
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[24px] pt-[8px] px-[5px] relative rounded-[4px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center p-[4px] relative rounded-[4px] shrink-0">
          <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
            <p className="decoration-solid leading-[1.35] underline">View all chats</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="h-px overflow-clip relative shrink-0 w-[208px]">
        <div className="absolute bg-[#e5e5e5] h-px left-0 right-0 top-0" />
      </div>
      <div className="content-stretch flex items-start py-[4px] relative shrink-0 w-full">
        <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative rounded-[4px]">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
          <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative size-full">
                <div className="content-stretch flex items-center justify-center relative shrink-0 size-[16px]">
                  <CircleUser className="size-5 text-[#212223]" />
                </div>
                <div className="content-stretch flex flex-col items-center justify-center leading-[0] not-italic relative shrink-0 text-[#212223]">
                  <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center relative shrink-0 text-[14px] w-[168px]">
                    <p className="leading-[1.2] whitespace-pre-wrap">Jane Lawson</p>
                  </div>
                  <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center relative shrink-0 text-[11px] w-[168px]">
                    <p className="leading-[1.2] whitespace-pre-wrap">United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideNavMenu() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start px-[12px] py-[8px] relative size-full">
          <NewChatButton />
          <NavMenu />
          <div className="h-px overflow-clip relative shrink-0 w-full">
            <div className="absolute bg-[#e5e5e5] h-px left-0 right-0 top-0" />
          </div>
          <RecentChats />
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

function RefreshGlobalSideNav() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex flex-col items-start pb-[2px] relative h-full w-[232px] shrink-0">
      <div aria-hidden="true" className="absolute border-0 border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <BrandHeader />
      <SideNavMenu />
    </div>
  );
}

// ============ MAIN CONTENT COMPONENTS ============

function Header() {
  return (
    <div className="content-stretch flex items-center justify-center shrink-0 w-full">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px relative">
        <p className="bg-clip-text bg-gradient-to-r font-['Clario:Medium',sans-serif] from-[#345343] leading-[1.1] not-italic relative shrink-0 text-[40px] to-[#236c48] to-[84.619%]" style={{ WebkitTextFillColor: "transparent" }}>
          Hello, Alex
        </p>
      </div>
    </div>
  );
}

function TextAreaField() {
  return (
    <div className="bg-white relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[12px] py-[8px] relative w-full">
          <div className="flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px relative text-[#666] text-[16px] whitespace-pre-wrap">
            <p className="mb-0">
              Ask CoCounsel to perform any legal task...
              <br aria-hidden="true" />
              <br aria-hidden="true" />
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#919191] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
    </div>
  );
}

function LeftActions() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          <div className="content-stretch flex items-center relative shrink-0">
            <Paperclip className="size-3.5 text-[#404040]" />
          </div>
          <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
            <p className="leading-[1.2]">Attach</p>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.01)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          <div className="content-stretch flex items-center relative shrink-0">
            <BookOpen className="size-3.5 text-[#404040]" />
          </div>
          <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
            <p className="leading-[1.2]">Library</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightSend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
        <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
          <div className="flex flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
            <p className="leading-[1.2]">CoCounsel 2.0</p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0">
            <ChevronDown className="size-3.5 text-[#212223]" />
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0">
        <div className="bg-[#314b3e] content-stretch flex items-center justify-center p-[6px] relative rounded-[100px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
          <ArrowUp className="size-4 text-white" />
        </div>
      </div>
    </div>
  );
}

function DrawerButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[32px] items-start justify-between min-h-px min-w-px relative">
      <LeftActions />
      <RightSend />
    </div>
  );
}

function PromptDrawer() {
  return (
    <div className="bg-white h-[39px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#919191] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4px] px-[8px] relative size-full">
          <DrawerButtons />
        </div>
      </div>
    </div>
  );
}

function CoCoPromptMfe() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] isolate items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]">
            <TextAreaField />
          </div>
        </div>
      </div>
      <div className="h-0 shrink-0 w-full" />
      <PromptDrawer />
    </div>
  );
}

function ChatPromptDesktopFa() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[750px]">
      <CoCoPromptMfe />
    </div>
  );
}

function PromoCard() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-[510px]">
      <div className="relative rounded-[8px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[12px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
              <div className="bg-[#de6633] content-stretch flex gap-[4px] items-center justify-center min-h-[24px] overflow-clip px-[8px] py-[2px] relative rounded-[100px] shrink-0">
                <div className="content-stretch flex items-start relative shrink-0">
                  <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-white whitespace-nowrap">
                    <p className="leading-[1.35]">New</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-col font-['Clario:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#404040] text-[0px]">
                <p className="text-[14px] whitespace-pre-wrap">
                  <span className="font-['Clario:Medium',sans-serif] leading-[1.2] text-[#212223]">Try CoCounsel Beta: </span>
                  <span className="font-['Source_Sans_Pro:Regular',sans-serif] leading-[1.2]">Our all-new assistant completes multiple tasks in a single request and understands context from projects files.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetaToggle({ onToggle }: { onToggle: () => void }) {
  const handleToggle = () => {
    localStorage.setItem('cocounsel-version', 'beta');
    onToggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 right-6 flex items-center gap-1.5 bg-white px-3 py-2.5 rounded-full border border-gray-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow z-40"
      onClick={handleToggle}
    >
      <Sparkles className="size-3.5 text-[#D64000] fill-[#D64000]" />
      <span className="text-sm font-medium text-gray-700">Try new CoCounsel</span>
    </motion.div>
  );
}

function ChatThread({ onBetaToggle }: { onBetaToggle: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center pt-[192px] relative shrink-0 w-full">
      <Header />
      <ChatPromptDesktopFa />
      <PromoCard />
      <BetaToggle onToggle={onBetaToggle} />
    </div>
  );
}

function Body({ onBetaToggle }: { onBetaToggle: () => void }) {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative self-stretch shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]">
      <ChatThread onBetaToggle={onBetaToggle} />
    </div>
  );
}

export function ClassicCoCounsel() {
  const navigate = useNavigate();
  const [showBetaPromo, setShowBetaPromo] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const handleTryNow = () => {
    localStorage.setItem('cocounsel-version', 'beta');
    setShowBetaPromo(false);
    setShowLoading(true);
  };

  const handleAskLater = () => {
    setShowBetaPromo(false);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowWizard(true);
  };

  const handleWizardComplete = () => {
    navigate('/?from=now');
  };

  return (
    <div className="bg-white flex h-screen w-full overflow-hidden relative">
      {/* Version Toggle */}
      {!showLoading && !showWizard && (
        <div
          onClick={handleTryNow}
          className="absolute top-4 right-6 w-[214px] h-[42px] z-50 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <ToggleInactive />
        </div>
      )}

      {/* Hide main content when loading or wizard is showing */}
      {!showLoading && !showWizard && (
        <>
          <RefreshGlobalSideNav />
          <Body onBetaToggle={handleTryNow} />
        </>
      )}
      <BetaPromoModal
        isOpen={showBetaPromo}
        onClose={handleAskLater}
        onTryNow={handleTryNow}
      />
      {showLoading && <LoadingInterstitial onComplete={handleLoadingComplete} />}
      <PersonalizationWizard isOpen={showWizard} onComplete={handleWizardComplete} />
    </div>
  );
}