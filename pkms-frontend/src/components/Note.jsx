// This component defines the shape of a note to be displayed.

import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CreationDate from "./NoteCreationDate";
import Tags from "./Tags";

function Note({ note, deleteNote, updateNote, setContent }) {
  const [editingNote, setEditingNote] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

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
      {/* todo: I despise how I'm passing a function down to the EditButton component. Figure out how to not do that */}
      <EditButton
        updateNote={() => {
          updateNote(note, editedContent);
          setEditingNote(false);
        }}
        setEditingNote={setEditingNote}
        editingNote={editingNote}
      />
      <DeleteButton deleteNote={deleteNote} note={note} />
      <CreationDate note={note} />
    </li>
  );
}

export default Note;
