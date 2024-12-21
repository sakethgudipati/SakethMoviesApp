import "./index.css"

const LanguageItem = (props) => {
    const {langInfo} = props 
    const {englishName} = langInfo

    return (
        <li className="genre-item text text-light fw-500">
            {englishName}
        </li>
    )
}

export default LanguageItem