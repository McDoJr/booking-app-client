import {getDefaultDate} from "./calendar.js";

export const profileData = (id, username, firstname, lastname, email, phone, token, avatar, url, bookings = []) => {
    return {id, firstname, username, lastname, email, phone, bookings, token, avatar, url};
}

export const fetchProfile = (data) => {
    const {id, username, firstname, lastname, email, phone, token, avatar, url} = data;
    return profileData(id, username, firstname, lastname, email, phone, token, avatar, url);
}

export const registrationForm = () => {
    return {
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    };
}

export const bookingForm = () => {
    return {
        persons: "",
        tables: "",
        note: "",
        time: "8:00 AM",
        date: getDefaultDate()
    }
}

export const loginForm = () => {
    return {
        email: "",
        password: ""
    }
}

export const validate = (formData) => {
    return Object.values(formData).every(data => data !== "");
}

export const notNull = (object) => {
    if(object && typeof object === "object" && Object.keys(object).length > 0){
        return true;
    }
    if(typeof object === 'object' && Object.keys(object).length === 0) {
        return false;
    }
    return object;

}

export const setTitle = (pageTitle) => {
    document.title = `TRIOS - ${pageTitle}`;
}

export const timeList = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM"
]

const scrollTo = (ref) => {
    ref.current?.scrollIntoView({behavior: "smooth"});
}