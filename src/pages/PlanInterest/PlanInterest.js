import React, {useEffect, useState} from 'react';
import "./PlanInsterest.css"
import Dashboard from "../../components/Dashboard/Dashboard";
import axios from "../../axios";
import {getAllPlanInterests} from "../../axios/plan";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    {id: 'name', label: 'Plan Name', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 100},
    {
        id: 'message',
        label: 'Message',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    }
];

function PlanInterest() {

    const [planData, setPlanData] = useState([])

    const planDataGet = async () => {
        await axios.get("https://sitelabs-backend.herokuapp.com/api/contact")
            .then(res => {
                setPlanData(res.data)
                console.log(res.data)
            })

            .catch(err => console.error("Error", err))
    }

    useEffect(() => {
        planDataGet()
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Dashboard/>
            <div className="admin-panel-items-left planInt">
                <div style={{marginTop: 120}}>
                    <Paper sx={{width: '90%', overflow: 'hidden', margin: "0 auto"}}>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {planData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 50]}
                            component="div"
                            count={planData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </>
    );
}


export default PlanInterest