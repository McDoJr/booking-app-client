import {FaCalendar, FaClock, FaHashtag, FaTable, FaUser, FaUsers} from "react-icons/fa6";

const Booking = ({ booking, showPopup, isAdmin }) => {


    const {id, profile_id, persons, tables, note, time, date} = booking;

    return (
        <div className="flex justify-around p-[10px] mb-[20px] rounded-[5px] bg-gradient-to-r from-primary from-30% via-primary-light via-50% to-white relative shadow-md select-none">
            <span title="Booking ID" className={`w-[calc(100%/5-50px)] title text-[13px] pl-[30px] flex items-center`}>
                <FaHashtag className="mr-[10px]"/>
                {id}
            </span>
            {isAdmin && <span title="User ID" className={`w-[calc(100%/5-50px)] text-[13px] pl-[30px] flex items-center`}>
                <FaUser className="mr-[5px]"/><FaHashtag className="mr-[10px]"/>
                {profile_id}
            </span>}
            <span title="Persons" className={`w-[calc(100%/5-50px)] text-[13px] pl-[30px] flex items-center`}>
                <FaUsers className="mr-[10px]"/>{persons}</span>
            <span title="Tables" className={`w-[calc(100%/5-50px)] text-[13px] pl-[30px] flex items-center`}>
                <FaTable className="mr-[10px]"/>{tables}</span>
            <span title="Date" className={`w-[calc(100%/5)] text-[13px] pl-[30px] flex items-center`}>
                <FaCalendar className="mr-[10px]"/>
                {date}
            </span>
            <span title="Time" className={`w-[calc(100%/5)] text-[13px] pl-[30px] flex items-center`}>
                <FaClock className="mr-[10px]"/>
                {time}
            </span>
            <button onClick={() => showPopup(id)} className="absolute right-[-40px] top-0 translate-y-[10%] rounded-[5px] shadow-md py-[5px] px-[10px] text-white text-[12px] btn">Cancel</button>
        </div>
    )
}
export default Booking;
