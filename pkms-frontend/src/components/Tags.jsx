import React from "react";
import "../index.css";

function Tags({ tags = [] }) {
  const allTags = tags.map((tag) => (
    <span className="tags" key={tag.instance_id}>
      {tag.name}
    </span>
  ));
  return <div>{allTags}</div>;
}

export default Tags;
