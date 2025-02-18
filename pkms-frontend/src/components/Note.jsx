// This component defines the shape of a note to be displayed.

//todo: make sure you ask before somethign is deleted!
import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Tags from "./Tags";

function Note({ note, deleteNote, updateNote, setContent }) {
  const [editingNote, setEditingNote] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

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
        <h2>{note.title}</h2>
        {editingNote ? (
          <textarea
            onChange={(e) => setEditedContent(e.target.value)}
            value={editedContent}
          />
        ) : (
          <p>{note.content}</p>
        )}
        <p>Created {formatDate(note.created_at)}</p>
      </div>
      <Tags tags={note.tags} />
      <EditButton
        updateNote={() => {
          updateNote(note, editedContent);
          setEditingNote(false);
        }}
        setEditingNote={setEditingNote}
        editingNote={editingNote}
      />
      <DeleteButton deleteNote={deleteNote} note={note} />
    </li>
  );
}

export default Note;
