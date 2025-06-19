
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Briefcase, Clock, Save } from 'lucide-react';

interface ProfileSettingsProps {
  userData: any;
  onUpdate: (data: any) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    jobTitle: userData?.jobTitle || '',
    experienceYears: userData?.experienceYears || '',
    targetWorkHours: userData?.targetWorkHours || 8
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

  const handleSave = () => {
    onUpdate(formData);
    // Here you would typically save to a backend
    console.log('프로필이 업데이트되었습니다:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
            {userData?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">프로필 설정</h1>
          <p className="text-gray-600">개인 정보와 업무 환경을 관리하세요</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>기본 정보</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div>
              <Label htmlFor="experience">경력</Label>
              <Input
                id="experience"
                value={formData.experienceYears}
                onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                placeholder="예: 3년차"
              />
            </div>
          </div>
          
          <div>
            <Label>직무</Label>
            <Select 
              value={formData.jobTitle} 
              onValueChange={(value) => setFormData({...formData, jobTitle: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="직무를 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {jobOptions.map((job) => (
                  <SelectItem key={job} value={job}>{job}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>업무 설정</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="workHours">하루 목표 업무 시간</Label>
            <Input
              id="workHours"
              type="number"
              value={formData.targetWorkHours}
              onChange={(e) => setFormData({...formData, targetWorkHours: parseInt(e.target.value)})}
              min="1"
              max="16"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              하루에 작업할 목표 시간을 설정하세요 (1-16시간)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Save className="w-4 h-4 mr-2" />
          변경사항 저장
        </Button>
      </div>
    </div>
  );
};
