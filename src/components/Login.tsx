import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [formData, setFormData] = useState({email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false);
    const [isError, setIsError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/")
        }
    }, [navigate])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            
            const data = await res.json();

            if(res.ok){
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                console.log('loggined in...')
                setIsRegistered(true)
                navigate("/");
            }else{
                setIsError(data.message || "Login failed. Please try again.");
                return;
            }
        } catch (error) {
            console.error("Error:" + (error as Error).message);
            setIsError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-8 py-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                        <p className="text-gray-600 mt-2">Connect to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                autoComplete="username"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Login...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
                {isRegistered && (
                    <p className="text-green-600 mt-4 ml-6">✅Login successfully!</p>
                )}

                <p className="text-red-600 mt-4 ml-6 text-bold">{isError}</p>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        You don't have an account? Create One!{" "}
                        <Link to="/Register" className="text-blue-600 hover:text-blue-800 font-medium">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;