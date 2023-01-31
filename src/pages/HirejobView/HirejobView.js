import React, {useEffect, useState} from "react";
import "./style.hirejobview.css";
import moment from "moment";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useParams} from "react-router-dom";
import {deleteHireJob, getAllHireJob} from "../../axios/hirejob";
import {getJobById} from "../../axios/job";
import Dashboard from "../../components/Dashboard/Dashboard";
import {Delete} from "@mui/icons-material";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const HirejobView = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
      const job = async () => {
          setLoading(true);
          const response = await getJobById(id);
          const hireResponse = await getAllHireJob();
          setUsers(hireResponse.data);
          setJobs(response.data);
          setLoading(false);
      };
      job();
  }, [])

    const handleClose = () => {
        setSelected("");
        setOpen(false);
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user?._id !== id));
        deleteHireJob(id);
    };
    const handleResumeView = (url) => {
        setSelected(url);
        setOpen(true);
    }

    const filteredUser = users
        .map((user) => {
            if (jobs?.userId.includes(user?._id)) {
                return user;
            }
        })
        .filter((user) => (user !== undefined) | null);

    const doc = [
        {
            uri: "https://www.chaiwala.hk/wp-content/uploads/sites/5/2019/04/demo.pdf",
        },
    ];
    return (
        <>
            <Dashboard/>
            <div className="admin-panel-items-left job-read">
                <div className="container job-read-container">
                    <div className="job-read-header">
                        <h2 className="job-read-title">{jobs?.title}</h2>
                        <span> {moment(jobs.createdAt).format("DD/MM/YY")}</span>
                    </div>
                    <div className="job-read-body">
                        <p className="job-read-description">{jobs?.description}</p>
                        {filteredUser.length > 0 ? (
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ismi</TableCell>
                                            <TableCell align="right">Elektron Pochta</TableCell>
                                            <TableCell align="right">Telefon Raqami</TableCell>
                                            <TableCell align="right">Izohlar</TableCell>
                                            <TableCell align="right">O'chirish</TableCell>
                                            <TableCell align="right">Resume</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredUser.map((user) => (
                                            <TableRow
                                                key={user?._id}
                                                sx={{
                                                    "&:last-child td, &:last-child th": {border: 0},
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {user?.name}
                                                </TableCell>
                                                <TableCell align="right">{user?.email}</TableCell>
                                                <TableCell align="right">{user?.phoneNumber}</TableCell>
                                                <TableCell align="right">{user?.opinion}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleDelete(user?._id)}
                                                    >
                                                        <Delete/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleResumeView(user?.resume)}
                                                        variant="outlined"
                                                    >
                                                        Resume Ko'rish
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <div className="job-read-not-found">
                                <h1> Ish bo'yicha hech kim so'rov qoldirmagan </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <iframe allowFullScreen webkitallowFullScreen src={selected}/>
                </Box>
            </Modal>
        </>
    );
};

export default HirejobView;
