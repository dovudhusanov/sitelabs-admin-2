import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import AddBlogs from "./pages/AddBlogs/AddBlogs";
import AddADS from "./pages/AddADS/AddADS";
import ContactRead from "./pages/ContactRead/ContactRead"
import AdsInterest from "./pages/ADSInterest/ADSInterest";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HirejobView from "./pages/HirejobView/HirejobView";
import PlanInterest from "./pages/PlanInterest/PlanInterest";
import AllAdmins from "./pages/AllAdmins/AllAdmins";
import HireAdminView from "./pages/HireAminView/HireAdminView";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (!localStorage.getItem("admin")) {
    //         navigate("/");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            {!localStorage.getItem("admin") ? (
                <Login/>
            ) : (
                <>
                    <Header/>
                    <div style={{paddingTop: 50, backgroundColor: "#E6E6E6"}}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/profile/settings" element={<ProfilePage/>}/>
                            <Route path="/add-blogs" element={<AddBlogs/>}/>
                            <Route path="/add-ads" element={<AddADS/>}/>
                            <Route path="/contact/read/:id" element={<ContactRead/>}/>
                            <Route path="/interests-ads" element={<AdsInterest/>}/>
                            <Route path="/interests-ads/create" element={<AdsInterest/>}/>
                            <Route path="/interests-ads/update" element={<AdsInterest/>}/>
                            <Route path="/interests-ads/job/:id" element={<HirejobView/>}/>
                            <Route path="/plan-interest" element={<PlanInterest />} />
                            <Route path="/all-admins" element={<AllAdmins />} />
                            <Route path="/all-admins/create" element={<AllAdmins/>}/>
                            <Route path="/all-admins/update" element={<AllAdmins/>}/>
                            <Route path="/all-admins/job/:id" element={<HireAdminView/>}/>
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
