import { format, isBefore } from 'date-fns';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'review';
    priority: 'low' | 'medium' | 'high';
    assigneeId?: string;
    prejectId: string;
    labels: string[]
    dueDate?: Date
    createdAt: Date;
    updatedAt: Date;
}

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

// export const calculateProjectProgress = (tasks: Task[]): number => {
//   if (tasks.length === 0) return 0;
//   const completedTasks = tasks.filter((task) => task.status === 'done').length;
//   return Math.round((completedTasks / tasks.length) * 100);
// };

export const isOverdue = (date: Date | string): boolean => {
  return isBefore(new Date(date), new Date());
};

export const sortByPriority = (a: Task, b: Task): number => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return priorityOrder[b.priority] - priorityOrder[a.priority];
};

export const groupTasksByStatus = (tasks: Task[]) => {
  return tasks.reduce((acc, task) => {
    acc[task.status] = [...(acc[task.status] || []), task];
    return acc;
  }, {} as Record<string, Task[]>);
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
