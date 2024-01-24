import { useEffect, useState } from "react";

const API_URL = "https://api.themoviedb.org/3";

export default function useFetch({ endpoint }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const url = `${API_URL}/${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const result = await fetch(url, options);
        const data = await result.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [url]);

  return { data, isLoading };
}
