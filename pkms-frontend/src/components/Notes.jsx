// This component displays a collection of notes.

import React from "react";
import api from "../api";
import "../index.css";
import Note from "./Note";

function Notes({ notes, setAllNotes }) {
  const deleteNote = (note) => {
    api
      .delete(`/notes/${note.id}`)
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
