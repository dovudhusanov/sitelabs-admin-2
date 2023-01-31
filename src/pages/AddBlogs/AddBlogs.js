import React from "react";
import {Button, Input, TextField} from "@mui/material";
import "./AddBlogs.css";
import Tags from "../../components/Tags/Tags";
import Dashboard from "../../components/Dashboard/Dashboard";

function AddBlogs(props) {
    return (
        <>
            <Dashboard/>
            <div className="admin-panel-items-left">
                <div className="add__blog-form">
                    <label>Title</label>
                    <div className="add__blog-form-row-one">
                        <TextField
                            id="demo-helper"
                            label="Title"
                            className="add__blog-input"
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            component="label"
                            className="upload__image-add-blog"
                        >
                            Upload Image
                            <input hidden accept="image/*" multiple type="file"/>
                        </Button>
                    </div>
                    <label>Description</label>
                    <div className="add__blog-form-row-one">
                        <TextField
                            id="outlined-multiline-static"
                            label="description"
                            multiline
                            rows={4}
                            className="add__blog-input"
                            fullWidth
                        />
                    </div>
                    <div className="add__form-tags">
                        <label>Add #hashtags</label>
                        {/*<Tags/>*/}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            style={{marginTop: 20, textAlign: "center"}}
                        >
                            Add Blog
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBlogs;
