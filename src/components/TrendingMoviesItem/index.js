import {Link} from "react-router-dom"
import "./index.css"

const TrendingMoviesItem = (props) => {
    const {movieInfo} = props 
    const {posterPath,id} = movieInfo
    return (
        <Link to={`/movies/${id}`}>
            <li className="trending-movies-item">
                <img src={posterPath} className="poster-image" alt={id} />
            </li>
        </Link>
    )
}

export default TrendingMoviesItem