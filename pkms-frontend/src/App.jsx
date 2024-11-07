import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateNotes from "./components/CreateNotes";
import Filter from "./components/Filter";
import Notes from "./components/Notes";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState("");

  // This function is called from the Filter component and updates state and displays notes based on what tag is clicked.
  const handleTagClick = (tagId) => {
    axios
      .get(`http://localhost:5000/notes/filter_by_tags?tag_ids=${tagId}`)
      .then((response) => {
        setFilteredNotes(response.data);
        setIsFiltering(true);
      })
      .catch((error) => {
        console.log(`${error.message}`);
        handleError(
          "There was an error fetching the filtered notes. Please try again."
        );
      });
  };

  // This function runs on page load and gets all notes.
  const fetchNotes = () => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => {
        setAllNotes(response.data);
        setIsFiltering(false);
      })
      .catch((error) => {
        console.log(`${error.message}`);
        handleError("Failed to load notes. Please try again.");
      });
  };

  // This function is called from the CreateNotes component and handles sending in user input to the API to be saved as a new note.
  const createNote = (title, content) => {
    axios
      .post(`http://localhost:5000/notes`, {
        title: title,
        content: content,
        // todo: you are spoofing user_id here, please fix when you can!
        user_id: 1,
      })
      .then((response) => {
        //Once a new note is created, update state and force a refresh to show all previous notes and our new note!
        setAllNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => {
        console.log(`${error.message}`);
        handleError("Failed to create note. Please try again.");
      });
  };

  // Use effect with an empty dependency array runs a single time immediately on page load.
  useEffect(() => {
    fetchNotes();
  }, []);

  // Called from the clear filter button which is shown when tag filtering is active, this set the filtering state to false, thereby disabling the filtered view.
  const clearFilter = () => {
    setIsFiltering(false);
  };

  const handleError = (message) => {
    setError(message);
  };

  return (
    <>
      <div>Personal Knowledge Management System</div>
      {error && <ErrorMessage error={error} />}
      <CreateNotes createNote={createNote} />
      {isFiltering && <button onClick={clearFilter}>Clear Filter</button>}
      <Filter onTagClick={handleTagClick} />
      <Notes
        notes={isFiltering ? filteredNotes : allNotes}
        setAllNotes={setAllNotes}
      />
    </>
  );
}

export default App;
