import {FaCircleCheck} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const SuccessPopup = ({ message, url = "", closePopup }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        closePopup();
        if(url) navigate(url);
    }

    return (
        <div className="fixed top-[30px] right-[30px] w-[200px] py-[5px] px-[10px] flex justify-between items-center bg-white rounded-[5px] shadow-md">
            <FaCircleCheck className="w-[20px] h-[20px] text-green-500"/>
            <span className="text-[12px] cursor-default">{message}</span>
            <span onClick={handleClose} className="text-[20px] text-red-500 cursor-pointer">&times;</span>
        </div>
    )
}
export default SuccessPopup;
