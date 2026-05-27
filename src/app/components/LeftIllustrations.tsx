import {
  Sparkles,
  FileText,
  Folder,
  BookOpen,
  Scale,
  Workflow,
  Plug,
  Users,
  FileSearch,
} from 'lucide-react';

export function LeftIllustrations() {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1d4b34]/5 via-[#D64000]/5 to-[#1d4b34]/5"></div>
      
      {/* Concentric circles - scaled moderately */}
      {/* Outermost circle */}
      <div 
        className="absolute w-[380px] h-[380px] rounded-full border"
        style={{
          borderColor: 'rgba(214, 64, 0, 0.15)',
          boxShadow: '0 0 20px rgba(214, 64, 0, 0.08)'
        }}
      ></div>
      
      {/* Middle circle */}
      <div 
        className="absolute w-[260px] h-[260px] rounded-full border"
        style={{
          borderColor: 'rgba(214, 64, 0, 0.2)',
          boxShadow: '0 0 15px rgba(214, 64, 0, 0.1)'
        }}
      ></div>
      
      {/* Inner circle */}
      <div 
        className="absolute w-[155px] h-[155px] rounded-full border"
        style={{
          borderColor: 'rgba(214, 64, 0, 0.25)',
          boxShadow: '0 0 10px rgba(214, 64, 0, 0.12)'
        }}
      ></div>
      
      {/* Center icon - Large sparkles */}
      <div className="absolute bg-gradient-to-br from-[#D64000] to-[#b83700] p-3 rounded-xl shadow-lg z-10">
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      
      {/* Icons positioned along orbital paths - scaled moderately */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Inner circle icons - radius 77px (scaled from 65px by 1.18x) */}
        <div className="absolute top-0 left-[77px] -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-lg shadow-md">
          <FileText className="w-5 h-5 text-[#D64000]" />
        </div>
        
        <div className="absolute top-[-26px] left-[-71px] -translate-x-1/2 -translate-y-1/2 bg-[#1d4b34] p-2.5 rounded-lg shadow-lg">
          <Scale className="w-5 h-5 text-white" />
        </div>
        
        {/* Middle circle icons - radius 130px (scaled from 110px by 1.18x) */}
        <div className="absolute top-[-123px] left-[45px] -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-lg shadow-lg">
          <BookOpen className="w-5 h-5 text-[#D64000]" />
        </div>
        
        <div className="absolute top-[122px] left-[-45px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#D64000] to-[#b83700] p-2.5 rounded-lg shadow-lg">
          <Folder className="w-5 h-5 text-white" />
        </div>
        
        {/* Outer circle icons - radius 190px (scaled from 160px by 1.19x) */}
        <div className="absolute top-[-122px] left-[-146px] -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-lg shadow-lg">
          <Workflow className="w-5 h-5 text-[#D64000]" />
        </div>
        
        <div className="absolute top-[122px] left-[146px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#1d4b34] to-[#163d2a] p-2.5 rounded-lg shadow-lg">
          <Plug className="w-5 h-5 text-white" />
        </div>
        
        <div className="absolute top-[-122px] left-[146px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#1d4b34] to-[#163d2a] p-2.5 rounded-lg shadow-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        
        <div className="absolute top-[90px] left-[90px] -translate-x-1/2 -translate-y-1/2 bg-white p-2.5 rounded-lg shadow-md">
          <FileSearch className="w-5 h-5 text-[#D64000]" />
        </div>
      </div>
    </div>
  );
}