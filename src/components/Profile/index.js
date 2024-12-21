import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import { TailSpin } from "react-loader-spinner"
import { FaGoogle,FaInstagram,FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./index.css";


const Profile = () => {
    const navigate = useNavigate(); 

    const onClickLogout = () => {
        isLoading = true;
        Cookies.remove("jwt_token");
        navigate("/login"); 
    };
    
    let isLoading = false;

    return (
        <>
            <Navbar className="bg bg-dark" />
            <div className="profile-container">
                <h1 className="text text-dark">Account</h1>
                <hr />
                <div className="d-flex flex-row">
                    <p className="side-heading">Membership</p>
                    <div className="ps-3">
                    <p className="para-profile text text-dark">sakethkasyap.gudipati@gmail.com</p>
                        <div className="d-flex flex-row">
                            <p className="side-heading2">Password: </p>
                            <p className="para-profile text text-dark ps-2">************</p>
                        </div> 
                    </div>  
                </div>
                <hr fill="silver" />        
                <div className="d-flex flex-row">
                    <p className="side-heading">Plan details</p>
                    <p className="para-profile text text-dark ps-4">Premium</p>
                    <div className="ultra-hd">
                        <p className=" para-profiletext text-dark ms-3">Ultra HD</p>
                    </div>
                </div>            
                <hr />
                <div className="text-center">
                    {isLoading ? (
                        <button className="btn btn-danger mt-4">
                            <TailSpin color="white" height={30} width={30}  />
                        </button>
                    ) : (
                        <button className="btn btn-danger mt-4" onClick={onClickLogout}>Log out</button>
                    )}
                </div>
    
            </div>
            <div className="icon-profile-container">
                <div className="icon-container">
                            <FaGoogle className="icon-style" fill="white" />
                            <BsTwitterX className="icon-style" fill="white" />
                            <FaInstagram className="icon-style" fill="white" />
                            <FaYoutube className="icon-style" fill="white" />
                </div>
                <h4 className="text text-light text-center">Contact Us</h4>
            </div>
        </>
    )
};

export default Profile;

