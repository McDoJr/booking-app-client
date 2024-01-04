import Header from "../../components/header.jsx";
import {FaChevronRight, FaCircleXmark, FaEye, FaEyeSlash, FaUserTie} from "react-icons/fa6";
import {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../App.jsx";
import {FaCheckCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {fetchProfile} from "../../utils/utils.js";

const Settings = () => {

    const navigate = useNavigate();
    const {profile, setProfile} = useContext(ProfileContext);
    const [formData, setFormData] = useState({});
    const [toggle, setToggle] = useState(true);
    const [successPopup, setSuccessPopup] = useState(false);
    const [failedPopup, setFailedPopup] = useState(false);
    const [currentEye, setCurrentEye] = useState(false);
    const [newEye, setNewEye] = useState(false);
    const [confirmEye, setConfirmEye] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({...JSON.parse(JSON.stringify(profile)),
            current_password: "",
            new_password: "",
            confirm_new_password: ""
        });
    }, [profile]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(toggle) {
            // Update new profile details
            const {id, firstname, lastname, phone} = formData;
            const url = `http://localhost:1337/api/users/${id}`;
            axios.put(url,{firstname, lastname, phone}
                )
                .then(res => {
                    const user = res.data;
                    setSuccessPopup(true);
                    setProfile(fetchProfile(user))
                })
                .catch(error => {
                    console.log(error);
                    setFailedPopup(true);
                });
            return;
        }
        // Password details
        const url = `http://localhost:1337/api/auth/change-password`;
        axios.post(
            url, {
                currentPassword: formData.current_password,
                password: formData.new_password,
                passwordConfirmation: formData.confirm_new_password
            },
            {
                headers: {
                    Authorization: `Bearer ${profile.token}`,
                },
            }
        ).then(res => {
            const {user, jwt} = res.data;
            const fetchedProfile = fetchProfile(user);
            setProfile({...fetchedProfile, token: jwt});
            setSuccessPopup(true);
        }).catch(() => {
            setFailedPopup(true);
        })
    }

    const handleImage = (e) => {
        setLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('files', image);
        formData.append('refId', profile.id);
        formData.append('ref', 'plugin::users-permissions.user');
        formData.append('field', 'avatar');
        const url = `http://localhost:1337/api/upload`;
        axios
            .post(url, formData)
            .then(res => {
                const avatar = res.data[0];
                const url = `http://localhost:1337${avatar.url}`;
                setProfile({...profile, avatar, url});
                setLoading(false);
                setSuccessPopup(true);
            }).catch(error => {
                console.log(error);
                setLoading(false);
                setFailedPopup(true);
            });
    }

    const handleToggle = () => setToggle(!toggle);

    return (
        <>
            <Header/>
            <section className="w-full h-screen pt-[100px] px-[100px] bg-black/95 flex justify-center items-center">
                <form className="h-[450px] p-[50px] bg-white text-black flex" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div onClick={handleToggle} className="inner-shadow flex w-[250px] rounded-[20px]">
                            {toggle ? (
                                <button type="button" className="w-[50%] mr-auto bg-primary text-white font-bold py-[10px] rounded-[18px] text-[12px]">Details</button>
                            ) : (
                                <button type="button" className="w-[50%] ml-auto bg-primary text-white font-bold py-[10px] rounded-[18px] text-[12px]">Password</button>
                            )}
                        </div>
                        {toggle ? (
                            <>
                                <label className="font-[800] px-[3px] mt-auto ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">First Name</label>
                                <input value={formData.firstname || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" type="text" name="firstname" onChange={handleChange}/>
                                <label className="font-[800] px-[3px] ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">Last Name</label>
                                <input value={formData.lastname || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" type="text" name="lastname" onChange={handleChange}/>
                                <label className="font-[800] px-[3px] ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">Phone Number</label>
                                <input value={formData.phone || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" type="number" name="phone" onChange={handleChange}/>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col relative mt-auto">
                                    <label className="font-[800] select-none px-[3px] ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">Current Password</label>
                                    <input value={formData.current_password || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" name="current_password" type={currentEye ? "text" : "password"} onChange={handleChange}/>
                                    <div onClick={() => setCurrentEye(!currentEye)} className="absolute right-[8px] top-[28px] text-zinc-600 cursor-pointer">
                                        {!currentEye ? <FaEyeSlash/> : <FaEye/>}
                                    </div>
                                </div>
                                <div className="flex flex-col relative">
                                    <label className="font-[800] select-none px-[3px] ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">New Password</label>
                                    <input value={formData.new_password || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" name="new_password" type={newEye ? "text" : "password"} onChange={handleChange}/>
                                    <div onClick={() => setNewEye(!newEye)} className="absolute right-[8px] top-[28px] text-zinc-600 cursor-pointer">
                                        {!newEye ? <FaEyeSlash/> : <FaEye/>}
                                    </div>
                                </div>
                                <div className="flex flex-col relative">
                                    <label className="font-[800] select-none px-[3px] ml-[5px] bg-white translate-y-[8px] self-start text-[12px] text-zinc-700 font-consolas">Confirm New Password</label>
                                    <input value={formData.confirm_new_password || ''} className="border border-zinc-400 w-[250px] mb-[8px] font-bold border-solid outline-0 text-zinc-700 text-[16px] font-consolas p-[5px]" name="confirm_new_password" type={confirmEye ? "text" : "password"} onChange={handleChange}/>
                                    <div onClick={() => setConfirmEye(!confirmEye)} className="absolute right-[8px] top-[28px] text-zinc-600 cursor-pointer">
                                        {!confirmEye ? <FaEyeSlash/> : <FaEye/>}
                                    </div>
                                </div>
                            </>
                        )}
                        <button type="submit" className="btn text-[15px] font-bold py-[10px] px-[20px] mt-auto">Save</button>
                    </div>
                    <div className="ml-[50px] pl-[50px] w-[300px] flex flex-col justify-end items-center">
                        {profile.url ? (
                            <div className="w-[150px] h-[150px] rounded-[50%] border-[5px] shadow-sm overflow-hidden"><img src={profile.url} className="object-cover" alt="profile.png"/></div>
                        ) : (<FaUserTie className="w-[120px] h-[120px] text-zinc-700"/>)}
                        <div className="btn text-[15px] font-bold py-[10px] px-[20px] w-full mt-[30px] text-center relative overflow-hidden"><input onChange={handleImage} type="file" name="image" className="w-full h-[300px] opacity-0 cursor-pointer absolute top-[-30px] left-0 border"/>Change</div>
                        <button onClick={() => navigate("/settings/bookings")} type="button" className="btn-secondary text-[15px] font-bold py-[10px] px-[20px] w-full flex justify-between items-center mt-[50px]">Bookings<FaChevronRight/></button>
                    </div>
                </form>
                <div onClick={() => {
                    setSuccessPopup(false);
                    setToggle(true);
                }} className={successPopup ? "absolute top-0 left-0 w-full h-screen bg-black/90 z-10 flex justify-center items-center" : "hidden"}>
                    <div className="py-[80px] px-[120px] rounded-[20px] flex flex-col items-center bg-white">
                        <FaCheckCircle className="w-[50px] h-[50px] text-green-500"/>
                        <span className="text-green-500 text-[25px] font-bold mt-[30px]">Success!</span>
                    </div>
                </div>
                <div onClick={() => {
                    setFailedPopup(false);
                }} className={failedPopup ? "absolute top-0 left-0 w-full h-screen bg-black/90 z-10 flex justify-center items-center" : "hidden"}>
                    <div className="py-[80px] px-[120px] rounded-[20px] flex flex-col items-center bg-white">
                        <FaCircleXmark className="w-[50px] h-[50px] text-red-600"/>
                        <span className="text-red-600 text-[25px] font-bold mt-[30px]">Failed!</span>
                    </div>
                </div>
            </section>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/95">
                    <div className="loader"></div>
                </div>
            )}
        </>
    )
}
export default Settings;
