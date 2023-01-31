/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    deleteContactMessage,
    sendAnswerToUser,
    updateToRead,
} from "../../axios/contact";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./style.contactread.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import {Delete} from "@mui/icons-material";
import {Button, Input} from "@mui/material";
import {Formik} from "formik";

const ContactRead = () => {
    const {id} = useParams();

    const [message, setMessage] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            navigate("/");
        } else {
            const updateContactRead = async () => {
                const updatedMessage = await updateToRead(id);

                setMessage(updatedMessage.data);
            };
            updateContactRead();
        }
    }, []);

    const handleDelete = () => {
        deleteContactMessage();
        navigate("/");
    };

    return (
        <>
            <Dashboard/>
            <div className="admin-panel-items-left contact-read">
                {message ? (
                    <div className="contact-read-container">
                        <Accordion className="contact-accordian">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{message.email}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography>{message.message}</Typography>
                                    <Typography>
                                        {moment(message.createdAt).format("DD/MM/YYYY")}
                                    </Typography>
                                </div>
                                <Typography className="contact-read-message">
                                    <Button
                                        onClick={() => handleDelete()}
                                        className="contact-read-btn"
                                    >
                                        <Delete className="delete-icon"/>
                                    </Button>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ) : (
                    <div className="err-contact">
                        <h4> Ma'lumot topilmadi </h4>
                    </div>
                )}
                <div className="send-user">
                    <Formik
                        initialValues={{
                            email: message.email && message.email,
                            title: "",
                            answer: "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "Emailni yozing";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = "Bunday email mavjud emas";
                            } else if (values.email !== message.email) {
                                errors.email = "Email bir hil emas";
                            }
                            if (!values.title) {
                                errors.title = "Xabar mazmunini yozing";
                            }
                            if (!values.answer) {
                                errors.answer = "Savol javobini yozing";
                            }
                            return errors;
                        }}
                        onSubmit={(values, {resetForm}) => {
                            sendAnswerToUser(values);
                            navigate("/");
                            resetForm();
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (
                            <form className="send-user-form" onSubmit={handleSubmit}>
                                <div className="send-user-form-item">
                                    <Input
                                        className="send-user-form-input"
                                        placeholder={"Emailni kiriting"}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
                                    />
                                    {errors.email && touched.email && (
                                        <p className="err-info">{errors.email}</p>
                                    )}
                                </div>
                                <div className="send-user-form-item">
                                    <Input
                                        className="send-user-form-input"
                                        placeholder={"Xabar sarlavhasini yozing"}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="title"
                                    />
                                    {errors.title && touched.title && (
                                        <p className="err-info">{errors.title}</p>
                                    )}
                                </div>
                                <div className="send-user-form-item">
                  <textarea
                      className="send-user-form-textarea"
                      placeholder={"Javob matnini kiriting"}
                      value={values.answer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="answer"
                  />
                                    <span className="send-user-form-line"/>
                                    {errors.answer && touched.answer && (
                                        <p className="err-info">{errors.answer}</p>
                                    )}
                                </div>
                                <div className="send-user-form-submit">
                                    <Button className="send-user-form-btn" type="submit">
                                        Jo'natish
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default ContactRead;
