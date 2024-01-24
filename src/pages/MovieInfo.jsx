import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/MovieInfo.css";
import NO_IMAGE from "../assets/no-image.svg";
import { convertDateFormat, getRating } from "../utils";

export default function MovieInfo() {
  const { id } = useParams();

  const { data, isLoading } = useFetch({
    endpoint: `/movie/${id}`,
  });

  if (isLoading || !data) {
    return (
      <div className="loader">
        <div />
      </div>
    );
  }

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={
            data?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data?.backdrop_path}`
              : NO_IMAGE
          }
        />
      </div>

      <div className="movie__detail">
        <div className="movie__detailLeft">
          <img
            className="movie__poster"
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
          />
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{data?.original_title}</div>
            <div className="movie__tagline">{data?.tagline}</div>
            <div className="movie__rating">
              {getRating(data)} <i className="fas fa-star" />
            </div>
            <div className="movie__runtime">{data?.runtime + " mins"}</div>
            {data?.release_date && (
              <div className="movie__releaseDate">
                {"Release date: " + convertDateFormat(data?.release_date)}
              </div>
            )}
            <div className="movie__genres">
              {data?.genres?.map((genre) => (
                <span className="movie__genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{data?.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
