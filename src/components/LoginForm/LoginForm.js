/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import LoginStyles from "./styleloginform.module.css";
import MakedInput from "../Input/Input.jsx";
import {Button} from "@mui/material";
import {LognContextValue} from "../../context/LoginContext";
import {LoginAction} from "../../action/auth";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ActionType} from "../../reducer/LoginReducer";

const LoginForm = () => {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem("admin"));
    const [state, dispatch] = LognContextValue();
    const {loading, error} = state;
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) =>
        setLoginForm({...loginForm, [e.target.name]: e.target.value});

    const handleSubmit = (event) => {
        event.preventDefault();
        if (loginForm.email && loginForm.password) {
            LoginAction(
                {email: loginForm.email, password: loginForm.password},
                dispatch,
                navigate
            );
        } else {
            alert("Formani To'ldiring");
        }
    };

    useEffect(() => {
        if (admin) {
            dispatch({type: ActionType.LOGIN__SUCCES, payload: admin});
            navigate("/");
        }
        // next line
    }, []);

    return (
        <>
            {loading && (
                <>
                    <div className={LoginStyles.loader__container}>
                        <CircularProgress/>
                    </div>
                </>
            )}
            <div className={LoginStyles.login}>
                <div className={`${LoginStyles.login__container} container`}>
                    <div>
                        <img
                            className={LoginStyles.login__logo}
                            src="https://sitelabs.vercel.app/static/media/logo.e54a09ff9b95177251e4.png"
                            alt="login logo"
                        />
                    </div>

                    <div className={LoginStyles.login__formcontainer}>
                        <form onSubmit={handleSubmit}>
                            <div className={LoginStyles.login__forminputcontainer}>
                                <MakedInput
                                    className={LoginStyles.login__forminput}
                                    placeholder={"Emailni Kiriting"}
                                    name={"email"}
                                    value={loginForm.email}
                                    handleChange={handleInputChange}
                                    type="email"
                                />
                            </div>
                            <div className={LoginStyles.login__forminputcontainer}>
                                <MakedInput
                                    name={"password"}
                                    value={loginForm.password}
                                    handleChange={handleInputChange}
                                    className={LoginStyles.login__forminput}
                                    placeholder={"Parolni Kiriting"}
                                    type="password"
                                />
                            </div>

                            {error && (
                                <div className={LoginStyles.login__error}>
                                    <h2>{error}</h2>
                                </div>
                            )}

                            <div className={LoginStyles.login__formbtncontainer}>
                                <Button type="submit" className={LoginStyles.login__formbtn}>
                                    Sahifaga Kirish
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
