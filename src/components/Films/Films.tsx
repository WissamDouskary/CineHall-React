import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilmCard from "./FilmsCard";

interface Film {
  id: number;
  title: string;
  genre: string;
  duration: number;
  minimum_age: number;
}

function Films() {

    const [films, setFilms] = useState<Film[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setIsLoading(true)
        const fetchfilms = async () => {
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
                    setIsError(data.message)
                }

                setFilms(data);
                setFilteredFilms(data);
            } catch (error) {
                console.error('Error :' + (error as Error).message)
                setIsError('there is an error, try to logout and login again');
            } finally {
                setIsLoading(false)
            }
        }
        fetchfilms()
    }, [navigate])

    useEffect(() => {
        let filtred = films;

        if (genreFilter) {
            filtred = filtred.filter(film => film.genre == genreFilter);
        }

        if (searchTerm) {
            filtred = filtred.filter(film =>
                film.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredFilms(filtred);
    }, [searchTerm, genreFilter, films])

    if (isLoading)
        return (
            <div className="flex items-start justify-center min-h-screen">
                <svg
                    className="animate-spin h-16 w-16 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="Loading spinner"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
        );
    if (isError) return <p className="text-center text-red-600 mt-10">{isError}</p>;

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-center ">Films Collection</h1>
                    <div className="flex gap-6">
                        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className="h-10 w-55 rounded-xl px-3 outline-none border" placeholder="Search..." />
                        <select onChange={(e) => setGenreFilter(e.target.value)} className="h-10 w-44 rounded-xl px-3 outline-none border" name="category-select" id="Category-select">
                            <option value="">Select Option</option>
                            <option value="action">Action</option>
                            <option value="horror">Horror</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredFilms.map((film: Film) => (
                        <FilmCard film={film} key={film.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Films;