import Header from "../../components/header.jsx";
import {useState} from "react";
import {registrationForm, validate} from "../../utils/utils.js";
import {FaCheckCircle} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(registrationForm());
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validate(formData)) {
            alert("Fill all fields!");
            return;
        }
        setLoading(true);
        const url = 'http://localhost:1337/api/auth/local/register';
        axios.post(url, {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }).then(() => {
            setPopup(true);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    return (
        <>
            <Header/>
            <section className="hero w-full h-screen bg-zinc-500">
                <form className="flex flex-col p-[30px] bg-zinc-800" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <button type="button" className="text-[14px] text-white font-bold py-[10px] px-[60px] bg-primary">Sign Up</button>
                        <button type="button" onClick={() => navigate("/login")} className="text-[14px] text-white font-bold py-[10px] px-[60px] bg-zinc-700">Sign In</button>
                    </div>
                    <h1 className="text-center text-white text-[20px] font-semibold my-[10px]">Register</h1>
                    <input value={formData.username} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="text" name="username" placeholder="Username*"/>
                    <input value={formData.email} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="email" name="email" placeholder="Email Address*"/>
                    <input value={formData.password} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="password" name="password" placeholder="Password*"/>
                    <input value={formData.confirm_password} onChange={handleChange} className="text-[13px] p-[6px] my-[8px] border border-solid border-zinc-400 bg-zinc-800 outline-0 text-white" type="password" name="confirm_password" placeholder="Confirm Password*"/>
                    <button type="submit" className="btn py-[10px] mt-[10px]">SUBMIT</button>
                </form>
                <div onClick={() => {
                    setPopup(false);
                    navigate("/login");
                }} className={popup ? "absolute top-0 left-0 w-full h-screen bg-black/90 z-10 flex justify-center items-center" : "hidden"}>
                    <div className="py-[80px] px-[120px] rounded-[20px] flex flex-col items-center bg-white">
                        <FaCheckCircle className="w-[50px] h-[50px] text-green-500"/>
                        <span className="text-green-500 text-[25px] font-bold mt-[30px]">Success!</span>
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
export default Register;
