
import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { Dashboard } from '@/components/Dashboard';
import { WorkLogViewer } from '@/components/WorkLogViewer';
import { ProfileSettings } from '@/components/ProfileSettings';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'logs' | 'profile'>('dashboard');
  const [userData, setUserData] = useState<any>(null);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userData={userData}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <Dashboard userData={userData} />}
        {currentView === 'logs' && <WorkLogViewer userData={userData} />}
        {currentView === 'profile' && <ProfileSettings userData={userData} onUpdate={setUserData} />}
      </main>
    </div>
  );
};

export default Index;
