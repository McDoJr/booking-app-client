import {FaCaretUp} from "react-icons/fa";
import {useEffect, useState} from "react";

const ScrollTop = () => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        const handleListener = (e) => {
            setActive(window.scrollY > 100);
        }

        window.addEventListener('scroll', handleListener);

        return () => {
            window.removeEventListener('scroll', handleListener);
        }
    }, []);

    const scroll = () => {
        window.scroll({top: 0, behavior: "smooth"});
    }

    return (
        <FaCaretUp onClick={scroll} className={`fixed right-[50px] bg-primary rounded-[50%] text-white w-[45px] h-[45px] px-[10px] pt-[8px] pb-[10px] shadow-primary shadow-sm transition-all delay-100 ease-in cursor-pointer ${active ? "opacity-[1] bottom-[50px]" : "opacity-0 bottom-[70px]"}`}/>
    )
}
export default ScrollTop;
