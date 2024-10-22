import React, { useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Filter from './components/Filter';
import CreateNotes from './components/CreateNotes';
import axios from 'axios';

function App() {
    const [filteredNotes, setFilteredNotes] = useState([]);

    const handleTagClick = (tagId) => {
        axios.get(`http://localhost:5000/notes/filter_by_tags?tag_ids=${tagId}`)
            .then(response => {
                setFilteredNotes(response.data);
            })
            .catch(error => console.error("There was an error fetching the filtered notes!", error));
    };

    return (
        <>
            <div>PKMS</div>
            <Filter onTagClick={handleTagClick} />
            <Notes notes={filteredNotes} /> 
            <CreateNotes />
        </>
    );
}

export default App;