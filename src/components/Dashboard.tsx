
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProjectCard } from '@/components/ProjectCard';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { Plus, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  userData: any;
}

interface Project {
  id: string;
  title: string;
  type: 'project' | 'recurring';
  dueDate?: string;
  tasks: Task[];
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'done';
  completedAt?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: '4분기 프로모션 이벤트 페이지 기획',
      type: 'project',
      dueDate: '2024-12-31',
      tasks: [
        { id: '1', title: '경쟁사 분석 및 벤치마킹', status: 'done', completedAt: '2024-06-18T10:30:00Z' },
        { id: '2', title: '사용자 여정 맵 작성', status: 'done', completedAt: '2024-06-18T14:15:00Z' },
        { id: '3', title: '와이어프레임 초안 설계', status: 'todo' },
        { id: '4', title: '개발팀과 기술 검토 미팅', status: 'todo' },
      ],
      createdAt: '2024-06-18T09:00:00Z'
    }
  ]);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const todayCompletedTasks = projects.flatMap(p => p.tasks)
    .filter(task => task.status === 'done' && task.completedAt && 
      new Date(task.completedAt).toDateString() === new Date().toDateString()).length;

  const totalTodayTasks = projects.flatMap(p => p.tasks).length;
  const todayProgress = totalTodayTasks > 0 ? (todayCompletedTasks / totalTodayTasks) * 100 : 0;

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectData.title,
      type: projectData.dueDate ? 'project' : 'recurring',
      dueDate: projectData.dueDate,
      tasks: projectData.tasks.map((task: string, index: number) => ({
        id: `${Date.now()}-${index}`,
        title: task,
        status: 'todo' as const
      })),
      createdAt: new Date().toISOString()
    };
    
    setProjects([...projects, newProject]);
    setIsCreateModalOpen(false);
  };

  const handleTaskToggle = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: task.status === 'todo' ? 'done' : 'todo',
                completedAt: task.status === 'todo' ? new Date().toISOString() : undefined
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            안녕하세요, {userData?.name}님! 👋
          </h1>
          <p className="text-gray-600 mt-1">오늘도 멋진 하루를 만들어보세요</p>
        </div>

        {/* Today's Progress */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">오늘의 진행률</h3>
                <p className="text-sm text-gray-600">완료된 태스크: {todayCompletedTasks}개</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{Math.round(todayProgress)}%</div>
              </div>
            </div>
            <Progress value={todayProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">완료된 태스크</p>
                <p className="text-2xl font-bold text-gray-900">{todayCompletedTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">진행 중인 프로젝트</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">이번 주 생산성</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">프로젝트</h2>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 프로젝트
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-gray-200">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">첫 번째 프로젝트를 시작해보세요</h3>
                <p className="text-gray-600 mt-1">AI가 프로젝트를 실행 가능한 태스크로 나누어드립니다</p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                프로젝트 생성하기
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onTaskToggle={handleTaskToggle}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
        userData={userData}
      />
    </div>
  );
};
