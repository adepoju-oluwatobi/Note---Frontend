import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
        const response = await fetch('https://note-plus.onrender.com/user/dashboard', {
          method: 'GET',
          headers: {
            'User-Id': userId
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUserName(userData.username);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
      console.log(userId)
      const logoutResponse = await fetch('https://note-plus.onrender.com/user/logout', {
        method: 'POST',
        headers: {
          'User-Id': userId
        }
      });

      if (logoutResponse.ok) {
        // Clear user-related data from local storage or session storage
        localStorage.removeItem('user_id'); // Clear user_id from localStorage
        setUserName(''); // Clear username state
        navigate('/')
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='bg-slate-800 h-[100vh] p-4 w-[180px] flex flex-col gap-4'>
      <p className='text-white'>{userName}</p>
      <button className='p-2 bg-red-400 rounded-lg text-white' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
