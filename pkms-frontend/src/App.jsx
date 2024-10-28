import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import CreateNotes from './components/CreateNotes';
import Filter from './components/Filter';
import Notes from './components/Notes';

function App() {
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([])
    const [isFiltering, setIsFiltering] = useState(false)

    // This function is called from the Filter component and updates state and displays notes based on what tag is clicked.
    const handleTagClick = (tagId) => {
        axios.get(`http://localhost:5000/notes/filter_by_tags?tag_ids=${tagId}`)
            .then(response => {
                setFilteredNotes(response.data);
                setIsFiltering(true)
            })
            .catch(error => console.error("There was an error fetching the filtered notes!", error));
    };

    // This function runs on page load and gets all notes.
    const fetchNotes = () => {
        axios.get('http://localhost:5000/notes')
        .then(response => {
            setAllNotes(response.data)
            setIsFiltering(false)
        })
        .catch(error => console.error("Error fetching notes", error))
    }

    // This function is called from the CreateNotes component and handles sending in user input to the API to be saved as a new note.
    const createNote = (title, content) => {
        axios.post(`http://localhost:5000/notes`, {
            title: title,
            content: content,
            // todo: you are spoofing user_id here, please fix when you can!
            user_id: 1,
        })
        .then(response => {
            //Once a new note is created, update state and force a refresh to show all previous notes and our new note!
            setAllNotes((prevNotes) => [...prevNotes, response.data])
        })
        .catch(error => {
            if (error.response) {
              console.log(error.response);
            }
          });
    }

    // Use effect with an empty dependency array runs a single time immediately on page load.
    useEffect(() => {
        fetchNotes()
    }, [])

    // Called from the clear filter button which is shown when tag filtering is active, this set the filtering state to false, thereby disabling the filtered view.
    const clearFilter = () => {
        setIsFiltering(false)
    }

    return (
        <>
            <div>PKMS</div>
            <CreateNotes createNote={createNote}/>
            {isFiltering && 
                <button onClick={clearFilter}>Clear Filter</button>
            }
            <Filter onTagClick={handleTagClick} />
            <Notes notes={isFiltering ? filteredNotes : allNotes} setAllNotes={setAllNotes}/>
           
        </>
    );
}

export default App;