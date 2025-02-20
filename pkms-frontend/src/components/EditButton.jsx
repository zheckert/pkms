function EditButton({ onEdit, onSave, onCancel, isEditing }) {
  return isEditing ? (
    <>
      <button onClick={onSave}>Save Changes</button>
      <button onClick={onCancel}>Cancel Changes</button>
    </>
  ) : (
    <button onClick={onEdit}>Edit</button>
  );
}

export default EditButton;
