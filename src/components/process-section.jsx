import {FaBurger, FaCircleCheck} from "react-icons/fa6";

const ProcessSection = () => {
    return (
        <section className="w-full h-[55vh] py-[50px] px-[150px] text-white bg-primary select-none">
            <div className="w-full h-full flex">
                <div className="flex-[1] pl-[120px] flex flex-col justify-around items-start">
                    <h1 className="font-heading text-[35px] font-[400]">Simple steps to <br/>make online booking</h1>
                    <span className="">Our mission is to filling your belly with <br />delicious food and excellent service.</span>
                    <button className="font-[700] bg-white text-[13px] text-black py-[10px] px-[30px] border border-solid border-white hover:text-white hover:bg-transparent">GET IT NOW</button>
                </div>
                <div className="flex-[1] pr-[100px] flex justify-around items-center">
                    <div className="flex items-center">
                        <span className="mx-[30px] font-heading text-[35px]">01</span>
                        <p className="text-[14px]">
                            <FaBurger className="w-[35px] h-[35px]"/>
                            <br/>
                            Choose your
                            <br/>
                            favourite food
                        </p>
                    </div>
                    <div className="flex items-center">
                        <span className="mx-[30px] font-heading text-[35px]">02</span>
                        <p className="text-[14px]">
                            <FaCircleCheck className="w-[35px] h-[35px]"/>
                            <br/>
                            Confirm your
                            <br/>
                            order
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProcessSection;
