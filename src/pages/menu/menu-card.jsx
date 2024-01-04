import {useContext} from "react";
import {MenuContext} from "./menu-section.jsx";

const MenuCard = () => {

    const {heading, items, background, color, isInverted, handleClick} = useContext(MenuContext);

    return (
        <div className={`w-full h-screen py-[80px] px-[150px] ${color} flex ${isInverted ? 'justify-start' : 'justify-end'} relative`}>
            <div className="w-[800px] h-full bg-no-repeat bg-cover" style={{backgroundImage: `url(${background})`}}></div>
            <div className={`h-[450px] p-[30px] absolute ${isInverted ? 'right-[150px]' : 'left-[150px]'} bottom-0 bg-white flex flex-col justify-around`}>
                <h2 className="font-heading text-[30px] font-[400] text-primary">{heading}</h2>
                {items.map(({name, price, photo}, index) => {
                    return (
                        <div className="w-[300px] flex justify-between items-center" key={index}>
                            <h3 onClick={(e) => handleClick(e, photo)} className="text-black text-[16px] font-[650] hover:text-primary cursor-pointer">{name}</h3>
                            <span className="text-primary text-[16px] font-[600]">{`$${price}`}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MenuCard;
