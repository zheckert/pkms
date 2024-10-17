import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error("There was an error fetching the notes!", error));
  }, []);

  console.log("date", notes)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
