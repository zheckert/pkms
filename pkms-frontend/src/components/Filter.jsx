//This component makes a request to the tag endpoint, which returns a list of all tags created by the user.

import React, { useState, useEffect } from "react";
import api from "../api";

function Filter({ onTagClick }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api
      .get("/tags")
      .then((response) => setTags(response.data))
      .catch((error) =>
        console.error("There was an error fetching the tags!", error)
      );
  }, []);

  return (
    <div>
      <h2>Filter by Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id} onClick={() => onTagClick(tag.id)}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
