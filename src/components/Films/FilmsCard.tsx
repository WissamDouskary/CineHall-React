import { Link } from "react-router-dom";

interface Film {
  id: number;
  title: string;
  genre: string;
  duration: number;
  minimum_age: number;
  image?: string;
}

interface FilmCardProps {
  film: Film;
}

function FilmCard({ film } : FilmCardProps ) {
  const formatDuration = (minutes : number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={`http://127.0.0.1:8000/storage/${film.image}`}
          alt={film.title}
          className="w-full h-[400px] object-cover rounded-t-lg"
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
        <Link to={`/film/${film.id}`} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-10 mt-2 rounded-md font-medium transition-colors duration-300">
          See Details
        </Link>
      </div>
    </div>
  )
}

export default FilmCard