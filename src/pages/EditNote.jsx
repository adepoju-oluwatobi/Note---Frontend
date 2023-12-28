import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditHeader from "../components/EditHeader";

const EditNote = () => {
  const { noteId } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`https://note-plus.onrender.com/user/notes/edit/${noteId}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title || '');
          setContent(data.content || '');
        } else {
          console.error('Failed to fetch note');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNote();
  }, [noteId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteWithUserId = {
        title: title,
        content: content,
        user_id: userId,
      };
      const response = await fetch(
        `https://note-plus.onrender.com/user/notes/edit/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteWithUserId),
        }
      );

      if (response.ok) {
        const updatedNote = await response.json();
        console.log("Note updated:", updatedNote);
        navigate('/notes');
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EditHeader />
      <form
        onSubmit={handleFormSubmit}
        className="w-[280px] mt-4 mx-auto flex flex-col gap-4"
      >
        <input
          className="bg-[#1d2327] p-2 focus:outline-none text-white"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          className="bg-[#1d2327] p-2 focus:outline-none text-white"
          style={{ width: "280px", height: "70vh" }}
          name="content"
          value={content}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditNote;
