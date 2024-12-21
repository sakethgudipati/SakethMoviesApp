import {Link} from "react-router-dom"
import "./index.css"

const PopularItem = (props) => {
    const {movieInfo} = props 
    const {posterPath,id} = movieInfo

    return (
        <Link to={`/movies/${id}`}>
            <li className="popular-item">
                <img src={posterPath} className="popular-image" alt={id} />
            </li>
        </Link>
    )
}

export default PopularItem