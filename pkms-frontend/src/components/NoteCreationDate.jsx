import React from "react";

function NoteCreationDate({ note }) {
  const formatDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  <p>Created {formatDate(note.created_at)}</p>;
}

export default NoteCreationDate;
