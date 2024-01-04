import Header from "../../components/header.jsx";
import HeroSection from "./hero-section.jsx";
import AboutSection from "./about-section.jsx";
import ScrollTop from "../../components/scroll-top.jsx";
import FoodSection from "../../components/food-section.jsx";
import ReserveSection from "../../components/reserve-section.jsx";
import Footer from "../../components/footer.jsx";
import ProcessSection from "../../components/process-section.jsx";
import {useEffect} from "react";
import {setTitle} from "../../utils/utils.js";

const HomePage = () => {

    useEffect(() => {
        setTitle("Home");
    }, []);

    return (
        <>
            <Header/>
            <HeroSection/>
            <h1 className="bg-black text-white text-[40px] sm:text-[55px] text-center font-heading pt-12 select-none">Trio's Restaurant</h1>
            <AboutSection/>
            <FoodSection/>
            <ReserveSection/>
            <ProcessSection/>
            <Footer/>
            <ScrollTop/>
        </>
    )
}
export default HomePage;
