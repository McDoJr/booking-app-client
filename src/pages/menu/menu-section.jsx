import {createContext, useState} from "react";
import MenuCard from "./menu-card.jsx";

const MenuSection = () => {

    const [popup, setPopup] = useState(null);

    const handleClick = (e, photo) => {
        setPopup(photo);
    }

    const cards = [
        {
            heading: "The Appertizers",
            items: [
                { name: "Salad", price: 50, photo: require("../../images/salad.jpg") },
                { name: "Croquette", price: 22, photo: require("../../images/croquette.jpg") },
                { name: "Sambosa", price: 37, photo: require("../../images/sambosa.jpg") },
                { name: "Canape", price: 41, photo: require("../../images/canape.jpg") },
                { name: "Ascpic Jelly", price: 19, photo: require("../../images/aspic_jelly.jpg") }
            ],
            color: "bg-primary",
            background: require("../../images/appertizer.jpg"),
            isInverted: false
        },
        {
            heading: "Main Course",
            items: [
                { name: "Sirloin Steak", price: 50, photo: require("../../images/sirloin_steak.jpg")  },
                { name: "Korean Spicy Soup", price: 22, photo: require("../../images/korean_soup.jpg")  },
                { name: "Salmon Pasta", price: 37, photo: require("../../images/salmon_pasta.jpg")  },
                { name: "Chicken Curry Special", price: 41, photo: require("../../images/chicken_curry.jpg")  },
                { name: "Dimsum", price: 19, photo: require("../../images/dimsum.jpg")  }
            ],
            color: "bg-black",
            background: require("../../images/main_course.jpg"),
            isInverted: true
        },
        {
            heading: "Good Desserts",
            items: [
                { name: "Panacotta Pancake", price: 50, photo: require("../../images/pancake.jpg")   },
                { name: "Ice Cream", price: 22, photo: require("../../images/ice_cream.jpg") },
                { name: "Brownies", price: 37, photo: require("../../images/brownies.jpg") },
                { name: "American Pie", price: 41, photo: require("../../images/american_pie.jpg") },
                { name: "Banoffie", price: 19, photo: require("../../images/banoffie.jpg") }
            ],
            color: "bg-primary",
            background: require("../../images/desserts.jpg"),
            isInverted: false
        },
        {
            heading: "Hot & Cold Drinks",
            items: [
                { name: "Avacado Milkshake", price: 50, photo: require("../../images/avocado_shake.jpg") },
                { name: "Sanger Coffee", price: 22, photo: require("../../images/sanger_coffee.jpg") },
                { name: "Green Tea", price: 37, photo: require("../../images/green_tea.jpg") },
                { name: "Lemon Tea", price: 41, photo: require("../../images/lemon_tea.jpg") },
                { name: "Chocolate Milk Anger", price: 19, photo: require("../../images/chocolate_milk.jpg") }
            ],
            color: "bg-black",
            background: require("../../images/drinks.jpg"),
            isInverted: true
        }
    ];

    const handleClose = (e) => {
        if(e.target.tagName !== 'IMG') {
            setPopup(null);
        }
    }

    return (
        <section className="w-full pt-[30px] flex flex-col items-center bg-black text-white relative">
            <h1 className="text-[50px] pb-[100px] font-heading font-[400] tracking-[0.2rem]">Menu</h1>
            {cards.map(({heading, items, color, background, isInverted}, index ) => {
                return (
                    <MenuContext.Provider key={index} value={{ heading, items, color, background, isInverted, handleClick }}>
                        <MenuCard/>
                    </MenuContext.Provider>
                )
            })}
            <div className={`${popup ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full z-[100] bg-black/80`} onClick={handleClose}>
                <span className="w-[80px] h-[80px] absolute top-[50px] right-0 text-[30px] font-[600] text-white cursor-pointer">&times;</span>
                <img className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] block max-w-[95%] max-h-[95%] border-[3px] border-solid border-white" src={popup} alt="Popop photo"/>
            </div>
        </section>
    )
}

export const MenuContext = createContext(null);

export default MenuSection;
