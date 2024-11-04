// This component defines the shape of a note to be displayed.

//todo: make sure you ask before somethign is deleted!
import React from "react";
import Tags from "./Tags";

function Note({ note, deleteNote }) {
  const formatDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <li>
      <div>
        <h2>{note.title}</h2>
        <p>Created on {formatDate(note.created_at)}</p>
        <p>{note.content}</p>
      </div>
      <Tags tags={note.tags} />
      <button onClick={() => deleteNote(note)}>Delete Note</button>
    </li>
  );
}

export default Note;