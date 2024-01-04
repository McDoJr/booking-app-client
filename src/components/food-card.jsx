const FoodCard = ({name, price, photo}) => {

    return (
        <div className="h-[300px] w-[80%] sm:w-[calc((100%/2)-10px)] lg:w-[calc((100%/4)-10px)] mt-[10px] lg:mt-0 py-[40px] bg-white flex flex-col justify-between items-center relative rounded-[10px]">
            <div className="relative">
                <img className="w-[150px] h-[150px] rounded-[50%] object-contain hover:scale-[1.03]" src={photo} alt={`${name}.png`}/>
                <span className="py-[15px] px-[13px] text-white bg-primary text-[16px] rounded-[50%] absolute bottom-0 right-0">{`$${price}`}</span>
            </div>
            <h3 className="text-[20px] text-primary">{name}</h3>
        </div>
    )
}
export default FoodCard;
