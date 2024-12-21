import {Link} from "react-router-dom"
import "./index.css"

const OriginalMoviesItem = (props) => {
    const {movieInfo} = props 
    const {posterPath,id} = movieInfo
    return (
        <Link to={`/movies/${id}`}>
            <li className="original-movies-item">
                <img src={posterPath} className="poster-image" alt={id} />
            </li>
        </Link>
    )
}

export default OriginalMoviesItem