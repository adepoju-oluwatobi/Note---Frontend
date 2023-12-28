import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddHeader from "../components/AddHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleAddNote = async () => {
    try {
      const user_id = localStorage.getItem("user_id"); // Retrieve user_id from local storage

      const response = await fetch(`https://note-plus.onrender.com/user/notes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, user_id }), // Send title, content, and user_id
      });

      if (response.ok) {
        toast.success("Note added successfully!");
        navigate("/notes");
        // Perform actions for successful addition
      } else {
        toast.error("Failed to add note!");
        // Handle failed addition
      }
    } catch (error) {
      console.error("Error while adding note:", error);
      // Handle error while adding note
    }
  };

  return (
    <div>
      <AddHeader />
      <ToastContainer />
      <form
        className="w-[280px] mt-4 mx-auto flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote();
        }}
      >
        <div>
          <input
            className="bg-[#1d2327] p-2 focus:outline-none text-white"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <textarea
            className="bg-[#1d2327] p-2 focus:outline-none text-white"
            style={{ width: "280px", height: "70vh" }}
            placeholder="Content goes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="p-2 bg-blue-500 rounded-lg" type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
