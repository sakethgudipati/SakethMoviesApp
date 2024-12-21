import { Component } from "react"
import {TailSpin} from 'react-loader-spinner'
import Cookies from "js-cookie"
import "./index.css"
import OriginalMoviesItem from "../OriginalMoviesItem"

class OriginalMovies extends Component {
    state = {
        originalsData: [],
        isLoading: false
    }

    componentDidMount() {
        this.getTrendingMovies()
    }
    
    getTrendingMovies = async () => {
        this.setState({isLoading: true})
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
            this.setState({originalsData: formattedData,isLoading: false})
        }
    }

    renderOriginal = () => {
        const {originalsData} = this.state
        return (
            <ul className="original-movies d-flex flex-row">
                {originalsData.map(eachOriginal => (
                    <OriginalMoviesItem key={eachOriginal.id} movieInfo={eachOriginal} />
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
                {isLoading ? this.renderLoader() : this.renderOriginal()}
            </div>
        )
    }
}

export default OriginalMovies