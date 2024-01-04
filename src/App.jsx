import HomePage from "./pages/home/home-page.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/auth/login.jsx";
import {createContext, useEffect, useState} from "react";
import Settings from "./pages/auth/settings.jsx";
import {fetchAllBookings, loadProfile, reloadBookings} from "./utils/data.js";
import ReservationPage from "./pages/reservation/reservation-page.jsx";
import Bookings from "./pages/auth/bookings.jsx";
import MenuPage from "./pages/menu/menu-page.jsx";
import {notNull} from "./utils/utils.js";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";

const App = () => {
    const cookies = new Cookies();

    const [profile, setProfile] = useState({});
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token = cookies.get("jwt_token");
        if(token) {
            setLoading(true);
            const {id} = jwtDecode(token);
            console.log(id);
            if(id === "admin"){
                fetchAllBookings({setBookings});
                return;
            }
            loadProfile({setProfile, id, token, setLoading});
        }
    }, []);

    if(loading){
        return (
            <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/95">
                <div className="loader"></div>
            </div>
        )
    }

    const handleLogin = (object) => {
        const {id, token, setLoading} = object;
        const decoded = jwtDecode(token);
        loadProfile({setProfile, id, token, setLoading});
        cookies.set('jwt_token', token, {
            expires: new Date(decoded.exp * 1000)
        });
    }

    const fetchBookings = () => {
        reloadBookings({ profile, setProfile });
    }

    const handleUpdate = (profileData) => {
        setProfile(profileData);
    }

    const handleLogout = () => {
        cookies.remove("jwt_token");
        setProfile({});
        setBookings([]);
    }

    const isLoggedIn = notNull(profile) || notNull(bookings);

    return (
        <Routes>
            <Route index element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, isLoggedIn }}>
                    <HomePage/>
                </ProfileContext.Provider>
            }/>
            <Route path="/home" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, isLoggedIn }}>
                    <HomePage/>
                </ProfileContext.Provider>
            }/>
            <Route path="/menu" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, isLoggedIn }}>
                    <MenuPage/>
                </ProfileContext.Provider>
            }/>
            <Route path="/reservation" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, fetchBookings , bookings, isLoggedIn, setProfile}}>
                    <ReservationPage/>
                </ProfileContext.Provider>
            }/>
            <Route path="/register" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, isLoggedIn }}>
                    <Register/>
                </ProfileContext.Provider>
            }/>
            <Route path="/login" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, profile, isLoggedIn }}>
                    <Login/>
                </ProfileContext.Provider>
            }/>

            <Route path="/settings" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, handleUpdate, profile, isLoggedIn, setProfile }}>
                    <Settings/>
                </ProfileContext.Provider>
            }/>
            <Route path="/settings/bookings" element={
                <ProfileContext.Provider value={{ handleLogin, handleLogout, handleUpdate, profile, fetchBookings, allBookings: bookings, isLoggedIn }}>
                    <Bookings/>
                </ProfileContext.Provider>
            }/>
        </Routes>
    )
}

export const ProfileContext = createContext(null);

export default App
