function DeleteButton({ deleteNote, note }) {
  //todo: continue researching this piece. Not sure window.confirm is best ux
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete note "${note.title}"?`
    );
    if (confirmDelete) {
      deleteNote(note);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Delete Note
    </button>
  );
}

export default DeleteButton;
