import React, {useRef, useState} from "react";
import "./Tags.css";

function EnterTag({formTag, title, name, setFormTags}) {
    const tagsRef = useRef();

    function handleKeyDown(e) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        updateTag(value);
        e.target.value = "";
    }

    function removeTags(index) {
        let newTags = [...formTag[name]];
        newTags.splice(index, 1);
        setFormTags({...formTag, [name]: newTags});
    }

    function updateTag(value) {
        setFormTags({...formTag, [name]: [...formTag[name], value]});
    }

    return (
        <>
            <h4 style={{color: "#000016", marginBottom: 5}}>{title}</h4>
            <div className="tags__input-container">
                {formTag[name]?.map((tag, index) => {
                    return (
                        <div className="tag-item" key={index}>
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
                    ref={tagsRef}
                    name={name}
                    className="tags-input"
                    placeholder="Type something"
                />
            </div>
        </>
    );
}

export default EnterTag;
