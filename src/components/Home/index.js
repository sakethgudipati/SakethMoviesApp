import Cookies from "js-cookie"
import Navbar from "../Navbar"
import "./index.css"
import TrendingMovies from "../TrendingMovies/index"
import OriginalMovies from "../OriginalMovies/index"
import { FaGoogle,FaInstagram,FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";


const Home = () => (

        <>
            <Navbar />
            <div className="home-container">
                <h1 className="text text-light home-banner-head">Super Man</h1>
                <p className="text-light home-banner-para">Superman is a fictional superhero who first <br /> appeared in American comic books published by  DC Comics.</p>
                <button className="btn btn-light home-banner-button ps-4 pe-4">Play</button>
            </div>
            <div className="bottom-home-container">
                <h1 className="text text-light bottom-home-head">Trending Now</h1>
                <TrendingMovies />
                <h1 className="text text-light bottom-home-head">Originals</h1>
                <OriginalMovies />
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


export default Home