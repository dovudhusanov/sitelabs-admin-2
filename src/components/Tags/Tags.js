import React, { useEffect, useState } from "react";
import "./Tags.css";

function Tags({ setFormTags, title, name, formTag }) {
  function handleKeyDown(e) {
    if (e.keyCode !== 32) return;
    const value = e.target.value;
    if (!value.trim()) return;
    updateTags(value);
    e.target.value = "";
  }

  function removeTags(index) {
    let newTag = [...formTag[name]];
    newTag.splice(index, 1);
    setFormTags({ ...formTag, [name]: newTag });
  }

  function updateTags(value) {
    setFormTags({ ...formTag, [name]: [...formTag[name], value] });
  }

  return (
    <>
      <h4 style={{ color: "#000016", marginBottom: 5 }}>{title}</h4>
      <div className="tags__input-container">
        {formTag[name]?.map((tag, index) => {
          return (
            <div className="tag-item" key={index + 1}>
              <span className="tag-text">{tag}</span>
              <span className="tag-close" onClick={() => removeTags(index)}>
                &times;
              </span>
            </div>
          );
        })}
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder="Type something"
        />
      </div>
    </>
  );
}

export default Tags;
