
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LayoutDashboard, BookOpen, Settings, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentView: 'dashboard' | 'logs' | 'profile';
  onViewChange: (view: 'dashboard' | 'logs' | 'profile') => void;
  userData: any;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, userData }) => {
  const navigationItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'logs', label: '나의 로그', icon: BookOpen },
    { id: 'profile', label: '설정', icon: Settings },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              아카이브
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id as any)}
                  className={`flex items-center space-x-2 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{userData?.name}</p>
              <p className="text-xs text-gray-500">{userData?.jobTitle}</p>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                {userData?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};
