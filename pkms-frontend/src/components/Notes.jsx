import React from 'react';

function Notes({ notes }) {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note.id}>
                            <div>
                                <h2>{note.title}</h2>
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