import { Column } from "../types";

export const COLUMNS: Column[] = [
    { id: '1', title: 'Backlog', status: 'backlog' },
    { id: '2', title: 'Todo', status: 'todo' },
    { id: '3', title: 'In Progress', status: 'inProgress' },
    { id: '4', title: 'Review', status: 'review' },
    { id: '5', title: 'Done', status: 'done' },
  ];
  
  export const PRIORITY_CONFIG = {
    urgent: {
      color: 'bg-red-100 text-red-800',
      icon: '🔥'
    },
    high: {
      color: 'bg-orange-100 text-orange-800',
      icon: '⬆️'
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: '➡️'
    },
    low: {
      color: 'bg-blue-100 text-blue-800',
      icon: '⬇️'
    }
  };
  
  export const TASK_TYPES = {
    task: {
      icon: '📋',
      color: 'bg-blue-100'
    },
    bug: {
      icon: '🐛',
      color: 'bg-red-100'
    },
    feature: {
      icon: '✨',
      color: 'bg-purple-100'
    },
    improvement: {
      icon: '⚡',
      color: 'bg-green-100'
    }
  };