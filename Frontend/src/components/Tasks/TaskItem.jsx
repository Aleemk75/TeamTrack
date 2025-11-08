import React from 'react';
import { Calendar, Trash2, Edit2 } from 'lucide-react';
import { STATUS_COLORS } from '../../utils/constants.js'
const TaskItem = ({ task, onEdit, onDelete, isAdmin, canEdit }) => {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${STATUS_COLORS[task.status]}`}>
              {task.status}
            </span>
            {isAdmin && task.createdBy && (
              <span className="text-xs">
                by {task.createdBy.name || task.createdBy.email}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          {canEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit2 size={18} />
            </button>
          )}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;