import FoodCard from "./food-card.jsx";

const FoodSection = () => {

    const list = [
        { name: "Coffe Arabica", price: 20, photo: require("../assets/coffee.jpg") },
        { name: "Spaghetti Ascila", price: 23, photo: require("../assets/spaghetti.jpg") },
        { name: "Pizza Sosis", price: 26, photo: require("../assets/pizza.jpg") },
        { name: "Fried Chicken", price: 28, photo: require("../assets/chickenjoy.jpg") },
    ];

    return (
        <section className="w-full bg-black pb-[50px] px-[50px] md:px-[100px] lg:px-[150px] flex flex-col justify-center items-center text-white select-none">
            <h1 className="mb-[50px] font-heading text-[35px] sm:text-[40px] lg:text-[50px] font-[400]">Today's Special Menu</h1>
            <div className="w-full flex flex-wrap justify-around lg:justify-between relative">
                {
                    list.map(({name, price, photo}, index) => <FoodCard name={name} price={price} photo={photo} key={index}/>)
                }
            </div>
        </section>
    )
}
export default FoodSection;
