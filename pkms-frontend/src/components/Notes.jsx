// This component defines the shape of a note to be displayed.

import React from 'react';

function Notes({ notes }) {
    console.log("NOTES BABY", notes)
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