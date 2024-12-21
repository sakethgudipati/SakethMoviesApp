import { Component } from "react";
import {TailSpin} from 'react-loader-spinner'
import Cookies from "js-cookie"
import TrendingMoviesItem from "../TrendingMoviesItem/index"
import "./index.css"

class TrendingMovies extends Component {
    state = {
        data: [],
        isLoading: false
    }

    componentDidMount() {
        this.getTrendingMovies()
    }
    
    getTrendingMovies = async () => {
        this.setState({isLoading: true})
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
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
            this.setState({data: formattedData})
            this.setState({isLoading: false})
        }
    }

    renderTrending = () => {
        const {data} = this.state
        return (
            <ul className="trending-movies-list d-flex flex-row">
                {data.map(eachTrendingMovie => (
                    <TrendingMoviesItem key={eachTrendingMovie.id} movieInfo={eachTrendingMovie} />
                ))}
            </ul>
        )
    }

    renderLoader = () => (
        <div className="circle-loader-container2 text-center">
            <TailSpin color="red" height="50" width="50" />
        </div>
    )

    render() {
        const {isLoading} = this.state
        return (
            <div className="responsive-container">
                {isLoading ? this.renderLoader() : this.renderTrending()}
            </div>
        )
    }
}

export default TrendingMovies