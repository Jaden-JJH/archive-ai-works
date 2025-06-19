
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface WorkLogViewerProps {
  userData: any;
}

export const WorkLogViewer: React.FC<WorkLogViewerProps> = ({ userData }) => {
  // Mock data for now - this would come from actual work logs
  const workLogs = [
    {
      id: '1',
      date: '2024-01-15',
      project: '웹 애플리케이션 개발',
      tasks: ['로그인 기능 구현', 'UI 컴포넌트 작성'],
      hoursWorked: 8,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-14',
      project: 'API 설계',
      tasks: ['데이터베이스 스키마 설계', '엔드포인트 정의'],
      hoursWorked: 6,
      status: 'completed'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">나의 업무 로그</h1>
        <Badge variant="secondary" className="text-sm">
          총 {workLogs.length}개의 기록
        </Badge>
      </div>

      <div className="grid gap-4">
        {workLogs.map((log) => (
          <Card key={log.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{log.project}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(log.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{log.hoursWorked}시간</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">완료</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">완료한 작업</h4>
                <ul className="space-y-1">
                  {log.tasks.map((task, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workLogs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">아직 업무 로그가 없습니다</h3>
          <p className="text-gray-600">첫 번째 프로젝트를 시작해보세요!</p>
        </div>
      )}
    </div>
  );
};
