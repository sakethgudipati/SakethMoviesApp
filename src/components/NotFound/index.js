import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFound = () => {
    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate("/"); // Redirects to the homepage
    };

    return (
        <div className="not-found-container">
            <div className="second-bg">
                <h1 className="not-found-head text text-light">Lost Your Way?</h1>
                <p className="not-found-para">
                    We are sorry, the page you requested could not be found. <br />
                    Please go back to the homepage.
                </p>
                <button className="btn btn-light" onClick={onClickNavigate}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
