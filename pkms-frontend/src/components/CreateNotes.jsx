
import { useState } from "react";

function CreateNotes({createNote}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return(
        <>
            <h3>Add  Note</h3>
            {/* don't forget: the onSubmit event for a form goes on the form itself, not the submit button. */}
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
                <button type="submit">Add Note</button>
            </form>
        </>
    )
}

export default CreateNotes