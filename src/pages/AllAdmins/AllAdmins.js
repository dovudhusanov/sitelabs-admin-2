import React, {useEffect, useRef, useState} from "react";
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
import {createAdmin, deleteAdmin, getAllAdmins, updateAdmin} from "../../axios/getAdmins";


function AllAdmins(props) {
    const navigate = useNavigate();
    const [pageSize, setPageSize] = React.useState(5);
    const formRef = useRef();
    const [open, setOpen] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [hireAdmin, setHireAdmin] = useState({
        id: "",
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) =>
        setHireAdmin({...hireAdmin, [e.target.name]: e.target.value});

    const columns = [
        {field: "createdAt", headerName: "Vaqt", width: 200},
        {field: "name", headerName: "Ism", width: 250},
        {field: "email", headerName: "Email", width: 250},
        {
            field: "harakatlar",
            headerName: "Harakatlar",
            width: 260,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => deleteHireAdmin(params.row._id)}
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

    const data = fetchHook(getAllAdmins);
    const formatAdmin = data["fetchedData"]?.admin?.map((admin) => {
        return {
            ...admin,
            createdAt: moment(admin.createdAt).format("DD/MM/YYYY"),
            id: admin._id,
        };
    });
    const hireAdminModalStyle = {
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

    function deleteHireAdmin(id) {
        try {
            let newAdmins = [...data["fetchedData"]["admin"]];
            data["setFetchedData"]({
                admin: newAdmins.filter((admin) => admin._id !== id),
            });
            deleteAdmin(id);
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
        const currentAdmin = formatAdmin.find((admin) => admin._id === id);
        setHireAdmin({
            id: currentAdmin._id,
            name: currentAdmin.name,
            email: currentAdmin.email,
            password: currentAdmin.password,
        });
        setOpen(true);
        navigate(`${window.location.pathname}/update`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        window.location.pathname.includes("create")
            ? createAdmin(hireAdmin)
            : updateAdmin(hireAdmin.id);
        setHireAdmin({
            name: "",
            email: "",
            password: "",
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
                            {formatAdmin?.length > 0 ? (
                                <DataGrid
                                    rows={formatAdmin}
                                    pageSize={pageSize}
                                    sx={{
                                        border: "none",
                                    }}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 15, 20]}
                                    columns={columns}
                                />
                            ): (
                                <h1>Admin Yo'q*</h1>
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
                <Box sx={hireAdminModalStyle}>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        ref={formRef}
                        onKeyDown={handleKeydown}
                    >
                        <div className="add-interest-form">
                            <TextField
                                fullWidth
                                value={hireAdmin.name}
                                name="name"
                                onChange={handleChange}
                                label={"ism yozing"}
                            />
                        </div>
                        <div className="add-interest-form">
                            <TextField
                                fullWidth
                                value={hireAdmin.email}
                                name="email"
                                className="add-interest-textarea"
                                onChange={handleChange}
                                label={"Email yozing"}
                            />
                        </div>
                        <div className="add-interest-form">
                            <TextField
                                fullWidth
                                value={hireAdmin.password}
                                name="password"
                                className="add-interest-textarea"
                                onChange={handleChange}
                                label={"Password yozing"}
                            />
                        </div>
                        <Button variant="contained" type="submit">
                            {hireAdmin.id ? "Yangilash" : "Qo'shish"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default AllAdmins;