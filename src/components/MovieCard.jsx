import React from "react";
import NO_IMAGE from "../assets/no-image.svg";
import { useNavigate } from "react-router-dom";
import { convertDateFormat, getRating } from "../utils";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="movie__card" onClick={() => navigate(`/movie/${movie.id}`)}>
      {movie?.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="poster"
          className="movie__posterImage"
        />
      ) : (
        <img src={NO_IMAGE} className="no__image" alt="poster" />
      )}

      <div className="movie__cardInfo">
        <p>{movie.title}</p>
        <p>
          {getRating(movie)} <i className="fas fa-star" />
        </p>

        <p className="movie__release">
          Release Date: {convertDateFormat(movie?.release_date)}
        </p>
      </div>
    </div>
  );
}
