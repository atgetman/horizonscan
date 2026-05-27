import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
}

// Sample users for mentioning
const USERS: User[] = [
  { id: '1', name: 'Sarah Mitchell', role: 'Senior Associate', avatar: 'S', avatarColor: 'bg-[#1d4b34]' },
  { id: '2', name: 'Alex Thompson', role: 'Partner', avatar: 'A', avatarColor: 'bg-[#1d4b34]' },
  { id: '3', name: 'Michael Torres', role: 'Partner', avatar: 'M', avatarColor: 'bg-[#1d4b34]' },
  { id: '4', name: 'Jessica Park', role: 'Paralegal', avatar: 'J', avatarColor: 'bg-[#1d4b34]' },
  { id: '5', name: 'David Kumar', role: 'Of Counsel', avatar: 'D', avatarColor: 'bg-[#1d4b34]' },
  { id: '6', name: 'Emily Rodriguez', role: 'Associate', avatar: 'E', avatarColor: 'bg-[#1d4b34]' },
];

interface MentionDropdownProps {
  searchQuery: string;
  onSelect: (user: User) => void;
  position: { top: number; left: number };
}

export function MentionDropdown({ searchQuery, onSelect, position }: MentionDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Filter users based on search query
  const filteredUsers = USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset selected index when filtered users change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  if (filteredUsers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[240px] z-[100]"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {filteredUsers.map((user, idx) => (
        <button
          key={user.id}
          onClick={() => onSelect(user)}
          onMouseEnter={() => setSelectedIndex(idx)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 transition-colors ${
            idx === selectedIndex ? 'bg-gray-100' : ''
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs ${user.avatarColor}`}>
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500">{user.role}</div>
          </div>
        </button>
      ))}
    </motion.div>
  );
}