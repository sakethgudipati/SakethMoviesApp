import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './index.css';

const ExpandableSearch = () => {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();

    const onChangeSearch = (event) => {
        setInputValue(event.target.value);
    };

    const onSearch = () => {
        setIsActive(!isActive);
        navigate("/search", { state: { query: inputValue } });
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={inputValue}
                className={`search-input ${isActive ? 'active' : ''}`}
                placeholder="Search..."
                onBlur={() => setIsActive(false)}
                onChange={onChangeSearch}
            />
            <button className="search-button" onClick={onSearch}>
                <FaSearch color="white" className="search-icon" />
            </button>
        </div>
    );
};

export default ExpandableSearch;

