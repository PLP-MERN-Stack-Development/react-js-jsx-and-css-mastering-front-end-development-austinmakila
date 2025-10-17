import { useState } from 'react';
import { Plus, Trash2, Check, Circle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from '../components/Button';
import Card from '../components/Card';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks and boost productivity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
            {stats.active}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
          />
          <Button onClick={addTask} className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </Card>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
              filter === f
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filter === 'all'
                ? 'No tasks yet. Add one to get started!'
                : `No ${filter} tasks.`}
            </p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              hover
              className="transition-all duration-300 animate-fadeIn"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    borderColor: task.completed ? '#10b981' : '#6b7280',
                    backgroundColor: task.completed ? '#10b981' : 'transparent',
                  }}
                >
                  {task.completed ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-400" />
                  )}
                </button>
                <span
                  className={`flex-1 transition-all duration-200 ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-500'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="flex-shrink-0 !p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
