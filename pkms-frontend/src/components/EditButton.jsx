import { useState } from "react";

function EditButton() {
  const [editingNote, setEditingNote] = useState(false);

  return editingNote ? (
    <>
      <textarea></textarea>
      <button onClick={() => editingNote}>Save</button>
      <button onClick={() => setEditingNote(false)}>Cancel</button>
    </>
  ) : (
    <button onClick={() => setEditingNote(true)}>Edit</button>
  );
}

export default EditButton;
