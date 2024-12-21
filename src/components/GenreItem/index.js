import "./index.css"

const GenreItem = (props) => {
    const {genreInfo} = props
    const {name} = genreInfo

    return (
        <li className="genre-item text text-light fw-500">
            {name}
        </li>
    )
}

export default GenreItem