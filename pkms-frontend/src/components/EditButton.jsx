function EditButton({ updateNote, setEditingNote, editingNote }) {
  return editingNote ? (
    <>
      <button onClick={updateNote}>Save Changes</button>
      <button onClick={() => setEditingNote(false)}>Cancel Changes</button>
    </>
  ) : (
    <button onClick={() => setEditingNote(true)}>Edit</button>
  );
}

export default EditButton;
