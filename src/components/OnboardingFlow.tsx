
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    experienceYears: '',
    targetWorkHours: 8
  });

  const jobOptions = [
    'PM/기획자',
    '서버/백엔드 개발자',
    '프론트엔드 개발자',
    '풀스택 개발자',
    'UI/UX 디자이너',
    '데이터 분석가',
    'DevOps 엔지니어'
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                프로젝트: 아카이브
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                당신의 모든 업무가 자동으로 커리어 자산이 됩니다
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">이름</Label>
                <Input
                  id="name"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="experience" className="text-sm font-medium">경력</Label>
                <Input
                  id="experience"
                  placeholder="예: 3년차"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">직무를 선택해주세요</h2>
              <p className="text-gray-600">AI가 당신의 업무에 맞는 태스크를 제안해드립니다</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">직무</Label>
                <Select value={formData.jobTitle} onValueChange={(value) => setFormData({...formData, jobTitle: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="직무를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobOptions.map((job) => (
                      <SelectItem key={job} value={job}>{job}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="workHours" className="text-sm font-medium">하루 목표 업무 시간</Label>
                <Input
                  id="workHours"
                  type="number"
                  value={formData.targetWorkHours}
                  onChange={(e) => setFormData({...formData, targetWorkHours: parseInt(e.target.value)})}
                  className="mt-1"
                  min="1"
                  max="16"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">설정 완료!</h2>
              <p className="text-gray-600">이제 첫 번째 프로젝트를 시작해보세요</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-2">설정 요약</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">이름:</span> {formData.name}</p>
                <p><span className="font-medium">직무:</span> {formData.jobTitle}</p>
                <p><span className="font-medium">경력:</span> {formData.experienceYears}</p>
                <p><span className="font-medium">하루 목표 시간:</span> {formData.targetWorkHours}시간</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.name && formData.experienceYears;
      case 1:
        return formData.jobTitle;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= step ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-6">
          {renderStep()}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5"
          >
            {step === 2 ? '시작하기' : '다음'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
