import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Edit from '../assets/edit.svg'
import Delete from '../assets/delete.svg'

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
        const response = await fetch("https://note-plus.onrender.com/user/dashboard", {
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

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      {error ? (
        <p>Error: {error}</p>
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
                <img className="w-6" src={Edit} alt="" />
                <img className="w-6" src={Delete} alt="" />
                </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No matching notes found</p>
      )}
    </div>
  );
};

export default ShowNotes;
