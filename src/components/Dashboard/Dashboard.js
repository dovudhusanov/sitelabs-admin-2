import React, {useState, useRef, useEffect} from "react";
import "./Dashboard.css";
import {Button} from "@mui/material";
import {Link, NavLink, useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoPng from "../../images/logo.png";

function Dashboard(props) {
    const btnRef = useRef();

    const navigate = useNavigate();

    function btnDashboard(e) {
        e.preventDefault();
        btnRef.current.classList.toggle("active");
    }

    function btnDashboardClose() {
        if (btnRef.current["classList"].contains("active")) {
            btnRef.current["classList"].remove("active");
        }
    }

    function handleLogOut() {
        localStorage.removeItem("admin");
        navigate("/");
    }

    return (
        <div className="dashboard-main-con">
            <Button
                variant="contained"
                type="button"
                startIcon={<MenuIcon/>}
                className="menu-btn"
                onClick={btnDashboard}
            >
                Menu
            </Button>
            <div className="dashboard-container" ref={btnRef}>
                <NavLink to="/">
                    <img src={LogoPng} alt="sitelabs logo" className="dashboard-logo"/>
                </NavLink>
                <i
                    className="fa-solid fa-xmark close-dashboard"
                    onClick={btnDashboardClose}
                ></i>
                <ul className="dashboard-items">
                    <li>
                        <NavLink to="/add-blogs">
                            <Button className="profile-btn">
                                <i className="fa-solid fa-pen"></i> Blog qo'shish
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-ads">
                            <Button className="profile-btn">
                                <i className="fa-solid fa-pen" style={{top: "-1.7px"}}></i>{" "}
                                Elon qo'<s></s>hish
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/interests-ads">
                            <Button className="profile-btn">
                                <i
                                    className="fa-solid fa-user-headset"
                                    style={{top: "-1.1px"}}
                                ></i>
                                Ish E'lonlari
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/plan-interest">
                            <Button className="profile-btn">
                                <i
                                    className="fa-solid fa-user-headset"
                                    style={{top: "-1.1px"}}
                                ></i>
                                Rejaga Qiziqishlar
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/all-admins">
                            <Button className="profile-btn">
                                <i
                                    className="fa-solid fa-user-headset"
                                    style={{top: "-1.1px"}}
                                ></i>
                                Adminlar
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <Button className="profile-btn" onClick={handleLogOut}>
                            <i className="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                            Sahifadan Chiqish
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
