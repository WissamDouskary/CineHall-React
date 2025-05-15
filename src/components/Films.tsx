import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Films() {

    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("")

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
            } catch (error) {
                console.error('Error :' + (error as Error).message)
                setIsError('there is an error, try to logout and login again');
            } finally {
                setIsLoading(false)
            }
        }
        fetchfilms()
    }, [navigate])

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

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
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Films Collection</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${film.image}`}
                                    alt={film.title}
                                    className="w-full h-[400px] object-cover"
                                />

                                <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                    {film.minimum_age}+
                                </div>

                                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded capitalize">
                                    {film.genre}
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-1">{film.title}</h2>

                                <p className="text-gray-600 text-sm mb-3">Duration: {formatDuration(film.duration)}</p>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-300">
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Films;