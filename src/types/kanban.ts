export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee?: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}