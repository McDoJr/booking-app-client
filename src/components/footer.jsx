import {useEffect, useState} from "react";
import {
    FaCopyright,
    FaLocationDot,
    FaPhone,
    FaSquareFacebook,
    FaSquareInstagram,
    FaSquareXTwitter,
    FaSquareYoutube
} from "react-icons/fa6";
import {FaEnvelope} from "react-icons/fa";

const Footer = () => {

    const [profiles, setProfiles] = useState([]);


    return (
        <section className="w-full h-[70vh] bg-black text-white pt-[100px] px-[150px] pb-[50px] flex flex-col">
            <div className="w-full h-full px-[50px] border-t-[3px] border-solid border-primary flex justify-around">
                <div className="w-[30%] pt-[50px] border-b border-solid border-white flex flex-col justify-around items-start">
                    <h1 className="font-heading text-[30px]">~TRIO'S~</h1>
                    <div className="flex">
                        <FaSquareFacebook className="w-[15px] h-[15px] mr-[20px]"/>
                        <FaSquareXTwitter className="w-[15px] h-[15px] mr-[20px]"/>
                        <FaSquareInstagram className="w-[15px] h-[15px] mr-[20px]"/>
                        <FaSquareYoutube className="w-[15px] h-[15px] mr-[20px]"/>
                    </div>
                </div>
                <div className="h-full pt-[80px] flex flex-col justify-start select-none">
                    <h2 className="mb-[10px] py-[10px] text-[16px] border-b-[2px] border-solid border-primary">Navigation</h2>
                    <span className="text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer">Home</span>
                    <span className="text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer">Menu</span>
                    <span className="text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer">Reservation</span>
                    <span className="text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer">Contact</span>
                </div>
                <div className="h-full pt-[80px] flex flex-col justify-start items-start">
                    <h2 className="mb-[10px] py-[10px] text-[16px] border-b-[2px] border-solid border-primary">Find Us</h2>
                    <span className="flex items-center text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer"><FaLocationDot className="w-[12px] h-[12px] mr-[8px]"/>Narra Road, Butuan City</span>
                    <span className="flex items-center text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer"><FaPhone className="w-[12px] h-[12px] mr-[8px]"/>+63 86800964</span>
                    <span className="flex items-center text-[12px] transition-all delay-75 ease-in my-[5px] hover:text-primary hover:cursor-pointer"><FaEnvelope className="w-[12px] h-[12px] mr-[8px]"/>triosrestaurant@gmail.com</span>
                </div>
            </div>
            <span className="flex items-center text-[12px] mt-[20px] ml-[117px]"><FaCopyright className="mr-[10px]"/>Copyright Trio’s 2022, All right reserved.</span>
        </section>
    )
}
export default Footer;
