import axios from "axios";
import {fetchProfile, registrationForm} from "./utils.js";

export const updatePassword = (object) => {
    const {setFailedPopup, setSuccessPopup, profile, formData, handleUpdate} = object;
    axios.post("http://localhost:8080/profiles/update/password", formData)
        .then(res => {
            if(!res.data.status) {
                setFailedPopup(true);
                return;
            }
            const {new_password} = formData;
            handleUpdate({...profile, password: new_password});
            setSuccessPopup(true);
        })
        .catch(error => console.log(error));
}

export const updateDetails = (object) => {
    const {setFailedPopup, setSuccessPopup, profile, formData, handleUpdate} = object;
    axios.post("http://localhost:8080/profiles/update/details", formData)
        .then(res => {
            if(!res.data.status){
                setFailedPopup(true);
                return;
            }
            const {firstname, lastname, email, phone} = formData;
            handleUpdate({...profile, firstname, lastname, email, phone});
            setSuccessPopup(true);
        })
        .catch(error => console.log(error));
}

export const registerProfile = (object) => {
    const {setPopup, setFormData, formData} = object;
    axios.post('http://localhost:8080/profiles/register', formData)
        .then(res => {
            if(!res.data.status) {
                console.log(res.data.extra);
                alert("Email already exist!");
                setFormData(registrationForm());
                return;
            }
            setPopup(true);
        })
        .catch(err => {
            console.log(err);
        });
}

export const loginProfile = (object) => {
    const {setFailedPopup, setSuccessPopup, formData, handleLogin} = object;
    axios.post("http://localhost:8080/profiles/login", formData)
        .then(res => {
            const {status, profile} = res.data;
            if(status){
                setSuccessPopup(true);
                getBookings({profile: fetchProfile(profile), handleLogin});
            }else{
                setFailedPopup(true);
            }
        })
        .catch(error => console.log(error));
}

export const getProfile = (object) => {
    const {id} = object;
    const url = `http://localhost:1337/api/users/${id}`;
    axios.get(url)
        .then(res => {
            if(res.data.status){
                const profile = fetchProfile(res.data.profile);
                getBookings({...object, profile});
            }
        })
        .catch(error => console.log(error));
}

export const loadProfile = (object) => {
    const {setProfile, id, token, setLoading} = object;
    const url = `http://localhost:1337/api/users/${id}?populate=*`;
    axios.get(url).then(res => {
        const user = res.data;
        const url = user.avatar ? `http://localhost:1337${user.avatar.url}` : null;
        const fetchedProfile = fetchProfile({...user, token, url});
        setProfile(fetchedProfile);
        reloadBookings({ profile: fetchedProfile, setProfile });
        setLoading(false);
    }).catch(error => {
        console.log(error);
        setLoading(false);
    });
}

export const getBookings = (object) => {
    const {profile, setProfile} = object;
    const url = `http://localhost:1337/api/bookings?filters[profile_id][$eq]=${profile.id}&pagination[page]=1&pagination[pageSize]=1000`;
    axios.get(url)
        .then(res => {
            const bookings = res.data.data.reduce((list, data) => {
                const {profile_id, persons, tables, date, time, note} = data.attributes;
                const booking = {profile_id, persons, tables, date, time, note};
                list.push({...booking, id: data.id});
                return list;
            }, []);
            setProfile({...profile, bookings});
        })
        .catch(error => console.log(error));
}

export const reloadBookings = (object) => {
    getBookings(object);
}

export const createBooking = (object) => {
    const {form, showPopup} = object;
    axios.post("http://localhost:8080/bookings/create", form)
        .then(res => {
            if(!res.data.status){
                showPopup(false);
                return;
            }
            showPopup(true);
        })
        .catch(error => console.log(error));
}

export const fetchAllBookings = (object) => {
    const { setBookings } = object;
    axios.post("http://localhost:8080/bookings/get-all")
        .then(res => {
            if(res.data.status){
                setBookings(res.data.bookings);
                console.log('Bookings has been fetched!');
            }
        })
        .catch(error => console.log(error));
}

export const ADMIN = 'triosrestaurant@gmail.com';
export const PASSWORD = 'admin123';