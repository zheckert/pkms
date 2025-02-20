// This component defines the shape of a note to be displayed.

import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import NoteCreationDate from "./NoteCreationDate";
import Tags from "./Tags";

function Note({ note, deleteNote, updateNote }) {
  const [editingNote, setEditingNote] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note, editedContent);
    setEditingNote(false);
  };

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
      </div>
      <Tags tags={note.tags} />
      <EditButton
        onEdit={() => setEditingNote(true)}
        onSave={handleSave}
        onCancel={() => setEditingNote(false)}
        isEditing={editingNote}
      />
      <DeleteButton deleteNote={deleteNote} note={note} />
      <NoteCreationDate note={note} />
    </li>
  );
}

export default Note;
