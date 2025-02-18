// This component displays a collection of notes.

import React from "react";
import api from "../api";
import "../index.css";
import Note from "./Note";

function Notes({ notes, setAllNotes, content, setContent }) {
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

  const updateNote = (note, newContent) => {
    api
      .put(`/notes/${note.id}`, { content: newContent })
      .then(() => {
        setAllNotes((prevNotes) =>
          prevNotes.map((exisitingNote) =>
            // We need to make sure we're updating the correct note, so if we have a match, we can replace the content.
            exisitingNote.id === note.id
              ? { ...exisitingNote, content: newContent }
              : exisitingNote
          )
        );
      })
      .catch((error) => console.error(`Error updating note: ${error}`));
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            setContent={setContent}
            updateNote={updateNote}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notes;
