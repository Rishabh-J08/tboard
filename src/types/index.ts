export interface Project {
    id: string;
    name: string;
    key: string;
    description?: string;
    createdAt: string;
  }

  export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
    type: 'task' | 'bug' | 'feature' | 'improvement';
    createdAt: string;
    assignee?: string;
    dueDate?: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    status: Task['status'];
  }