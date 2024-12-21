import {Link} from "react-router-dom"
import "./index.css"

const SearchResults = (props) => {
    const {movieInfo} = props
    const {posterPath,id} = movieInfo

    return (
        <Link to={`/movies/${id}`}>
            <li className="search-item2">
                <img src={posterPath} alt={id} className="poster-image" />
            </li>
        </Link>
    )
}

export default SearchResults