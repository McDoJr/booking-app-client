import {
    FaBars,
    FaEnvelope,
} from "react-icons/fa";
import {useContext, useEffect, useRef, useState} from "react";
import {
    FaCircleUser,
    FaSquareFacebook,
    FaSquareInstagram,
    FaSquareXTwitter,
    FaSquareYoutube,
    FaXmark
} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {ProfileContext} from "../App.jsx";

const Header = () => {

    const {handleLogout, isLoggedIn, profile} = useContext(ProfileContext);
    const ref = useRef(null);
    const dropDownRef = useRef(null);
    const navigate = useNavigate();
    const [nav, setNav] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown(!dropdown);

    useEffect(() => {
        const handleListener = (e) => {
            if(ref){
                if(!ref.current.contains(e.target)){
                    setNav(false);
                }
            }
        }

        const handleDropdownListener = (e) => {
            if(dropDownRef.current !== null){
                if(!dropDownRef.current.contains(e.target)){
                    setDropdown(false);
                }
            }
        }

        document.addEventListener('mousedown', handleListener);
        document.addEventListener('mousedown', handleDropdownListener);

        return () => {
            document.removeEventListener('mousedown', handleListener);
            document.removeEventListener('mousedown', handleDropdownListener);
        }
    }, []);

    const handleSettings = () => {
        navigate(isLoggedIn ? "/settings" : '/settings/bookings');
    }

    const handleNavToggle = () => setNav(!nav);

    return (
        <div className="w-full font-body absolute left-0 top-0 z-50">
            <div className="w-full py-[10px] px-[50px] bg-primary flex justify-between items-center text-white">
                <div className="flex items-center">
                    <FaEnvelope className="w-[16px] mr-1"/>
                    <span className="text-sm">triosrestaurant@gmail.com</span>
                </div>
                <div className="flex">
                    <FaSquareFacebook className=""/>
                    <FaSquareXTwitter className="ml-3"/>
                    <FaSquareInstagram className="ml-3"/>
                    <FaSquareYoutube className="ml-3"/>
                </div>
            </div>
            <div className="w-full py-[10px] px-[70px] md:px-[80px] lg:px-[100px] bg-black/50 text-white flex items-center shadow-md select-none">
                <h1 onClick={() => navigate("/")} className="text-[30px] lg:text-[40px] font-heading font-bold tracking-[.1rem] cursor-pointer">~TRIOS~</h1>
                <ul className="hidden md:flex ml-auto list-none">

                    <li><Link to="/home" className="nav mx-2 lg:mx-5 lg:text-[16px] text-[14px] py-3">Home</Link></li>
                    <li><Link to="/menu" className="nav mx-2 lg:mx-5 lg:text-[16px] text-[14px] py-3">Menu</Link></li>
                    <li><Link to="/reservation" className="nav mx-2 lg:mx-5 lg:text-[16px] text-[14px] py-3">Reservation</Link></li>
                    <li><a className="nav mx-2 lg:mx-5 lg:text-[16px] text-[14px] py-3">Contact</a></li>
                </ul>
                <div className="hidden md:flex ml-10 lg:ml-20">
                    {isLoggedIn ?
                        (
                            <div ref={dropDownRef} className="relative">
                                {profile && profile.avatar ? (
                                    <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden shadow-sm border border-zinc-700 border-solid cursor-pointer" onClick={toggleDropdown}>
                                        <img src={profile.url} alt="profile.png" className="object-cover"/>
                                    </div>
                                ) : (
                                    <FaCircleUser className="w-[30px] h-[30px] text-white cursor-pointer" onClick={toggleDropdown}/>
                                )}
                                <div className={dropdown ? "flex flex-col absolute left-[-30px] top-[40px] bg-white text-black p-[10px] rounded-[10px] text-[14px] shadow-zinc-600 shadow-md" : "hidden"}>
                                    <span onClick={() => {
                                        toggleDropdown();
                                        handleSettings();
                                    }} className="font-bold py-[5px] px-[30px] hover:text-zinc-500 border-transparent border-b hover:border-solid hover:border-zinc-400 cursor-pointer">Settings</span>
                                    <span onClick={() => {
                                        handleLogout();
                                        toggleDropdown();
                                        navigate("/");
                                    }} className="font-bold py-[5px] px-[30px] hover:text-zinc-500 border-transparent border-b hover:border-solid hover:border-zinc-400 cursor-pointer">Logout</span>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate("/login")} className="border-none text-[14px] lg:text-[16px] bg-primary py-2 px-5">Sign In</button>
                        )
                    }
                </div>
                <div ref={ref} className="block ml-auto md:hidden" onClick={handleNavToggle}>
                    {nav ? <FaXmark className="w-[20px] h-[20px]"/> : <FaBars className="w-[20px] h-[20px]"/>}
                </div>
                <div ref={ref} className={nav ? "absolute w-full h-screen left-0 top-[105px] p-[50px] bg-black/90 z-10 flex flex-col items-center" : "hidden"}>
                    <ul className="font-bold flex flex-col items-center text-white">
                        <li className="my-2"><a className="nav py-2 px-9">Home</a></li>
                        <li className="my-2"><a className="nav py-2 px-9">Menu</a></li>
                        <li className="my-2"><a className="nav py-2 px-9">Reservation</a></li>
                        <li className="my-2"><a className="nav py-2 px-9">Contact</a></li>
                    </ul>
                    <button className="border-none text-[14px] bg-primary py-2 px-10 mt-[20px]">Sign In</button>
                </div>
            </div>
        </div>
    )
}
export default Header
