import {Link} from "react-router-dom"
import "./index.css"

const SimilarMoviesItem = (props) => {
    const {movieInfo} = props
    const {id, posterPath} = movieInfo

    return (
        <Link to={`/movies/${id}`}>
            <li className="similar-movies-item">
                <img src={posterPath} className="poster-image" alt={id} />
            </li>
        </Link>
    )
}

export default SimilarMoviesItem