import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Edit from '../assets/edit.svg'
import Delete from '../assets/delete.svg'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUserId = () => {
      const storedUserId = localStorage.getItem("user_id");
      
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        setError("User ID not found in localStorage");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(`https://note-plus.onrender.com/user/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Id": userId,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setNotes(responseData.notes || []);
        } else {
          setError("Failed to fetch notes");
        }
      } catch (error) {
        setError("Error while fetching notes");
        console.error("Error while fetching notes:", error);
      }
    };

    fetchNotes();
  }, [userId]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults([]);
    } else {
      const results = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(term.toLowerCase()) ||
          note.content.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const displayNotes = searchTerm === "" ? notes : searchResults;


  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`https://note-plus.onrender.com/user/notes/delete/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success("Note deleted successfully")
        location.reload()
      } else {
        // Handle deletion failure
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  return (
    <div>
      <Header />
      <ToastContainer />
      <Search onSearch={handleSearch} />
      {error ? (
        <p className="text-white">Error: {error}</p>
      ) : displayNotes.length > 0 ? (
        <div>
          {displayNotes.map((note) => (
            <div className="bg-[#1b336b] mb-4 p-2 text-white flex items-center justify-between"
             key={note.id}>
              <div>
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p className="font-thin text-sm">{note.content}</p>
              </div>
              <div className="flex items-center gap-4">
              <Link to={`/edit_note/${note.id}`} className="text-white">
                <img className="w-6" src={Edit} alt="" />
                </Link>
                <Link to="#" className="text-white" onClick={() => handleDeleteNote(note.id)}>
                  <img className="w-6" src={Delete} alt="" />
                </Link>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white p-4">No matching notes found</p>
      )}
    </div>
  );
};

export default ShowNotes;
