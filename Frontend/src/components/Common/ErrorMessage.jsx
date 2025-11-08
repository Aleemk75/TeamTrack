import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm flex justify-between items-center">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-red-800 hover:text-red-900">
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;