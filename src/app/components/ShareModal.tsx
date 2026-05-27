import { X, UserPlus, Link as LinkIcon, Check, ChevronDown, Pencil, Eye, EyeOff, ArrowLeft, Building2, ChevronRight, Link2, Globe, Folder, Users, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType?: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab';
  isPrompt?: boolean;
  initialMode?: 'share' | 'manage';
}

type Permission = 'owner' | 'edit';

interface SharedUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  permission: Permission;
}

// Mock user list for autocomplete
const AVAILABLE_USERS = [
  { id: '1', email: 'sarah.chen@lawfirm.com', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', email: 'michael.torres@lawfirm.com', name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '3', email: 'emma.wilson@lawfirm.com', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '4', email: 'james.rodriguez@lawfirm.com', name: 'James Rodriguez', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '5', email: 'olivia.kim@lawfirm.com', name: 'Olivia Kim', avatar: 'https://i.pravatar.cc/150?img=9' },
];

const PERMISSION_OPTIONS: { value: Permission; label: string; sublabel: string; icon: typeof Pencil }[] = [
  { value: 'edit', label: 'Can edit', sublabel: 'Can edit files, add files, and create chats', icon: Pencil },
  { value: 'owner', label: 'Owner', sublabel: 'Can edit, add users, and manage permissions', icon: UserPlus },
];

// Filter permissions for prompts (exclude 'review' and 'no-download')
const getPermissionOptions = (isPrompt: boolean) => {
  // For all cases, return both edit and owner
  return PERMISSION_OPTIONS;
};

type LinkAccessLevel = 'anyone' | 'organization' | 'project' | 'restricted';

const getLinkAccessOptions = (itemType: ShareModalProps['itemType'], isPrompt: boolean = false) => {
  // For prompts, only show organization and restricted
  if (isPrompt) {
    return [
      { value: 'organization' as LinkAccessLevel, label: 'Anyone in your organization', icon: Building2 },
      { value: 'restricted' as LinkAccessLevel, label: 'Only people in access list', icon: Users },
    ];
  }
  
  const baseOptions = [
    { value: 'anyone' as LinkAccessLevel, label: 'Anyone', icon: Globe },
    { value: 'organization' as LinkAccessLevel, label: 'Anyone in your organization', icon: Building2 },
  ];
  
  // Only show "Anyone in the project" for items inside projects (not for matters/projects themselves)
  if (itemType !== 'matter') {
    baseOptions.push({ value: 'project' as LinkAccessLevel, label: 'Anyone in the project', icon: Folder });
  }
  
  baseOptions.push({ value: 'restricted' as LinkAccessLevel, label: 'Only people in access list', icon: Users });
  
  return baseOptions;
};

export function ShareModal({ isOpen, onClose, itemName, itemType = 'document', isPrompt = false, initialMode = 'share' }: ShareModalProps) {
  console.log('ShareModal render - isOpen:', isOpen, 'itemName:', itemName);
  
  const [mode, setMode] = useState<'share' | 'manage'>('share');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [pendingUsers, setPendingUsers] = useState<SharedUser[]>([]);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    { id: '0', email: 'you@lawfirm.com', name: 'You (Owner)', avatar: 'https://i.pravatar.cc/150?img=12', permission: 'owner' },
    { id: '1', email: 'sarah.chen@lawfirm.com', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1', permission: 'edit' },
    { id: '2', email: 'michael.torres@lawfirm.com', name: 'Michael Torres', avatar: 'https://i.pravatar.cc/150?img=3', permission: 'edit' },
  ]);
  const [defaultPermission, setDefaultPermission] = useState<Permission>('edit');
  const [orgPermission, setOrgPermission] = useState<Permission>('edit');
  const [linkAccessLevel, setLinkAccessLevel] = useState<LinkAccessLevel>('restricted');
  const [linkPermission, setLinkPermission] = useState<Permission>('edit');
  const [showPermissionDropdown, setShowPermissionDropdown] = useState(false);
  const [showOrgPermissionDropdown, setShowOrgPermissionDropdown] = useState(false);
  const [showLinkAccessDropdown, setShowLinkAccessDropdown] = useState(false);
  const [showLinkPermissionDropdown, setShowLinkPermissionDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [manageInputValue, setManageInputValue] = useState('');
  const [showManageSuggestions, setShowManageSuggestions] = useState(false);
  
  const permissionButtonRef = useRef<HTMLButtonElement>(null);
  const permissionDropdownRef = useRef<HTMLDivElement>(null);
  const orgPermissionButtonRef = useRef<HTMLButtonElement>(null);
  const orgPermissionDropdownRef = useRef<HTMLDivElement>(null);
  const linkAccessButtonRef = useRef<HTMLButtonElement>(null);
  const linkAccessDropdownRef = useRef<HTMLDivElement>(null);
  const linkPermissionButtonRef = useRef<HTMLButtonElement>(null);
  const linkPermissionDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const manageInputRef = useRef<HTMLInputElement>(null);
  const manageSuggestionsRef = useRef<HTMLDivElement>(null);

  // Reset mode when modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setPendingUsers([]);
      setInputValue('');
      setMessage('');
      
      // Set defaults based on whether it's a prompt
      if (isPrompt) {
        setLinkAccessLevel('restricted');
        setLinkPermission('view');
      } else {
        // Set default link access level and permission based on item type
        const isOutputFileOrFolder = itemType === 'output' || itemType === 'file' || itemType === 'folder';
        const isProjectItem = itemType !== 'matter'; // Everything except matters/projects
        setLinkAccessLevel(isProjectItem ? 'project' : 'restricted');
        setLinkPermission(isOutputFileOrFolder ? 'review' : 'view');
      }
    }
  }, [isOpen, itemType, isPrompt, initialMode]);

  // Filter suggestions based on input
  const suggestions = AVAILABLE_USERS.filter(user => 
    !sharedUsers.some(su => su.id === user.id) &&
    !pendingUsers.some(pu => pu.id === user.id) &&
    (user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
     user.name.toLowerCase().includes(inputValue.toLowerCase()))
  );

  // Filter suggestions for manage input
  const manageSuggestions = AVAILABLE_USERS.filter(user => 
    !sharedUsers.some(su => su.id === user.id) &&
    (user.email.toLowerCase().includes(manageInputValue.toLowerCase()) ||
     user.name.toLowerCase().includes(manageInputValue.toLowerCase()))
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        permissionDropdownRef.current &&
        !permissionDropdownRef.current.contains(e.target as Node) &&
        permissionButtonRef.current &&
        !permissionButtonRef.current.contains(e.target as Node)
      ) {
        setShowPermissionDropdown(false);
        setEditingUserId(null);
      }

      if (
        orgPermissionDropdownRef.current &&
        !orgPermissionDropdownRef.current.contains(e.target as Node) &&
        orgPermissionButtonRef.current &&
        !orgPermissionButtonRef.current.contains(e.target as Node)
      ) {
        setShowOrgPermissionDropdown(false);
      }

      if (
        linkAccessDropdownRef.current &&
        !linkAccessDropdownRef.current.contains(e.target as Node) &&
        linkAccessButtonRef.current &&
        !linkAccessButtonRef.current.contains(e.target as Node)
      ) {
        setShowLinkAccessDropdown(false);
      }

      if (
        linkPermissionDropdownRef.current &&
        !linkPermissionDropdownRef.current.contains(e.target as Node) &&
        linkPermissionButtonRef.current &&
        !linkPermissionButtonRef.current.contains(e.target as Node)
      ) {
        setShowLinkPermissionDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset link copied state after 2 seconds
  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => setLinkCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  const handleAddUser = (user: typeof AVAILABLE_USERS[0]) => {
    setPendingUsers([...pendingUsers, { ...user, permission: defaultPermission }]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemovePendingUser = (userId: string) => {
    setPendingUsers(pendingUsers.filter(user => user.id !== userId));
  };

  const handleAddByEmail = () => {
    if (inputValue && inputValue.includes('@')) {
      const newUser: SharedUser = {
        id: `custom-${Date.now()}`,
        email: inputValue,
        name: inputValue.split('@')[0],
        permission: defaultPermission
      };
      setPendingUsers([...pendingUsers, newUser]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleUpdatePermission = (userId: string, permission: Permission) => {
    setSharedUsers(sharedUsers.map(user => 
      user.id === userId ? { ...user, permission } : user
    ));
    setShowPermissionDropdown(false);
    setEditingUserId(null);
  };

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter(user => user.id !== userId));
  };

  const handleAddUserFromManage = (user: typeof AVAILABLE_USERS[0]) => {
    setSharedUsers([...sharedUsers, { ...user, permission: defaultPermission }]);
    setManageInputValue('');
    setShowManageSuggestions(false);
  };

  const handleAddByEmailFromManage = () => {
    if (manageInputValue && manageInputValue.includes('@')) {
      const newUser: SharedUser = {
        id: `custom-${Date.now()}`,
        email: manageInputValue,
        name: manageInputValue.split('@')[0],
        permission: defaultPermission
      };
      setSharedUsers([...sharedUsers, newUser]);
      setManageInputValue('');
      setShowManageSuggestions(false);
    }
  };

  const handleCopyLink = async () => {
    // Mock link generation
    const link = `https://cocounsel.app/shared/${itemType}/${itemName.replace(/\s/g, '-').toLowerCase()}`;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        setLinkCopied(true);
      } else {
        // Fallback method for browsers/contexts where Clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setLinkCopied(true);
          } else {
            console.error('Fallback: Copy command failed');
          }
        } catch (err) {
          console.error('Fallback: Unable to copy', err);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Still try the fallback method
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setLinkCopied(true);
      } catch (fallbackErr) {
        console.error('All copy methods failed:', fallbackErr);
      }
      
      document.body.removeChild(textArea);
    }
  };

  const handleShare = () => {
    // Add pending users to shared users
    if (pendingUsers.length > 0) {
      setSharedUsers([...sharedUsers, ...pendingUsers]);
      setPendingUsers([]);
    }
    console.log('Sharing with users:', sharedUsers);
    console.log('Message:', message);
    onClose();
  };

  const handleSaveAccess = () => {
    console.log('Saved access changes for:', sharedUsers);
    setMode('share');
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-[620px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
          {mode === 'manage' && initialMode === 'share' && (
            <button
              onClick={() => setMode('share')}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="text-[14px] font-['Source_Sans_3'] font-medium">Back</span>
            </button>
          )}
          {mode === 'manage' && initialMode === 'share' && (
            <div className="w-px h-6 bg-gray-300" />
          )}
          <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223] flex-1">
            {mode === 'share' ? `Share "${itemName}"` : `Access for "${itemName}"`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        {mode === 'share' ? (
          <div className="flex-1 overflow-y-auto px-[24px] pt-[12px]">
            {/* Add People Input with Chips */}
            <div className="relative mb-4">
              <div className="flex gap-2">
                <div 
                  ref={inputContainerRef}
                  className="flex-1 min-h-[42px] flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-300 rounded focus-within:border-blue-500 transition-colors cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="text-gray-400">
                    <UserPlus className="size-4" />
                  </div>
                  
                  {/* User Chips */}
                  {pendingUsers.map((user) => (
                    <div 
                      key={user.id}
                      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-full pl-1 pr-2 py-1 transition-colors"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="size-5 rounded-full" />
                      ) : (
                        <div className="size-5 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-[9px] font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <span className="text-[13px] font-['Source_Sans_3'] text-[#212223] max-w-[150px] truncate">
                        {user.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePendingUser(user.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddByEmail();
                      } else if (e.key === 'Backspace' && inputValue === '' && pendingUsers.length > 0) {
                        handleRemovePendingUser(pendingUsers[pendingUsers.length - 1].id);
                      }
                    }}
                    placeholder={pendingUsers.length === 0 ? "Add a name, group, or email" : ""}
                    className="flex-1 min-w-[200px] outline-none text-[14px] font-['Source_Sans_3'] text-[#212223] placeholder:text-gray-400 bg-transparent"
                  />
                </div>
                
                {/* Permission Dropdown Button */}
                <button
                  ref={permissionButtonRef}
                  onClick={() => {
                    setShowPermissionDropdown(!showPermissionDropdown);
                    setEditingUserId(null);
                  }}
                  className="h-[42px] px-4 border border-gray-300 rounded text-[14px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  {PERMISSION_OPTIONS.find(p => p.value === defaultPermission)?.label || 'Can view'}
                  <ChevronDown className="size-4" />
                </button>
              </div>
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-[200px] overflow-y-auto"
                >
                  {suggestions.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleAddUser(user)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="size-8 rounded-full" />
                      ) : (
                        <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-['Source_Sans_3'] font-medium text-[#212223]">
                          {user.name}
                        </div>
                        <div className="text-[12px] font-['Source_Sans_3'] text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded text-[14px] font-['Source_Sans_3'] text-[#212223] placeholder:text-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            />

            {/* Info message */}
            <div className="border-t border-gray-200 mt-4 -mx-6">
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-start gap-2 text-[13px] text-gray-600">
                  <Users className="size-4 text-gray-500 mt-0.5 shrink-0" />
                  <p className="font-['Source_Sans_3']">
                    Only users with project access can access links or find this project in CoCounsel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Add User Input */}
            <div className="relative px-6 pt-4 pb-3">
              <div className="flex items-center gap-2 h-[42px] px-3 py-2 border border-gray-300 rounded focus-within:border-blue-500 transition-colors">
                <UserPlus className="size-4 text-gray-400 shrink-0" />
                <input
                  ref={manageInputRef}
                  type="text"
                  value={manageInputValue}
                  onChange={(e) => {
                    setManageInputValue(e.target.value);
                    setShowManageSuggestions(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddByEmailFromManage();
                    }
                  }}
                  placeholder="Add a name, group, or email"
                  className="flex-1 outline-none text-[14px] font-['Source_Sans_3'] text-[#212223] placeholder:text-gray-400 bg-transparent"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showManageSuggestions && manageSuggestions.length > 0 && (
                <div
                  ref={manageSuggestionsRef}
                  className="absolute top-full left-6 right-6 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-[200px] overflow-y-auto"
                >
                  {manageSuggestions.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleAddUserFromManage(user)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="size-8 rounded-full" />
                      ) : (
                        <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-['Source_Sans_3'] font-medium text-[#212223]">
                          {user.name}
                        </div>
                        <div className="text-[12px] font-['Source_Sans_3'] text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            {/* Shared Users List */}
            <div className="px-6 pt-4 space-y-3">
              {sharedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 py-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="size-10 rounded-full" />
                  ) : (
                    <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-['Source_Sans_3'] font-medium text-[#212223]">
                      {user.name}
                    </div>
                    <div className="text-[13px] font-['Source_Sans_3'] text-gray-500 truncate">
                      {user.email}
                    </div>
                  </div>
                  <div className="relative flex items-center gap-2">
                    {user.id === '0' ? (
                      <span className="h-9 px-3 text-[14px] font-['Source_Sans_3'] text-gray-600 flex items-center">
                        Owner
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingUserId(user.id);
                            setShowPermissionDropdown(true);
                          }}
                          className="h-9 px-3 text-[14px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 rounded transition-colors flex items-center gap-1.5"
                        >
                          {PERMISSION_OPTIONS.find(p => p.value === user.permission)?.label || 'Can edit'}
                          <ChevronDown className="size-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Link access section - replaced with info message */}
            <div className="border-t border-gray-200 mt-4">
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-start gap-2 text-[13px] text-gray-600">
                  <Users className="size-4 text-gray-500 mt-0.5 shrink-0" />
                  <p className="font-['Source_Sans_3']">
                    Only users with project access can access links or find this project in CoCounsel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          {mode === 'share' ? (
            <>
              {/* Manage Access Button with Avatar Cluster */}
              {sharedUsers.length > 0 && (
                <button
                  onClick={() => setMode('manage')}
                  className="flex flex-col items-start hover:bg-gray-50 rounded px-2 py-1 transition-colors"
                >
                  <span className="text-[13px] font-['Source_Sans_3'] text-gray-600 mb-1">
                    Manage access ({linkAccessLevel === 'restricted' 
                      ? `${sharedUsers.length} ${sharedUsers.length === 1 ? 'person' : 'people'}`
                      : getLinkAccessOptions(itemType, isPrompt).find(opt => opt.value === linkAccessLevel)?.label || 'Link'})
                  </span>
                  <div className="flex -space-x-2">
                    {sharedUsers.slice(0, 5).map((user, idx) => (
                      user.avatar ? (
                        <img 
                          key={user.id}
                          src={user.avatar} 
                          alt={user.name} 
                          className="size-7 rounded-full border-2 border-white" 
                        />
                      ) : (
                        <div 
                          key={user.id}
                          className="size-7 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center"
                        >
                          <span className="text-[9px] font-medium text-gray-600">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )
                    ))}
                    {sharedUsers.length > 5 && (
                      <div className="size-7 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-gray-600">
                          +{sharedUsers.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleCopyLink}
                  className="h-9 px-4 border border-gray-300 rounded text-[14px] font-['Clario'] font-medium text-[#212223] hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check className="size-4 text-green-600" />
                      <span className="text-green-600">Link copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="size-4" />
                      Copy link
                    </>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="h-9 px-5 bg-[#314b3e] rounded text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
                >
                  Share
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              {initialMode === 'manage' && (
                <button
                  onClick={() => setMode('share')}
                  className="h-9 px-4 border border-gray-300 rounded text-[14px] font-['Clario'] font-medium text-[#212223] hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Mail className="size-4" />
                  Send invites
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleCopyLink}
                  className="h-9 px-4 border border-gray-300 rounded text-[14px] font-['Clario'] font-medium text-[#212223] hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check className="size-4 text-green-600" />
                      <span className="text-green-600">Link copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="size-4" />
                      Copy link
                    </>
                  )}
                </button>
                <button
                  onClick={handleSaveAccess}
                  className="h-9 px-5 bg-[#314b3e] rounded text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permission Dropdown Portal */}
      {showPermissionDropdown && (
        <div
          ref={permissionDropdownRef}
          style={{
            position: 'fixed',
            top: permissionButtonRef.current
              ? permissionButtonRef.current.getBoundingClientRect().bottom + 4
              : '50%',
            left: permissionButtonRef.current
              ? permissionButtonRef.current.getBoundingClientRect().left
              : '50%',
            zIndex: 10001,
          }}
          className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[220px]"
        >
          {getPermissionOptions(isPrompt).map((option) => {
            const Icon = option.icon;
            const isSelected = editingUserId 
              ? sharedUsers.find(u => u.id === editingUserId)?.permission === option.value
              : defaultPermission === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => {
                  if (editingUserId) {
                    handleUpdatePermission(editingUserId, option.value);
                  } else {
                    setDefaultPermission(option.value);
                    setShowPermissionDropdown(false);
                  }
                }}
                className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="mt-0.5">
                  <Icon className="size-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-['Source_Sans_3'] font-medium text-[#212223]">
                      {option.label}
                    </span>
                    {isSelected && <Check className="size-4 text-[#314b3e]" />}
                  </div>
                  <div className="text-[12px] font-['Source_Sans_3'] text-gray-500">
                    {option.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Organization Permission Dropdown Portal */}
      {showOrgPermissionDropdown && (
        <div
          ref={orgPermissionDropdownRef}
          style={{
            position: 'fixed',
            top: orgPermissionButtonRef.current
              ? orgPermissionButtonRef.current.getBoundingClientRect().bottom + 4
              : '50%',
            left: orgPermissionButtonRef.current
              ? orgPermissionButtonRef.current.getBoundingClientRect().left
              : '50%',
            zIndex: 10001,
          }}
          className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[220px]"
        >
          {PERMISSION_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = orgPermission === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => {
                  setOrgPermission(option.value);
                  setShowOrgPermissionDropdown(false);
                }}
                className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="mt-0.5">
                  <Icon className="size-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-['Source_Sans_3'] font-medium text-[#212223]">
                      {option.label}
                    </span>
                    {isSelected && <Check className="size-4 text-[#314b3e]" />}
                  </div>
                  <div className="text-[12px] font-['Source_Sans_3'] text-gray-500">
                    {option.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Link Access Dropdown Portal */}
      {showLinkAccessDropdown && (
        <div
          ref={linkAccessDropdownRef}
          style={{
            position: 'fixed',
            top: linkAccessButtonRef.current
              ? linkAccessButtonRef.current.getBoundingClientRect().bottom + 4
              : '50%',
            left: linkAccessButtonRef.current
              ? linkAccessButtonRef.current.getBoundingClientRect().left
              : '50%',
            zIndex: 10001,
          }}
          className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[280px]"
        >
          {getLinkAccessOptions(itemType, isPrompt).map((option) => {
            const Icon = option.icon;
            const isSelected = linkAccessLevel === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => {
                  setLinkAccessLevel(option.value);
                  setShowLinkAccessDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <Icon className="size-5 text-gray-600" />
                <span className="flex-1 text-[14px] font-['Source_Sans_3'] text-[#212223]">
                  {option.label}
                </span>
                {isSelected && <Check className="size-4 text-[#314b3e]" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Link Permission Dropdown Portal */}
      {showLinkPermissionDropdown && (
        <div
          ref={linkPermissionDropdownRef}
          style={{
            position: 'fixed',
            top: linkPermissionButtonRef.current
              ? linkPermissionButtonRef.current.getBoundingClientRect().bottom + 4
              : '50%',
            left: linkPermissionButtonRef.current
              ? linkPermissionButtonRef.current.getBoundingClientRect().left
              : '50%',
            zIndex: 10001,
          }}
          className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 min-w-[220px]"
        >
          {getPermissionOptions(isPrompt).map((option) => {
            const Icon = option.icon;
            const isSelected = linkPermission === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => {
                  setLinkPermission(option.value);
                  setShowLinkPermissionDropdown(false);
                }}
                className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="mt-0.5">
                  <Icon className="size-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-['Source_Sans_3'] font-medium text-[#212223]">
                      {option.label}
                    </span>
                    {isSelected && <Check className="size-4 text-[#314b3e]" />}
                  </div>
                  <div className="text-[12px] font-['Source_Sans_3'] text-gray-500">
                    {option.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>,
    document.body
  );
}