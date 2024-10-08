import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://placement-portal-1-n4rt.onrender.com/users-admin');
        const data = response.data;

        // Ensure that 'data' is an array
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError('Unexpected data format received');
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
  const deleteUser = async (userId) => {
    try {
       const navresult = confirm("Are you sure You Want to Delete");
       if(navresult){
        await axios.delete(`https://placement-portal-1-n4rt.onrender.com/users-admin/${userId}`);
        // Update the UI by removing the deleted user from the list
        alert("Deleted Successfully");
        setUsers(users.filter((user) => user._id !== userId));
       }
      
      
      
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Failed to delete user');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
