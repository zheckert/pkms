import { useState } from "react";

function DeleteButton({ deleteNote, note }) {
  //todo: This could use additional refinement (styling, overall ui/ux)
  const [deletingNote, setDeletingNote] = useState(false);

  return deletingNote ? (
    <>
      <p>Are you sure you want to delete this note?</p>
      <button onClick={() => deleteNote(note)}>Yes</button>{" "}
      <button onClick={() => setDeletingNote(false)}>No</button>{" "}
    </>
  ) : (
    <button onClick={() => setDeletingNote(true)}>Delete</button>
  );
}

export default DeleteButton;
