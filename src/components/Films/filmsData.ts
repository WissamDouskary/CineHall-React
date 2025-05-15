import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Film {
  id: number;
  title: string;
  genre: string;
  description: string;
  duration: number;
  minimum_age: number;
  image?: string;
  trailer_url?: string;
}

export function useFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsError("No token found, please login");
      return;
    }

    setIsLoading(true);

    const fetchFilms = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/film", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = await res.json();

        if (!res.ok) {
          setIsError( "Failed to fetch films");
          return;
        }

        setFilms(data);
      } catch (error) {
        console.error("Error: "+ (error as Error).message)
        setIsError("Error fetching films, You well logout after 2 seconds...");
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login")
        }, 2000)
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, isLoading, isError };
}