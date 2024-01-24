import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import "../styles/Home.css";
import MoviesList from "../components/MoviesList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = useFetch({
    endpoint: `/search/movie?include_adult=false&query=${encodeURIComponent(
      debouncedQuery
    )}&language=en-US&page=1`,
  });

  function sortMoviesByRating(movies, sortOrder) {
    if (!movies) {
      return movies;
    }
    if (sortOrder === "asc") {
      return movies.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortOrder === "desc") {
      return movies.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      return movies;
    }
  }

  return (
    <div className="container">
      <div className="filters__container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search__input"
        />

        <select
          className="sortByRating"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By Rating</option>
          <option value="asc">Sort By Ascending</option>
          <option value="desc">Sort By Descending</option>
        </select>
      </div>

      <MoviesList
        movies={sortMoviesByRating(data?.results, sortBy)}
        isLoading={isLoading}
        query={query}
      />
    </div>
  );
}
