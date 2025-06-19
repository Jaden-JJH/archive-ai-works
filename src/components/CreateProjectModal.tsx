
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, RotateCcw, Plus } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: any) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'project' as 'project' | 'recurring',
    description: '',
    dueDate: '',
    tasks: ['']
  });

  const handleAddTask = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, '']
    });
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = value;
    setFormData({
      ...formData,
      tasks: newTasks
    });
  };

  const handleRemoveTask = (index: number) => {
    if (formData.tasks.length > 1) {
      const newTasks = formData.tasks.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        tasks: newTasks
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const project = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      dueDate: formData.dueDate || undefined,
      tasks: formData.tasks
        .filter(task => task.trim() !== '')
        .map((task, index) => ({
          id: `${Date.now()}-${index}`,
          title: task,
          status: 'todo' as const
        })),
      createdAt: new Date().toISOString()
    };

    onCreateProject(project);
    
    // Reset form
    setFormData({
      title: '',
      type: 'project',
      description: '',
      dueDate: '',
      tasks: ['']
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">새 프로젝트 만들기</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">프로젝트 제목*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="프로젝트 제목을 입력하세요"
                required
              />
            </div>
            
            <div>
              <Label>프로젝트 유형*</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: 'project' | 'recurring') => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>일반 프로젝트</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="recurring">
                    <div className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>반복 업무</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'project' && (
            <div>
              <Label htmlFor="dueDate">마감일</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="프로젝트에 대한 간단한 설명을 작성하세요"
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>할 일 목록*</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTask}
              >
                <Plus className="w-4 h-4 mr-1" />
                추가
              </Button>
            </div>
            
            <div className="space-y-2">
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={task}
                    onChange={(e) => handleTaskChange(index, e.target.value)}
                    placeholder={`할 일 ${index + 1}`}
                    required={index === 0}
                  />
                  {formData.tasks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTask(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      제거
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              프로젝트 생성
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
