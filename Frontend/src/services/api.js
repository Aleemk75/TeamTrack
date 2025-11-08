import { API_URL } from '../utils/constants.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const api = {
  // Auth APIs
  signup: async (data) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  signin: async (data) => {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const jsonData = await res.json();
    
    // If response is not ok, throw error with the message from the server
    if (!res.ok) {
      console.log('Server response:', jsonData);
      throw new Error(jsonData.message || 'Invalid email or password');
    }
    
    // If we get here, everything is good
    return jsonData;
  },

  // Task APIs
  getTasks: async (isAdmin = false) => {
    const endpoint = isAdmin ? `${API_URL}/admin/tasks` : `${API_URL}/tasks`;
    const res = await fetch(endpoint, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  createTask: async (data) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateTask: async (id, data) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteTask: async (id, isAdmin = false) => {
    const endpoint = isAdmin ? `${API_URL}/admin/tasks/${id}` : `${API_URL}/tasks/${id}`;
    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};