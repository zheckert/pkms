// This component defines the shape of a note to be displayed.

//todo: make sure you ask before somethign is deleted!
import React from "react";
import Tags from "./Tags";
import DeleteButton from "./DeleteButton";

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

  //todo: add confirmation to delete. render different component version w/ different text?

  return (
    <li className="note">
      <div>
        {/* todo: Fix note content breaking out */}
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>Created {formatDate(note.created_at)}</p>
      </div>
      <Tags tags={note.tags} />
      <DeleteButton deleteNote={deleteNote} note={note} />
    </li>
  );
}

export default Note;
