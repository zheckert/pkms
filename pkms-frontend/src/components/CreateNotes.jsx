// This component captures user input and hands it back to be sent in to the API to be saved as a new note.

import { useState } from "react";

function CreateNotes({ createNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <h3>Add Note</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote(title, content);
        }}
      >
        <label>
          Note Title:
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </label>
        <label>
          Content:
          <input
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></input>
        </label>
        <button type="submit">Add Note</button>
      </form>
    </>
  );
}

export default CreateNotes;
