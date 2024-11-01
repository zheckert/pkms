// This component defines the shape of a note to be displayed.

import axios from 'axios';
import React from 'react';
import Note from './Note';

function Notes({ notes, setAllNotes }) {

    const deleteNote = (note) => {
        
        axios.delete(`http://localhost:5000/notes/${note.id}`)
        .then(() => {
            setAllNotes((prevNotes) => prevNotes.filter(n => n.id !== note.id));
        })
        .catch(error => console.error(`There was an error deleting note with id ${note.id}: ${error}`));
    };

    var sortedNotes = notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {sortedNotes.map(note => (
                    <Note key={note.id} note={note} deleteNote={deleteNote} />
                ))}
            </ul>
        </div>
    );
}

export default Notes;
