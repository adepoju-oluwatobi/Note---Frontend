import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddNote = async () => {
    try {
      const user_id = localStorage.getItem('user_id'); // Retrieve user_id from local storage

      const response = await fetch('http://localhost:5000/user/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, user_id }), // Send title, content, and user_id
      });

      if (response.ok) {
        console.log('Note added successfully!');
        navigate('/notes'); 
        // Perform actions for successful addition
      } else {
        console.error('Failed to add note!');
        // Handle failed addition
      }
    } catch (error) {
      console.error('Error while adding note:', error);
      // Handle error while adding note
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote();
        }}
      >
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
