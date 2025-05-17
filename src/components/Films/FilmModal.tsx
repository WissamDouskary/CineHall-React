import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Session } from "./FilmDetails";

interface FilmModalProps {
    session: Session;
    closeModal: () => void;
}

function FilmModal({ session, closeModal }: FilmModalProps) {

    const [isCouple, setIsCouple] = useState(false);
    const [isError, setIsError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState("");
    const [formData, setFormData] = useState({
        session_id: 0,
        type: "solo",
        seats: [] as number[],
    });

    const token = localStorage.getItem('token');

    const showsection = (seatType: string) => {
        setIsCouple(seatType === "couple");
        setFormData(prev => ({
            ...prev,
            type: seatType,
            seats: [],
        }));
    }

    useEffect(() => {
        setFormData(prev => ({ ...prev, session_id: session.id }));
    }, [session.id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "seat") {
            setFormData(prev => ({
                ...prev,
                seats: value ? [Number(value)] : [],
            }));
        } else if (name === "seat1" || name === "seat2") {
            setFormData(prev => {
                const updatedSeats = [...prev.seats];
                const index = name === "seat1" ? 0 : 1;

                if (value) {
                    updatedSeats[index] = Number(value);
                } else {
                    updatedSeats.splice(index, 1);
                }
                return {
                    ...prev,
                    seats: updatedSeats,
                };
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsError('');
        setIsSuccess('');
        setIsLoading(true);

        if (formData.seats.length === 0) {
            setIsError('Please select seat(s)');
            setIsLoading(false);
            return;
        }

        try {
            console.log("Sending formData:", formData);
            const res = await fetch('http://127.0.0.1:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(`${data.message}`);
            }
            console.log("Reservation successful:", data);
            setIsSuccess('Reservation successful!');
        } catch (error) {
            setIsError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                id="booking-modal"
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closeModal}
            >
                <div
                    className="bg-white rounded-lg shadow-md p-6 w-96 relative"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
                    >
                        ×
                    </button>
                    <h3 className="text-lg font-semibold mb-4">Book Session</h3>
                    <form id="booking-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="session_id" value={session.id} />

                        <label htmlFor="seat-type" className="block mb-2 text-sm font-medium">Seat Type:</label>
                        <select
                            id="seat-type"
                            onChange={(e) => showsection(e.target.value)}
                            value={formData.type}
                            name="type"
                            className="w-full border px-3 py-2 rounded-md mb-4"
                            required
                        >
                            <option value="solo">Solo</option>
                            <option value="couple">Couple</option>
                        </select>

                        {!isCouple && (<div id="solo-seat-group" className="mb-4">
                            <label htmlFor="seat" className="block mb-2 text-sm font-medium">Seat Number:</label>
                            <input type="number" onChange={handleChange} id="seat" name="seat" min="1" value={formData.seats[0] || ''}
                                className="w-full border px-3 py-2 rounded-md" ></input>
                        </div>)}

                        {isCouple && (<div id="couple-seat-group" className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Seat Numbers (Couple):</label>
                            <div className="flex space-x-2">
                                <input type="number" id="seat1" name="seat1" min="1" onChange={handleChange} value={formData.seats[0] || ''}
                                    className="w-1/2 border px-3 py-2 rounded-md"></input>
                                <input type="number" id="seat2" name="seat2" min="1" onChange={handleChange} value={formData.seats[1] || ''}
                                    className="w-1/2 border px-3 py-2 rounded-md"></input>
                            </div>
                        </div>)}

                        {isError && <p className="text-red-500 font-bold my-2">{isError}</p>}
                        {isSuccess && <p className="text-green-500 font-bold my-2">{isSuccess}</p>}

                        <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700">
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
                                    Confirm Booking...
                                </div>
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default FilmModal;