import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">TeamTrack</h1>
          <p className="text-sm text-gray-600">
            Welcome, {user?.name} ({user?.role})
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;