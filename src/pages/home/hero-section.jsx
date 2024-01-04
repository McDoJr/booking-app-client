const HeroSection = () => {
    return (
        <section className="hero w-full h-screen bg-home bg-cover bg-center md:bg-right">
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-[35px] sm:text-[45px] md:text-[55px] font-heading drop-shadow-md">Enjoy Tasty & Fresh Food</h1>
                <h1 className="text-[35px] sm:text-[45px] md:text-[55px] font-heading drop-shadow-md">anytime!</h1>
                <h2 className="text-[14px] sm:text-[16px] md:text-[20px] font-body font-bold mt-10">FRESH AND PREMIUM EVERYTIME</h2>
                <button className="btn py-2 md:py-3 px-9 mt-10 font-bold font-body">BOOK NOW</button>
            </div>
        </section>
    )
}
export default HeroSection;
