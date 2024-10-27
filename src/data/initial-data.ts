import { Column } from '../types/kanban';

export const initialColumns: Column[] = [
  {
    id: '1',
    title: 'Todo',
    tasks: [
      {
        id: '1',
        title: 'Research user feedback',
        description: 'Analyze recent user surveys and compile key findings',
        priority: 'high',
        status: 'todo',
        assignee: 'Sarah',
        createdAt: '2024-10-26'
      },
      {
        id: '2',
        title: 'Update documentation',
        description: 'Review and update API documentation',
        priority: 'medium',
        status: 'todo',
        assignee: 'Mike',
        createdAt: '2024-10-26'
      }
    ]
  },
  {
    id: '2',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Fix navigation bug',
        description: 'Address the mobile navigation issues reported by QA',
        priority: 'high',
        status: 'in-progress',
        assignee: 'John',
        createdAt: '2024-10-25'
      }
    ]
  },
  {
    id: '3',
    title: 'Done',
    tasks: [
      {
        id: '4',
        title: 'Design review',
        description: 'Complete design review for new features',
        priority: 'low',
        status: 'done',
        assignee: 'Emma',
        createdAt: '2024-10-24'
      }
    ]
  }
];
