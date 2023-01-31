import React, {useEffect, useRef, useState} from "react";
import "./ADSInterest.css";
import {DataGrid} from "@mui/x-data-grid";
import fetchHook from "../../custom-hook/Fetch";
import Dashboard from "../../components/Dashboard/Dashboard";
import {Box, TextField} from "@mui/material";
import {createJob, deleteJob, getAllJob, updateJob} from "../../axios/job";
import moment from "moment/moment";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tags from "../../components/Tags/Tags";
import EnterTag from "../../components/Tags/EnterTag";

function AdsInterest(props) {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = React.useState(5);
    const formRef = useRef();
    const [open, setOpen] = React.useState(false);
    const [hireJob, setHireJob] = useState({
        title: "",
        description: "",
        demands: [],
        skills: [],
    });

    const handleChange = (e) =>
        setHireJob({...hireJob, [e.target.name]: e.target.value});

    const columns = [
        {field: "createdAt", headerName: "Vaqt", width: 200},
        {field: "title", headerName: "Yo'nalish", width: 250},
        {field: "description", headerName: "Ish haqida", width: 250},
        {
            field: "E'lon Berganlar",
            headerName: "Resume",
            width: 100,
            renderCell: (params) => (
                <h4 style={{textAlign: "center"}}> {params.row.userId.length} </h4>
            ),
        },
        {
            field: "read",
            headerName: "Batafsil o'qish",
            width: 260,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate(`${window.location.pathname}/job/${params.row.id}`)
                        }
                        type="button"
                    >
                        Batafsil o'qish
                    </Button>
                </>
            ),
        },
        {
            field: "harakatlar",
            headerName: "Harakatlar",
            width: 260,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => deleteHireJob(params.row._id)}
                        variant="contained"
                        sx={{
                            marginRight: 5,
                            backgroundColor: "#ff0000",
                            color: "#fff",
                            "&:hover": {backgroundColor: "#6e0f0f"},
                        }}
                    >
                        <DeleteIcon/>
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleUpdated(params.row._id)}
                    >
                        <EditIcon/>
                    </Button>
                </>
            ),
        },
    ];
    const data = fetchHook(getAllJob);
    const formatJob = data["fetchedData"]?.jobs?.map((job) => {
        return {
            ...job,
            createdAt: moment(job.createdAt).format("DD/MM/YYYY"),
            id: job._id,
        };
    });
    const hireJobModalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "1px solid #e3e3e3",
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
    };

    function deleteHireJob(id) {
        try {
            let newJobs = [...data["fetchedData"]["admin"]];
            data["setFetchedData"]({
                admin: newJobs.filter((admin) => admin._id !== id),
            });
            deleteJob(id);
        } catch (error) {
            console.log(error);
        }
    }

    function handleModalOpen() {
        setOpen(true);
        navigate(`${window.location.pathname}/create`);
    }

    function handleModalClose() {
        setOpen(false);
        navigateReplace(
            window.location.pathname.includes("/create") ? "create" : "update"
        );
    }

    function navigateReplace(url) {
        navigate(`${window.location.pathname.replace(`/${url}`, "")}`);
    }

    function handleUpdated(id) {
        const currentJob = formatJob.find((job) => job._id === id);
        setHireJob({
            id: currentJob._id,
            title: currentJob.title,
            description: currentJob.description,
            skills: currentJob.skills,
            demands: currentJob.demands,
        });
        setOpen(true);
        navigate(`${window.location.pathname}/update`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        window.location.pathname.includes("create")
            ? createJob(hireJob)
            : updateJob(hireJob.id);
        setHireJob({
            title: "",
            description: "",
            demands: [],
            skills: [],
        });
        handleModalClose();
    }

    function handleKeydown(e) {
        let code = e.keyCode;
        if (code === 13) {
            e.preventDefault();
            console.log("Enter bosilganda submit toxtatildi");
        }
    }

    return (
        <>
            <Dashboard/>
            <div className="admin-panel-items-left">
                <div className="adInterest-container">
                    <div className="add-interest-container">
                        <Button variant="contained" onClick={handleModalOpen}>
                            Yangi E'lon Qo'shish
                        </Button>
                    </div>
                    <div style={{backgroundColor: "white"}}>
                        <Box
                            sx={{
                                height: 500,
                                width: "100%",
                                backgroundColor: "white",
                            }}
                        >
                            {formatJob?.length > 0 && (
                                <DataGrid
                                    rows={formatJob}
                                    pageSize={pageSize}
                                    sx={{
                                        border: "none",
                                    }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 15, 20]}
                                    columns={columns}
                                />
                            )}
                        </Box>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={hireJobModalStyle}>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        ref={formRef}
                        onKeyDown={handleKeydown}
                    >
                        <div className="add-interest-form">
                            <TextField
                                fullWidth
                                value={hireJob.title}
                                name="title"
                                onChange={handleChange}
                                label={"Sarlavha yozing"}
                            />
                        </div>
                        <div className="add-interest-form">
                            <TextField
                                fullWidth
                                value={hireJob.description}
                                name="description"
                                className="add-interest-textarea"
                                onChange={handleChange}
                                label={"Qisqacha malumot yozing"}
                            />
                        </div>
                        <div className="add-interest-form">
                            <EnterTag
                                title="Majburitatlar"
                                setFormTags={setHireJob}
                                name="demands"
                                formTag={hireJob}
                            />
                        </div>
                        <div className="add-interest-form">
                            <Tags
                                title="Ko'nikmalar"
                                name="skills"
                                setFormTags={setHireJob}
                                formTag={hireJob}
                            />
                        </div>
                        <Button variant="contained" type="submit">
                            {hireJob.id ? "Yangilash" : "Qo'shish"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default AdsInterest;
