import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-orange-500">404</h1>
                <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
                <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
