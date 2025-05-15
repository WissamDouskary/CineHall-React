import type { Session } from "./FilmDetails";

interface FilmModalProps {
    session: Session;
    closeModal: () => void;
}

function FilmModal({ session, closeModal }: FilmModalProps) {

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
                    <form id="booking-form">
                        <input type="hidden" name="session_id" value={session.id} />

                        <label htmlFor="seat-type" className="block mb-2 text-sm font-medium">Seat Type:</label>
                        <select id="seat-type" name="type" className="w-full border px-3 py-2 rounded-md mb-4" required>
                            <option value="solo">Solo</option>
                            <option value="couple">Couple</option>
                        </select>

                        <div id="solo-seat-group" className="mb-4">
                            <label htmlFor="seat" className="block mb-2 text-sm font-medium">Seat Number:</label>
                            <input type="number" id="seat" name="seat" min="1"
                                className="w-full border px-3 py-2 rounded-md" required></input>
                        </div>

                        <div id="couple-seat-group" className="mb-4 hidden">
                            <label className="block mb-2 text-sm font-medium">Seat Numbers (Couple):</label>
                            <div className="flex space-x-2">
                                <input type="number" id="seat1" name="seat1" min="1"
                                    className="w-1/2 border px-3 py-2 rounded-md"></input>
                                <input type="number" id="seat2" name="seat2" min="1"
                                    className="w-1/2 border px-3 py-2 rounded-md"></input>
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

export default FilmModal;