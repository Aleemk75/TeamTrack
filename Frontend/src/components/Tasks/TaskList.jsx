import React from 'react';
import { Plus } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, user, onAddTask, onEditTask, onDeleteTask }) => {
  const isAdmin = user?.role === 'admin';
  const canEdit = user?.role === 'user';

  return (
    <div>
      {canEdit && (
        <button
          onClick={onAddTask}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Task
        </button>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isAdmin ? 'All Tasks' : 'My Tasks'} ({tasks.length})
          </h2>
        </div>

        {tasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No tasks found. {canEdit && 'Create your first task!'}
          </div>
        ) : (
          <div className="divide-y">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                isAdmin={isAdmin}
                canEdit={canEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;