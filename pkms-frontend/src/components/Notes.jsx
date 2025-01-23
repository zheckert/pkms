// This component displays a collection of notes.

import axios from "axios";
import React from "react";
import Note from "./Note";
import "../index.css";

function Notes({ notes, setAllNotes }) {
  const deleteNote = (note) => {
    axios
      .delete(`http://localhost:3000/notes/${note.id}`)
      .then(() => {
        setAllNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
      })
      .catch((error) =>
        console.error(
          `There was an error deleting note with id ${note.id}: ${error}`
        )
      );
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul className="notes-grid">
        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </ul>
    </div>
  );
}

export default Notes;
