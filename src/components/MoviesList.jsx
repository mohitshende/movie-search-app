import React from "react";
import MovieCard from "./MovieCard";

export default function MoviesList({ movies, isLoading, query }) {
  if (isLoading) {
    return (
      <div className="movies__container">
        {Array.from({ length: 8 }, (_, id) => {
          return <div key={id} className="skeleton movie__card" />;
        })}
      </div>
    );
  }

  if (query == "") {
    return (
      <div className="movies__container">
        <p className="no__resultsText">
          Please search for a movie to see results
        </p>
      </div>
    );
  }

  if (movies?.length == 0) {
    return (
      <div className="movies__container">
        <p className="no__resultsText">No movies found</p>
      </div>
    );
  }

  return (
    <div className="movies__container">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
