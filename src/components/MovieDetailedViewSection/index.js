import React, { Component } from "react";
import Cookies from "js-cookie";
import { TailSpin } from 'react-loader-spinner';
import "./styledComponent.js";
import { MovieContainer } from "./styledComponent.js";
import GenreItem from "../GenreItem/index.js";
import LanguageItem from "../LanguageItem/index.js";
import SimilarMoviesItem from "../SimilarMoviesItem/index.js";
import { FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./index.css";

class MovieDetailedViewSection extends Component {
    state = { isLoading: false, movieDetailsData: {}, genres: [], similarMovies: [], spokenLanguages: [] };

    componentDidMount() {
        this.getMovieDetails();
    }

    componentDidUpdate(prevProps) {
        // Check if movieId has changed
        if (prevProps.movieId !== this.props.movieId) {
            this.getMovieDetails();
        }
    }

    getMovieDetails = async () => {
        this.setState({ isLoading: true });
        const { movieId } = this.props;
        const jwtToken = Cookies.get("jwt_token");
        const apiUrl = `https://apis.ccbp.in/movies-app/movies/${movieId}`;
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: "GET",
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
            const data = await response.json();
            if (data.movie_details) {
                const movieDetails = {
                    adult: data.movie_details.adult,
                    backdropPath: data.movie_details.backdrop_path,
                    budget: data.movie_details.budget,
                    genres: data.movie_details.genres
                        ? data.movie_details.genres.map(eachGenre => ({
                              id: eachGenre.id,
                              name: eachGenre.name,
                          }))
                        : [],
                    id: data.movie_details.id,
                    overview: data.movie_details.overview,
                    posterPath: data.movie_details.poster_path,
                    releaseDate: data.movie_details.release_date,
                    runtime: data.movie_details.runtime,
                    similarMovies: data.movie_details.similar_movies
                        ? data.movie_details.similar_movies.map(eachSimilar => ({
                              backdropPath: eachSimilar.backdrop_path,
                              id: eachSimilar.id,
                              posterPath: eachSimilar.poster_path,
                              title: eachSimilar.title,
                          }))
                        : [],
                    spokenLanguages: data.movie_details.spoken_languages
                        ? data.movie_details.spoken_languages.map(eachLang => ({
                              englishName: eachLang.english_name,
                              id: eachLang.id,
                          }))
                        : [],
                    title: data.movie_details.title,
                    voteAverage: data.movie_details.vote_average,
                    voteCount: data.movie_details.vote_count,
                };

                this.setState({ movieDetailsData: movieDetails, isLoading: false, genres: movieDetails.genres, spokenLanguages: movieDetails.spokenLanguages, similarMovies: movieDetails.similarMovies });
            }
        } else {
            console.error("Error fetching movie details");
        }
    };

    renderLoader = () => (
        <div className="loader-movie-container">
            <TailSpin color="red" height="50" width="50" />
        </div>
    );

    renderMovieDetails = () => {
        const { movieDetailsData, genres, spokenLanguages, similarMovies } = this.state;
        const { adult, backdropPath, budget, id, overview, posterPath, releaseDate, runtime, title, voteAverage, voteCount } = movieDetailsData
        const year = releaseDate ? releaseDate.slice(0, 4) : "";
        return (
            <div className="movie-details-bg-container">
                    <>
                        <MovieContainer bgImage={backdropPath} className="shadow-lg">
                            <h1 className="text text-light">{title}</h1>
                            <div className="d-flex flex-row">
                                <p className="text text-light p-3">{runtime} Minutes</p>
                                <div className="cert-container p-3">
                                    {adult ? (<p className="cert-para text text-light">A</p>) : (<p className=" cert-para text text-light">U/A</p>)}
                                </div>
                                <p className="cert-para text text-light p-3">{year}</p>
                            </div>
                            <h5 className="movie-overview text text-light">{overview}</h5>
                            <button className="btn btn-light mt-4 fw-500 ps-3 pe-3">Play</button>
                        </MovieContainer>
                        <div className="movie-details-container">
                            <div className="responsive-movie-details">
                                <div className="d-flex flex-column m-5">
                                    <h1 className="details-heading text-center">Genres</h1>
                                    <ul className="genre-list">
                                        {genres.map(eachGenre => (
                                            <GenreItem key={eachGenre.id} genreInfo={eachGenre} />
                                        ))}
                                    </ul>
                                </div>
                                <div className="d-flex flex-column m-5">
                                    <h1 className="details-heading">Audio Available</h1>
                                    <ul className="genre-list">
                                        {spokenLanguages.map(eachLanguage => (
                                            <LanguageItem key={eachLanguage.id} langInfo={eachLanguage} />
                                        ))}
                                    </ul>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column m-5">
                                        <div className="ms-5">
                                            <h1 className="details-heading">Rating Count</h1>
                                            <h6 className="fw-500 text text-light">{voteCount}</h6>
                                        </div>
                                        <div className="ms-5 mt-3">
                                            <h1 className="details-heading">Rating Average</h1>
                                            <h6 className="fw-500 text text-light">{voteAverage}</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column m-5"> 
                                        <div className="ms-5">
                                            <h1 className="details-heading">Budget</h1>
                                            <h6 className="fw-500 text text-light">{budget}</h6>
                                        </div>  
                                        <div className="ms-5 mt-3">
                                            <h1 className="details-heading">Release Date</h1>
                                            <h6 className="fw-500 text text-light">{releaseDate}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="heading-style text text-light fw-500">More like this</h4>
                            <ul className="more-movies-list">
                                {similarMovies.map(eachSimilar => (
                                    <SimilarMoviesItem key={eachSimilar.id} movieInfo={eachSimilar} />
                                ))}
                            </ul>
                            <div className="icon-container">
                                <FaGoogle className="icon-style" fill="white" />
                                <BsTwitterX className="icon-style" fill="white" />
                                <FaInstagram className="icon-style" fill="white" />
                                <FaYoutube className="icon-style" fill="white" />
                            </div>
                            <h4 className="text text-light text-center">Contact Us</h4>
                        </div>
                    </>
            </div>
        )
    }

    render() {
        const { isLoading } = this.state;

        return (
            isLoading ? this.renderLoader() : this.renderMovieDetails()
        );
    }
}

export default MovieDetailedViewSection;

