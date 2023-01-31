import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import HomeDashboard from "../../components/HomeDashboard/HomeDashboard";

import {HomeDashboardProvider} from "../../context/HomeDashboardContext";
import {
    HomeDashboardReducer,
    homeDashboardState,
} from "../../reducer/HomeDashboard";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("admin")) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home-page">
            <Dashboard/>
            <div className="admin-panel-items-left">
                <HomeDashboardProvider
                    reducer={HomeDashboardReducer}
                    initialState={homeDashboardState}
                >
                    <HomeDashboard/>
                </HomeDashboardProvider>
            </div>
        </div>
    );
};

export default Home;
