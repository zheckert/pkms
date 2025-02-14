function EditButton({ setEditingNote }) {
  return <button onClick={() => setEditingNote((prev) => !prev)}>Edit</button>;
}

export default EditButton;
