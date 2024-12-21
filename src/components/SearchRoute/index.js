import React, { useEffect, useState } from "react";
import { TailSpin } from 'react-loader-spinner';
import Cookies from "js-cookie";
import Navbar from "../Navbar/index";
import SearchResults from "../SearchResults";
import { useLocation } from "react-router-dom";
import "./index.css";

const SearchRoute = () => {
    const location = useLocation();
    const query = location.state?.query || ""; 
    const [updatedData, setMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); 

    useEffect(() => {
        if (query) {
            const fetchMovies = async () => {
                const jwtToken = Cookies.get("jwt_token");
                const options = {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                    method: "GET",
                };
                const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(query)}`;

                setIsLoading(true);
                try {
                    const response = await fetch(apiUrl, options);
                    if (!response.ok) {
                        const errorDetails = await response.json(); 
                        throw new Error(errorDetails.message || "Failed to fetch movies");
                    }
                    const data = await response.json();
                    const arr = data.results || [];
                    const updatedData = arr.map(eachMov => ({
                        backdropPath: eachMov.backdrop_path,
                        id: eachMov.id,
                        posterPath: eachMov.poster_path,
                        title: eachMov.title
                    }));
                    setMovies(updatedData || []);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMovies();
        }
    }, [query]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = updatedData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(updatedData.length / itemsPerPage);

    const renderSearchNotFound = () => (
        <div className="search-not-found">
            <img src="https://res.cloudinary.com/dtxao7nsd/image/upload/v1734272852/Group_3_e7piqk.png" className="search-not-found-image" alt="search not found" />
            <p className="text text-light">Your search {query} was not found</p>
        </div>
    );

    const renderLoader = () => (
        <div className="circle-loader-container2 text-center">
            <TailSpin color="red" height="50" width="50" />
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="search-bg-container">
                {isLoading && renderLoader()}
                {error && <p>Error: {error}</p>}
                {!isLoading && !error && (
                    <div>
                        {currentMovies.length > 0 ? (
                            <>
                                <ul className="movies-list">
                                    {currentMovies.map(eachMovie => (
                                        <SearchResults key={eachMovie.id} movieInfo={eachMovie} />
                                    ))}
                                </ul>
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={currentPage === index + 1 ? "active-page" : ""}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            renderSearchNotFound()
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchRoute;
