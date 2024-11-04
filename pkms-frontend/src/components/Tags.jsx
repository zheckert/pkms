import React from "react";

function Tags({ tags }) {
  const allTags = tags.map((tag) => <span key={tag.id}>{tag.name}</span>);
  return <div>{allTags}</div>;
}

export default Tags;
