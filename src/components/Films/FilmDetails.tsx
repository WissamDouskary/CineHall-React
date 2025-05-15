import { useParams } from "react-router-dom";
import { useFilms } from "./filmsData";

function FilmDetails() {
    const { films, isLoading } = useFilms();
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-red-500">Invalid film ID</h2>
            </div>
        );
    }

    const filmId = parseInt(id);

    const film = films.find((f) => f.id === filmId)

    if (isLoading) {
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
    }

    if (!film) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-red-500">Film not found</h2>
            </div>
        );
    }

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    function convertYouTubeToEmbed(url: string) {
        try {
            if (!url) {
                console.log("URL not found!");
                return null;
            }

            if (url.includes("youtu.be")) {
                const videoId = url.split("/").pop()?.split("?")[0];
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (url.includes("youtube.com/watch")) {
                const urlObj = new URL(url);
                const videoId = urlObj.searchParams.get("v");
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (url.includes("youtube.com/embed")) {
                return url;
            }

            return null;
        } catch (error) {
            console.error("Invalid URL:", error);
            return "Invalid URL";
        }
    }

    const embedLink = film.trailer_url ? convertYouTubeToEmbed(film.trailer_url) : null;

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                {/* Film Hero Section */}
                <div className="relative rounded-xl overflow-hidden mb-8">
                    {/* Background Image (Blurred) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('http://localhost:8000/storage/placeholder-bg.jpg')",
                            filter: "blur(8px)",
                            opacity: 0.3
                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start">
                        {/* Poster */}
                        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 w-full md:w-auto">
                            <img
                                id="film-image"
                                src={`http://localhost:8000/storage/${film.image}`}
                                alt="Film poster"
                                className="w-full md:w-80 h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Film Info */}
                        <div className="flex-1">
                            <h1 id="film-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{film.title}</h1>

                            <div className="flex flex-wrap items-center mb-6">
                                <span
                                    id="film-genre"
                                    className="px-3 py-1 bg-rose-100 text-rose-800 text-sm rounded-full mr-3 mb-2"
                                >
                                    {film.genre}
                                </span>
                                <div className="flex items-center mr-4 mb-2">
                                    <i className="fas fa-clock text-rose-600 mr-2"></i>
                                    <span id="film-duration" className="text-gray-700">{formatDuration(film.duration)}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Synopsis</h2>
                                <p id="film-description" className="text-gray-700 leading-relaxed">
                                    {film.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap">
                                <a
                                    href="#showtimes"
                                    className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 mr-3 mb-3 flex items-center"
                                >
                                    <i className="fas fa-ticket-alt mr-2"></i> Book Tickets
                                </a>
                                <a
                                    href="#trailer"
                                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3 flex items-center"
                                >
                                    <i className="fas fa-play mr-2"></i> Watch Trailer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trailer Section */}
                <div id="trailer" className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trailer</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <div
                            id="film-trailler"
                            className="w-full rounded-lg bg-black h-0 pb-[56.25%] relative"
                        >
                            <iframe
                                width="1425"
                                height="800"
                                src={embedLink ?? undefined}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Showtimes Section */}
                <div id="showtimes" className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sessions</h2>
                    <div id="session-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            <div id="booking-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
                <div className="bg-white rounded-lg shadow-md p-6 w-96 relative">
                    <button
                        onClick={() => { }} // Remplace avec ta fonction JS
                        className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
                    >
                        ×
                    </button>
                    <h3 className="text-lg font-semibold mb-4">Book Session</h3>
                    <form id="booking-form">
                        <input type="hidden" name="session_id" id="booking-session-id" />

                        <label htmlFor="seat-type" className="block mb-2 text-sm font-medium">Seat Type:</label>
                        <select id="seat-type" name="type" className="w-full border px-3 py-2 rounded-md mb-4" required>
                            <option value="solo">Solo</option>
                            <option value="couple">Couple</option>
                        </select>

                        <div id="solo-seat-group" className="mb-4">
                            <label htmlFor="seat" className="block mb-2 text-sm font-medium">Seat Number:</label>
                            <input type="number" id="seat" name="seat" min="1" className="w-full border px-3 py-2 rounded-md" required />
                        </div>

                        <div id="couple-seat-group" className="mb-4 hidden">
                            <label className="block mb-2 text-sm font-medium">Seat Numbers (Couple):</label>
                            <div className="flex space-x-2">
                                <input type="number" id="seat1" name="seat1" min="1" className="w-1/2 border px-3 py-2 rounded-md" />
                                <input type="number" id="seat2" name="seat2" min="1" className="w-1/2 border px-3 py-2 rounded-md" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FilmDetails;