import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Filter() {

    const [tags, setTags] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/notes/filter_by_tag')
          .then(response => setTags(response.data))
          .catch(error => console.error("There was an error fetching the tags!", error));
          console.log(tags, "XXXXX HERE ARE MY TAGGIES")
      }, []);
    

    return(
        <div>Filtering tools</div>
    )
}

export default Filter