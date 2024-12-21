import { Component } from "react"
import {TailSpin} from 'react-loader-spinner'
import Cookies from "js-cookie"
import Navbar from "../Navbar"
import PopularItem from "../PopularItem"
import { FaGoogle,FaInstagram,FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./index.css"

class Popular extends Component {
    state = {
        popularData: [],
        isLoading: false
    }

    componentDidMount() {
        this.getTrendingMovies()
    }
    
    getTrendingMovies = async () => {
        this.setState({isLoading: true})
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const data = await response.json()
            const arr = data.results
            const formattedData = arr.map(eachData => ({
                backdropPath: eachData.backdrop_path,
                id: eachData.id,
                overview: eachData.overview,
                posterPath: eachData.poster_path,
                title: eachData.title
            }))
            this.setState({popularData: formattedData,isLoading: false})
        }
    }

    renderPopular = () => {
        const {popularData} = this.state
        return (
            <ul className="popular-movie-list">
                {popularData.map(eachPopular => (
                    <PopularItem key={eachPopular.id} movieInfo={eachPopular} />
                ))}   
            </ul>
        )
    }

    renderLoader = () => (
        <div className="circle-loader-container text-center">
            <TailSpin color="red" height="50" width="50" />
        </div>
    )

    render() {
        const {isLoading} = this.state
        return (
            <>
                <Navbar />
                <div className="popular-bg-container">
                    {isLoading ? this.renderLoader() : this.renderPopular()}
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
    }
}

export default Popular

