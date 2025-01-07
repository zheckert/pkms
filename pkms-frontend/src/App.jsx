import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateNotes from "./components/CreateNotes";
import Filter from "./components/Filter";
import Notes from "./components/Notes";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";

function App() {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState("");

  // Use effect with an empty dependency array runs a single time immediately on page load.
  useEffect(() => {
    // Short circuit if there's no authToken present.
    if (!authToken) return;
    axios
      .get("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setUserName(response.data.name);
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        fetchNotes();
      })
      .catch(() => {
        handleLogout();
      });
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUserName("");
    setAllNotes([]);
    delete axios.defaults.headers.common["Authorization"];
  };

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    setUserName(user.name);
  };

  // This function is called from the Filter component and updates state and displays notes based on what tag is clicked.
  // todo: uncomment when we're using this piece again
  // const handleTagClick = (tagId) => {
  //   axios
  //     .get(`http://localhost:5000/notes/filter_by_tags?tag_ids=${tagId}`)
  //     .then((response) => {
  //       setFilteredNotes(response.data);
  //       setIsFiltering(true);
  //     })
  //     .catch((error) => {
  //       console.log(`${error.message}`);
  //       handleError(
  //         "There was an error fetching the filtered notes. Please try again."
  //       );
  //     });
  // };

  // This function runs on page load and gets all notes.
  const fetchNotes = () => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => {
        // const sortedNotes = response.data.sort(
        //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
        // ); todo: this sort should definitely be preferred (I think), but leaving it out until everything else with auth is working.
        setAllNotes(response.data);
        setIsFiltering(false);
      })
      .catch((error) => {
        console.log(`${error.message}`);
        handleError("Failed to load notes. Please try again.");
      });
  };

  const createNote = async (title, content) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.data) {
        setAllNotes((prevNotes) => [...prevNotes, response.data]);
      } else {
        console.error("No data in response");
      }

      // We let CreateNotes know that the note was successfully created so it can reset the state in the form fields.
      return true;
    } catch (error) {
      console.error("Error during note creation", error);
      return false;
    }
  };

  // Called from the clear filter button which is shown when tag filtering is active, this set the filtering state to false, thereby disabling the filtered view.
  const clearFilter = () => {
    setIsFiltering(false);
    setFilteredNotes([]);
  };

  const handleError = (message) => {
    setError(message);
  };

  return (
    <div>
      <h1>Personal Knowledge Management System</h1>
      {authToken ? (
        <>
          <div>Hello, {userName}!</div>
          <button onClick={handleLogout}>Logout</button>
          {error && <ErrorMessage error={error} />}
          <CreateNotes createNote={createNote} />
          {isFiltering && <button onClick={clearFilter}>Clear Filter</button>}
          {/* todo: <Filter onTagClick={handleTagClick} /> */}
          <Notes
            notes={isFiltering ? filteredNotes : allNotes}
            setAllNotes={setAllNotes}
          />
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
