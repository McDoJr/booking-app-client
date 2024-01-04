import Header from "../../components/header.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {loginForm, validate} from "../../utils/utils.js";
import {ProfileContext} from "../../App.jsx";
import {FaCheckCircle} from "react-icons/fa";
import {FaCircleXmark} from "react-icons/fa6";
import axios from "axios";

const Login = () => {

    const {handleLogin} = useContext(ProfileContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(loginForm());
    const [successPopup, setSuccessPopup] = useState(false);
    const [failedPopup, setFailedPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validate(formData)){
            alert("Please fill all fields!");
            return;
        }
        setLoading(true);
        const url = 'http://localhost:1337/api/auth/local';
        const {email, password} = formData;
        axios.post(url, {
            identifier: email,
            password
        }).then(res => {
            const {user, jwt} = res.data;
            setSuccessPopup(true);
            handleLogin({id: user.id, token: jwt, setLoading});
        }).catch((error) => {
            setFailedPopup(true);
            setLoading(false);
            console.log(error);
        })
    }

    return (
        <>
            <Header/>
            <section className="hero w-full h-screen bg-zinc-500">
                <form className="flex flex-col p-[30px] bg-zinc-800" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <button type="button" onClick={() => navigate("/register")} className="text-[14px] text-white font-bold py-[10px] px-[60px] bg-zinc-700">Sign Up</button>
                        <button type="button" className="text-[14px] text-white font-bold py-[10px] px-[60px] bg-primary">Sign In</button>
                    </div>
                    <h1 className="text-center text-white text-[20px] font-semibold my-[10px]">Login</h1>
                    <input value={formData.email} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="email" name="email" placeholder="Email Address*"/>
                    <input value={formData.password} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="password" name="password" placeholder="Password*"/>
                    <button type="submit" className="btn py-[10px] mt-[10px]">SUBMIT</button>
                </form>
                <div onClick={() => {
                    setSuccessPopup(false);
                    navigate("/home");
                }} className={successPopup ? "absolute top-0 left-0 w-full h-screen bg-black/90 z-10 flex justify-center items-center" : "hidden"}>
                    <div className="py-[80px] px-[120px] rounded-[20px] flex flex-col items-center bg-white">
                        <FaCheckCircle className="w-[50px] h-[50px] text-green-500"/>
                        <span className="text-green-500 text-[25px] font-bold mt-[30px]">Success!</span>
                    </div>
                </div>
                <div onClick={() => {
                    setFailedPopup(false);
                    setFormData(loginForm());
                }} className={failedPopup ? "absolute top-0 left-0 w-full h-screen bg-black/90 z-10 flex justify-center items-center" : "hidden"}>
                    <div className="py-[80px] px-[120px] rounded-[20px] flex flex-col items-center bg-white">
                        <FaCircleXmark className="w-[50px] h-[50px] text-red-600"/>
                        <span className="text-red-600 text-[25px] font-bold mt-[30px]">Failed!</span>
                    </div>
                </div>
            </section>
            {loading && (
                <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/90">
                    <div className="loader"></div>
                </div>
            )}
        </>
    )
}
export default Login;
