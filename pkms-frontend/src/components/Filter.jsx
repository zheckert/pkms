import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Filter({ onTagClick }) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => setTags(response.data))
            .catch(error => console.error("There was an error fetching the tags!", error));
    }, []);

    return (
        <div>
            <h2>Filter by Tags</h2>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>
                        <button onClick={() => onTagClick(tag.id)}>
                            {tag.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Filter;
