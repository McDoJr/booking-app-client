import Header from "../../components/header.jsx";
import FoodSection from "../../components/food-section.jsx";
import MenuSection from "./menu-section.jsx";
import Footer from "../../components/footer.jsx";
import ScrollTop from "../../components/scroll-top.jsx";
import ReserveSection from "../../components/reserve-section.jsx";

const MenuPage = () => {
    return (
        <>
            <Header/>
            <div className="w-full h-[250px] bg-black"></div>
            <FoodSection/>
            <MenuSection/>
            <ReserveSection/>
            <Footer/>
            <ScrollTop/>
        </>
    )
}
export default MenuPage;
