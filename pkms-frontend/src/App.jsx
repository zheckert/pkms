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

    const createNote = (title, content) => {
        // For posterity: I was initially trying to post to http://localhost:5000/notes/create
        // that is silly- axios.post is inherently a create action.

        // Did your axios request fail? Did you check validations and x_params? You may require something there!

        axios.post(`http://localhost:5000/notes`, {
            title: title,
            content: content,
            // todo: you are spoofing user_id here, please fix when you can!
            user_id: 1,
            date: new Date().toISOString()
        })
        .then(response => {
            //Once a new note is created, update state force a refresh to show all previous notes and our new note!
            setFilteredNotes(prevNotes => [...prevNotes, response.data]);
        })
        .catch(error => {
            if (error.response) {
              console.log(error.response);
            }
          });
        // .catch(error => console.error(`There was an error saving the new note: ${error}`))
    }

    return (
        <>
            <div>PKMS</div>
            <Filter onTagClick={handleTagClick} />
            <Notes notes={filteredNotes} /> 
            <CreateNotes createNote={createNote}/>
        </>
    );
}

export default App;