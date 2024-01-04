import {useEffect, useRef, useState} from "react";
import {getCalendar, getDays, getDefaultDate, getMonth, weeks} from "../utils/calendar.js";
import {FaChevronDown, FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {timeList} from "../utils/utils.js";

const Calendar = ({formData, setFormData}) => {

    let date = new Date();
    const ref = useRef(null);
    const [calendar, setCalendar] = useState(getCalendar(date));
    const [calendarData, setCalendarData] = useState(getDefaultDate());
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown(!dropdown);

    useEffect(() => {
        const handleDropdown = (e) => {
            if(!ref.current.contains(e.target)){
                setDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleDropdown);

        return () => {
            document.removeEventListener('mousedown', handleDropdown);
        }
    }, []);

    const handleTime = (time) => {
        setFormData({...formData, time});
    }

    const handleDate = (amount) => {
        let {month, year} = calendar;
        date = new Date(year, month + amount, new Date().getDate());
        month = date.getMonth();
        year = date.getFullYear();
        setCalendar({month, monthName: getMonth(month), year, days: getDays(date, year, month)});
        setCalendarData({...calendarData, month: String(month), year: String(year)})
    }

    const handleDayChange = (day) => {
        const date = {...calendarData, day: String(day)};
        setCalendarData(date);
        setFormData({...formData, date});
    }

    return (
        <div className="w-[50%] p-[30px] bg-primary text-white flex flex-col items-center rounded-[15px] select-none">
            <div className="flex items-center">
                <FaChevronLeft className="cursor-pointer w-[25px] h-[25px]" onClick={() => handleDate(-1)}/>
                <h3 className="mx-[30px] font-heading text-[30px]">{`${calendar.monthName} ${calendar.year}`}</h3>
                <FaChevronRight className="cursor-pointer w-[25px] h-[25px]" onClick={() => handleDate(1)}/>
            </div>
            <div className="w-full flex justify-between mt-[50px] mb-[30px]">
                {weeks.map((week, index) => <h5 className="w-[calc((100%/7)-8px)] text-[20px] font-[500] text-center" key={index}>{week}</h5>)}
            </div>
            <div className="w-full flex justify-between flex-wrap">
                {calendar.days.map(({day, name}, index) => {
                    if (name !== 'inactive') {
                        name = (String(day) === calendarData.day && calendarData.month === String(calendar.month)) ? 'active' : 'normal';
                    }
                    return (
                        <div className="w-[calc((100%/7)-8px)] flex justify-center items-center" key={index}>
                            <span onClick={() => handleDayChange(day)} className={`${name} text-center leading-[45px] w-[45px] h-[45px] rounded-[50%] relative cursor-pointer`} key={index}>{day}</span>
                        </div>
                    )
                })}
            </div>
            <div className="w-full mt-[30px] flex justify-around items-center">
                <h1 className="font-heading text-[25px]">Select Time</h1>
                <div ref={ref} onClick={toggleDropdown} className="border border-solid border-white w-[250px] py-[8px] px-[20px] flex justify-between items-center relative cursor-pointer">
                    <span>{formData.time}</span>
                    <FaChevronDown/>
                    <ul className={dropdown ? "w-full h-[200px] overflow-y-scroll bg-white absolute top-[41px] left-0" : "hidden"}>
                        {timeList.map((time, index) => {
                            return <li onClick={() => handleTime(time)} className="text-black py-[5px] px-[20px] cursor-pointer hover:bg-primary hover:text-white" key={index}>{time}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Calendar;
