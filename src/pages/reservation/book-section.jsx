import Calendar from "../../components/calendar.jsx";
import {useContext, useState} from "react";
import {bookingForm, validate} from "../../utils/utils.js";
import {ProfileContext} from "../../App.jsx";
import SuccessPopup from "../../components/success-popup.jsx";
import FailedPopup from "../../components/failed-popup.jsx";
import axios from "axios";

const BookSection = () => {

    const {profile, fetchBookings} = useContext(ProfileContext);
    const [formData, setFormData] = useState(bookingForm());
    const [popup, setPopup] = useState({success: true, status: false});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const closePopup = () => {
        setPopup({...popup, status: false});
    }

    const showPopup = (success) => {
        setPopup({success, status: true});
        setTimeout(closePopup, 1500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validate(formData)){
            showPopup(false);
            return;
        }
        setLoading(true);
        const {day, month, year} = formData.date;
        const date = `${month}-${day}-${year}`;
        const form = {...formData, profile_id: profile.id, date};
        const url = `http://localhost:1337/api/bookings`;
        axios.post(url, {data: form})
            .then((res) => {
                showPopup(true);
                fetchBookings();
                setLoading(false);
                console.log(res);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
        setFormData(bookingForm());
    }

    return (
        <>
            <section className="w-full bg-black flex flex-col items-center px-[150px] pb-[100px] relative pt-[150px]">
                <h1 className="text-white font-heading my-[50px] text-[50px] font-[400]">Book Table Now</h1>
                <div className="w-full flex">
                    <form onSubmit={handleSubmit} className="w-[50%] pr-[30px] py-[50px] flex justify-between items-center flex-wrap">
                        <div className="w-[calc(50%-10px)] flex flex-col">
                            <label className="text-white text-[16px] font-[400] mb-[10px]">Number of Persons</label>
                            <input onChange={handleChange} className="w-full border border-solid border-primary text-[14px] p-[8px] outline-0 text-black rounded-[5px]" value={formData.persons || ''} name="persons" type="number"/>
                        </div>
                        <div className="w-[calc(50%-10px)] flex flex-col">
                            <label className="text-white text-[16px] font-[400] mb-[10px]">Number of Tables</label>
                            <input onChange={handleChange} className="w-full border border-solid border-primary text-[14px] p-[8px] outline-0 text-black rounded-[5px]" value={formData.tables || ''} name="tables" type="number"/>
                        </div>
                        <div className="w-full mt-[20px] flex flex-col">
                            <label className="text-white text-[16px] font-[400] mb-[10px]">Add Note</label>
                            <textarea onChange={handleChange} className="w-full text-[14px] outline-0 p-[8px] border border-solid border-primary min-h-[150px] max-h-[150px]" value={formData.note || ''} name="note"/>
                        </div>
                        <button type="submit" className="btn py-[10px] px-[60px] mt-[25px]">SUBMIT</button>
                    </form>
                    <Calendar formData={formData} setFormData={setFormData}/>
                </div>
                {popup.status && (popup.success ? <SuccessPopup message="Booking Success" closePopup={closePopup}/> : <FailedPopup message="Booking Failed" closePopup={closePopup}/>)}
            </section>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/95">
                    <div className="loader"></div>
                </div>
            )}
        </>
    )
}
export default BookSection;
