import React, { useState } from 'react';
import { Bell, Menu, Plus, Search, X, Trash2 } from 'lucide-react';
import { Column, Task, Priority } from '../types/kanban';
import { initialColumns } from '../data/initial-data';
import { Alert, AlertDescription } from './alert';
//import avatar from "../assets/the.svg"

interface CreateTaskForm {
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [newTask, setNewTask] = useState<CreateTaskForm>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: ''
  });

  // Keep all the handler functions the same
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'todo',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setColumns(prevColumns => prevColumns.map(column => {
      if (column.id === '1') {
        return {
          ...column,
          tasks: [...column.tasks, task]
        };
      }
      return column;
    }));

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: ''
    });
    
    setIsCreateTaskOpen(false);
    setShowAlert(true);
    setAlertMessage('Task created successfully!');
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    setColumns(prevColumns => prevColumns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    }));
    
    setShowAlert(true);
    setAlertMessage('Task deleted successfully!');
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string, fromColumn: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromColumn', fromColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const fromColumnId = e.dataTransfer.getData('fromColumn');

    if (fromColumnId !== toColumnId) {
      setColumns(prevColumns => {
        const fromColumn = prevColumns.find(col => col.id === fromColumnId);
        const task = fromColumn?.tasks.find(t => t.id === taskId);

        if (!task) return prevColumns;

        return prevColumns.map(column => {
          if (column.id === fromColumnId) {
            return {
              ...column,
              tasks: column.tasks.filter(t => t.id !== taskId)
            };
          }
          if (column.id === toColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, { ...task, status: column.title.toLowerCase() as Task['status'] }]
            };
          }
          return column;
        });
      });
    }
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="ml-4 text-xl font-bold text-indigo-600">TaskFlow</span>
            </div>
            <div className="flex-1 max-w-lg mx-8 hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative rounded">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3558/3558860.png"
                  alt="User"
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-screen pt-16 bg-gray-100">
        {/* Sidebar - Fixed position */}
        <aside 
          className={`fixed inset-y-16 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Projects</h2>
            <ul className="space-y-2">
              <li className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md">Project Board</li>
              <li className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">Timeline</li>
              <li className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">Calendar</li>
              <li className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer">Reports</li>
            </ul>
          </div>
        </aside>

        {/* Main Content - With proper margin and background */}
        <main className={`flex-1 min-h-screen transition-all duration-300 bg-gray-100
          ${isSidebarOpen ? 'lg:ml-64' : ''} p-4 sm:p-8`}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Project Board</h1>
            <button 
              onClick={() => setIsCreateTaskOpen(true)}
              className="flex items-center px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </div>

          {/* Keep the rest of the component the same... */}
          {/* Kanban Columns */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            {filteredColumns.map(column => (
              <div
                key={column.id}
                className="flex-shrink-0 lg:w-80 bg-gray-50 rounded-lg p-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center justify-between">
                  <span>{column.title}</span>
                  <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {column.tasks.length}
                  </span>
                </h3>
                <div className="space-y-3">
                  {column.tasks.map(task => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                      className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-move border border-transparent hover:border-indigo-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <button
                          onClick={() => handleDeleteTask(task.id, column.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        {task.assignee && (
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {task.assignee}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Create Task Dialog */}
      {isCreateTaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Create New Task</h2>
              <button 
                onClick={() => setIsCreateTaskOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleCreateTask}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Priority })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Optional"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateTaskOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;