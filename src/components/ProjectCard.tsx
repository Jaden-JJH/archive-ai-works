
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar, RotateCcw } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'done';
  completedAt?: string;
}

interface Project {
  id: string;
  title: string;
  type: 'project' | 'recurring';
  dueDate?: string;
  tasks: Task[];
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  onTaskToggle: (projectId: string, taskId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onTaskToggle }) => {
  const completedTasks = project.tasks.filter(task => task.status === 'done').length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{project.title}</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={project.type === 'project' ? 'default' : 'secondary'}>
                {project.type === 'project' ? (
                  <>
                    <Calendar className="w-3 h-3 mr-1" />
                    프로젝트
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    반복 업무
                  </>
                )}
              </Badge>
              {project.dueDate && (
                <span className="text-xs text-gray-500">
                  마감: {formatDate(project.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">진행률</span>
            <span className="font-medium text-gray-900">{completedTasks}/{totalTasks}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {project.tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 group">
              <Checkbox
                checked={task.status === 'done'}
                onCheckedChange={() => onTaskToggle(project.id, task.id)}
                className="mt-0.5"
              />
              <span 
                className={`flex-1 text-sm transition-all ${
                  task.status === 'done' 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}
              >
                {task.title}
              </span>
              {task.status === 'done' && task.completedAt && (
                <span className="text-xs text-green-600 font-medium">✓</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
