import React, { createContext, useContext, ReactNode } from 'react';
import { Project, Task } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  currentProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [currentProject, setCurrentProject] = useLocalStorage<Project | null>('currentProject', null);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        currentProject,
        setProjects,
        setTasks,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};