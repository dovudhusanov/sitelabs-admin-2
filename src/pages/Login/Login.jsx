import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginContextProvider } from "../../context/LoginContext";
import { initialState, LoginReducer } from "../../reducer/LoginReducer";
const Login = () => {
  return (
    <LoginContextProvider reducer={LoginReducer} initialState={initialState}>
        <div className='admin-dashboard'>
            <LoginForm />
        </div>
    </LoginContextProvider>
  );
};

export default Login;
