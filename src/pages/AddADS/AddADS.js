import React, {useEffect} from "react";
import "./AddADS.css";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import EnterTag from "../../components/Tags/EnterTag";
import Dashboard from "../../components/Dashboard/Dashboard";
import Tags from "../../components/Tags/Tags";

function AddADS(props) {
    return (
        <div>
            <Dashboard/>
            <div className="admin-panel-items-left">
                <div className="add__ADS-form">
                    <div className="job-form-inputs">
                        <div style={{marginRight: 20, width: "100%"}}>
                            <label>Direction</label>
                            <div className="add__blog-form-row-one">
                                <TextField
                                    id="demo-helper"
                                    label="Direction"
                                    className="add__blog-input"
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div style={{width: "100%"}}>
                            <label>Title</label>
                            <div className="add__blog-form-row-one">
                                <TextField
                                    id="demo-helper"
                                    label="Title"
                                    className="add__blog-input"
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add__form-tags">
                        <label>Add #hashtags for Requirements</label>
                        {/*<EnterTag/>*/}
                        <label>Add #hashtags for Skills</label>
                        {/*<Tags/>*/}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Button
                            variant="contained"
                            style={{marginTop: 20, textAlign: "center"}}
                        >
                            Add Job
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddADS;
