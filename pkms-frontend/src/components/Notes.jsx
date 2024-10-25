// This component defines the shape of a note to be displayed.

import React from 'react';
import axios from 'axios';

function Notes({ notes }) {
    //todo: delete this log later
    console.log("NOTES BABY", notes)

    const deleteNote = (note) => {
        axios.delete(`http://www.localhost:5000/notes/${note.id}`)
        .then(() => {
            setAllNotes((prevNotes) => prevNotes.filter(n => n.id !== note.id));
        })
        .catch(error => console.error(`There was an error deleting note with id ${note.id}: ${error}`));
    };
    
    return (
        
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note.id}>
                            <div>
                                <h2>{note.title}</h2>
                                {/* todo: clean up date data so it's not silly */}
                                <p>Created on {note.created_at}</p>
                                <p>{note.content}</p> 
                            </div>
                            <button onClick={() => deleteNote(note)}>Delete Note</button>
                        </li>
                    ))
                ) : (
                    <p>No notes available.</p> 
                )}
            </ul>
        </div>
    );
}

export default Notes;