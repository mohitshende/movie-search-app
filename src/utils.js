export function getRating(movie) {
  if (!movie?.vote_average || movie?.vote_average == 0) return 0;
  return movie?.vote_average?.toFixed(1);
}

export function convertDateFormat(inputDate) {
  const [year, month, day] = inputDate.split("-");

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
