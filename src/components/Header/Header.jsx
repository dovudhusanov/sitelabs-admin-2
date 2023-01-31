/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import "./style.header.css";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import fetchHook from "../../custom-hook/Fetch";
import moment from "moment";
import {
  deleteContactMessage,
  getAllContactMessage,
} from "../../axios/contact";

const Header = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [read, setRead] = useState([]);
  const contactContainer = useRef();
  const contactMessage = fetchHook(getAllContactMessage);
  const navigate = useNavigate();
  const handleContectHandler = () =>
    contactContainer.current.classList.toggle("active");
  // nofify me function called when window width > 992  because this is laptop
  const notifyMessage = () => {
    if (window.innerWidth > 992) {
      Notification.requestPermission();

      if (Notification.permission === "granted") {
        // new Notification("Foydalanuchidan yangi habar kelgan", {
        //   icon: "https://iconarchive.com/download/i94479/blackvariant/button-ui-system-apps/Messages-2.ico",
        //   body: `Iltimos iloji borija tezroq javob bering!`,
        // });
      } else {
        console.warn("Iltimos sahifa bildirishnomalarini yozib qo'ying");
      }
    } else {
      console.log("Bu funksiya faqat laptoplar uchun");
    }
  };

  useEffect(() => {
    if (contactMessage) {
      if (contactMessage["fetchedData"].length > 0) {
        setRead(
          contactMessage["fetchedData"].filter(
            (conMsg) => conMsg.isRead === false
          )
        );
        notifyMessage();
      }
    }
  }, [contactMessage["fetchedData"].length]);

  useEffect(() => {
    contactContainer.current.classList.remove("active");
  }, [window.location.pathname]);

  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="header-leftside">
            <h1>{admin?.admin?.name} </h1>
          </div>
          <div className="header-rightside">
            <div className="header-icon">
              <NotificationAddIcon
                onClick={handleContectHandler}
                className="header-icons active"
              />

              <div className="contact-list-container" ref={contactContainer}>
                {contactMessage["fetchedData"].length > 0 ? (
                  <>
                    <ul className="contact-list">
                      {contactMessage["fetchedData"].map((contact) => {
                        return (
                          <li
                            onClick={() =>
                              navigate(`/contact/read/${contact._id}`)
                            }
                            key={contact._id}
                            className={`contact-list-item ${
                              !contact.isRead && "unread"
                            }`}
                          >
                            <span className="contact-email">
                              {contact.email}
                            </span>
                            <span className="contact-time">
                              {moment(contact.createdAt).format("DD/MM/YYYY")}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <h3 className="contact-info-heading">
                    Hozircha xabar mavjud emas
                  </h3>
                )}
              </div>
            </div>
            <div className="header-icon">
              <NavLink to={"/profile/settings"}>
                <SettingsIcon className="header-icons" />
              </NavLink>
            </div>
            <div className="header-info">
              <h4 className="header-email"> {admin?.admin?.email} </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
