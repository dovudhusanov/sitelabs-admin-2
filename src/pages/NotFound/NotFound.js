import React, {useEffect} from 'react';
import "./NotFound.css"
import {Link, useNavigate} from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/404");
    }, [window.location.pathname])

    return (
        <>
            <div id='oopss'>
                <div id='error-text'>
                    <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
                    <span>404 SAHIFA</span>
                    <p className="p-a">
                        . Siz qidirayotgan sahifa topilmadi</p>
                    <p className="p-b">
                        ... Bosh sahifaga qaytish
                    </p>
                    <Link to="/" className="back-btn">Bosh sahifa</Link>
                </div>
            </div>
        </>
    );
}

export default NotFound;