import React, { useState, useEffect } from 'react';
import LoginForm from './components/Auth/LoginForm.jsx';
import SignupForm from './components/Auth/SignupForm';
import Header from './components/Layout/Header';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import ErrorMessage from './components/Common/ErrorMessage';
import { api } from './services/api';
import { authService } from './services/auth';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const userData = authService.getUser();
      setUser(userData);
      fetchTasks(userData);
    }
  }, []);

  const fetchTasks = async (userData) => {
    try {
      const data = await api.getTasks(userData?.role === 'admin');
      if (data.success) {
        setTasks(data.tasks || []);
      }
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  const handleAuth = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const data = isSignup ? await api.signup(formData) : await api.signin(formData);
      
      // If we get here, the request was successful
      authService.saveAuth(data.token, data.user);
      setUser(data.user);
      fetchTasks(data.user);
    } catch (err) {
      console.log('Auth error:', err.message);
      if (err.message === 'Failed to fetch') {
        setError('Network error. Please check if the server is running.');
      } else {
        setError(err.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.clearAuth();
    setUser(null);
    setTasks([]);
  };

  const handleTaskSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const data = editingTask 
        ? await api.updateTask(editingTask._id, formData)
        : await api.createTask(formData);

      if (data.success) {
        if (editingTask) {
          setTasks(tasks.map(t => t._id === editingTask._id ? data.task : t));
        } else {
          setTasks([...tasks, data.task]);
        }
        setShowTaskForm(false);
        setEditingTask(null);
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const data = await api.deleteTask(taskId, user.role === 'admin');
      if (data.success) {
        setTasks(tasks.filter(t => t._id !== taskId));
      } else {
        setError(data.message || 'Failed to delete task');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelTask = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  if (!user) {
    return isSignup ? (
      <SignupForm
        onSubmit={handleAuth}
        onToggleForm={() => setIsSignup(false)}
        loading={loading}
      />
    ) : (
      <LoginForm
        onSubmit={handleAuth}
        onToggleForm={() => setIsSignup(true)}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <ErrorMessage message={error} onClose={() => setError('')} />

        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={handleCancelTask}
            loading={loading}
          />
        )}

        <TaskList
          tasks={tasks}
          user={user}
          onAddTask={() => setShowTaskForm(true)}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;