const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getMonth = (month) => months[month];

export const getDays = (date, currYear, currMonth) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    const list = [];

    for(let i = firstDayofMonth; i > 0; i--){
        list.push({day: (lastDateofLastMonth - i + 1), name: "inactive"});
    }
    for(let i = 1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "normal";
        list.push({day: i, name: isToday});
    }
    for(let i = lastDayofMonth; i < 6; i++){
        list.push({day: (i - lastDayofMonth + 1), name: "inactive"});
    }
    return list;
}

export const getCalendar = (date) => {
    const month = date.getMonth(), year = date.getFullYear();
    const days = getDays(date, year, month);
    return {month, monthName: getMonth(month), year, days};
}

export const getDefaultDate = () => {
    const date = new Date();
    return {day: String(date.getDate()), month: String(date.getMonth()), year: String(date.getFullYear())};
}

export const isCurrentDate = (formDate) => {
    const {day, month, year} = formDate;
    const date = new Date();
    const currDay = date.getDate(), currMonth = date.getMonth(), currYear = date.getFullYear();
    return String(currDay) === day;
}