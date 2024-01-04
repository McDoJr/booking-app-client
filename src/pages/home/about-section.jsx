const AboutSection = () => {
    return (
        <section className="w-full lg:h-screen py-[50px] px-[80px] sm:px-[120px] bg-black flex flex-col items-center lg:justify-between lg:flex-row">
            <div className="w-full lg:h-full flex flex-col justify-center">
                <img className="object-contain" src={require("../../assets/about.png")} alt="about.png"/>
            </div>
            <div className="w-full lg:h-full lg:pl-5 xl:pl-10 flex flex-col text-white justify-center items-start">
                <h1 className="font-heading mt-10 lg:mt-0 text-[45px] lg:text-[35px] xl:text-[45px] text-zinc-600">About Us</h1>
                <h1 className="font-heading text-[40px] mt-10 lg:text-[30px] xl:text-[40px] lg:mt-6 xl:mt-10">Good food for a</h1>
                <h1 className="font-heading text-[40px] mb-8 lg:text-[30px] xl:text-[40px] lg:mb-3 xl:mb-8">healthy lifestyle</h1>
                <p className="lg:text-[13px]">We are best Food Maker and Best Delivery restaurant to our customers
                    and find your favourite restaurants available in your zone. We have more
                    than 1000 of menus online. It's quick, easy and totally secure</p>
                <button className="btn mt-10 py-3 px-10 lg:text-[13px] lg:mt-7 lg:py-2 lg:px-6 xl:text-[16px] xl:mt-10 xl:py-3 xl:px-10 rounded-sm">Explore Now</button>
            </div>
        </section>
    )
}
export default AboutSection;
