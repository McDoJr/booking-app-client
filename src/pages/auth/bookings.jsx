import Header from "../../components/header.jsx";
import {
    FaChevronLeft,
    FaChevronRight,
    FaCircleChevronLeft,
} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ProfileContext} from "../../App.jsx";
import Booking from "../../components/booking.jsx";
import {notNull} from "../../utils/utils.js";
import axios from "axios";

const Bookings = () => {

    const {profile, allBookings, fetchBookings} = useContext(ProfileContext);
    const bookings = (
        notNull(profile) ? (profile.bookings ? profile.bookings : []) : allBookings
    );
    const isAdmin = notNull(allBookings);
    const navigate = useNavigate();
    const [canceledBooking, setCanceledBooking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = bookings.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(bookings.length / recordsPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);
    const firstCondition = (numberOfPages - currentPage) < 4;
    const secondCondition = currentPage - (currentPage === 1 ? 1 : 2);
    const thirdCondition = currentPage + (currentPage === 1 ? 4 : 3);
    const pages = numbers.slice(firstCondition ? numberOfPages - 5 : (secondCondition), (thirdCondition));

    const checkPage = () => {
        if(records.length === 0 && currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    checkPage();

    const previousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const setPage = (page) => {
        setCurrentPage(page);
    }

    const nextPage = () => {
        if(currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const showPopup = (booing_id) => {
        setCanceledBooking(booing_id);
    }

    const cancelBooking = () => {
        setLoading(true);
        const url = `http://localhost:1337/api/bookings/${canceledBooking}`;
        axios.delete(url)
            .then(() => {
                fetchBookings();
                setCanceledBooking(false);
                setLoading(false);
            })
            .catch(() => {
                setCanceledBooking(false);
                setLoading(false);
            });
    }

    return (
        <>
            <Header/>
            <section className="w-full h-screen bg-black/95 pt-[100px] px-[150px] flex flex-col items-center justify-center">
                {!isAdmin &&
                    <FaCircleChevronLeft onClick={() => navigate("/settings")} className="absolute left-[80px] top-[150px] w-[40px] h-[40px] cursor-pointer text-primary"/>}
                <div className="w-[80%] flex flex-col">
                    {bookings.length > 0 ? (
                        records.map((booking, index) => {
                            return <Booking key={index} booking={booking} showPopup={showPopup} isAdmin={isAdmin}/>
                        })
                    ) : (
                        <span className="text-[18px] font-rubik text-white text-center mb-[50px]">Empty Bookings</span>
                    )}
                </div>
                <div className={records.length > 0 ? "flex items-center justify-around text-black bg-white p-[8px] rounded-[5px] select-none mt-[20px]" : "hidden"}>
                    <button onClick={previousPage} className={`py-[5px] ${currentPage === 1 ? 'btn-disabled' : 'btn'} px-[10px] mr-[10px]`}><FaChevronLeft/></button>
                    {pages.map((page, index) => {
                        return <span onClick={() => setPage(page)} className={`${page === currentPage ? 'text-zinc-900' : 'text-zinc-400'} py-[5px] px-[10px] font-bold font-consolas cursor-pointer`} key={index}>{page}</span>
                    })}
                    <button onClick={nextPage} className={`py-[5px] ${currentPage === numberOfPages ? 'btn-disabled' : 'btn'} px-[10px] ml-[10px]`}><FaChevronRight/></button>
                </div>
                {canceledBooking && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
                        <div className="bg-white rounded-[8px] py-[50px] px-[50px] flex flex-col items-center justify-center">
                            <span className="text-black text-[20px] font-bold">Cancel Reservation?</span>
                            <p className="text-[12px] mt-[10px]">No payment refund upon cancellation</p>
                            <div className="flex items-center mt-[30px]">
                                <button onClick={cancelBooking} className="cursor-pointer text-[13px] rounded-[5px] mr-[10px] text-white py-[5px] px-[15px] bg-green-500">Confirm</button>
                                <button onClick={() => setCanceledBooking(false)} className="cursor-pointer text-[13px] rounded-[5px] ml-[10px] text-white py-[5px] px-[15px] bg-red-500">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/95">
                    <div className="loader"></div>
                </div>
            )}
        </>
    )
}
export default Bookings;
