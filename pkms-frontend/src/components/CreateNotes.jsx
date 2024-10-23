
import axios from "axios"
import { useState } from "react"

function CreateNotes() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const createNote = (title, content) => {
        // For posterity: I was initially trying to post to http://localhost:5000/notes/create
        // that is silly- axios.post is inherently a create action.
        axios.post(`http://localhost:5000/notes`, {
            title: title,
            content: content,
            // todo: you are spoofing user_id here, please fix when you can!
            user_id: 1,
            date: new Date().toISOString()
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            if (error.response) {
              console.log(error.response);
            }
          });
        // .catch(error => console.error(`There was an error saving the new note: ${error}`))
    }

    return(
        // don't forget: the onSubmit event for a form goes on the form itself, not the submit button.
        <form onSubmit={(e) => {
            e.preventDefault();  // Prevents the page from refreshing
            createNote(title, content);
        }}>
            <label>
                Note Title:
                <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
            </label>
            <label>
                Content:
                <input onChange={(e) => setContent(e.target.value)} value={content}></input>
            </label>
            <label>
                Date, do I actually need this todo:
                <input></input>
            </label>
            <button type="submit">Add Note</button>
        </form>
    )
}

export default CreateNotes