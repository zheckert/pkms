// This component captures user input and hands it back to be sent in to the API to be saved as a new note.

import { useState } from "react";
import api from "../api";

function CreateNotes({ createNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createNote(title, content);

    if (success) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <>
      <h3>Add Note</h3>
      <form onSubmit={handleSubmit}>
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
