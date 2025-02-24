import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NavigationBackButton=({navigtepath})=>{
    const navigate=useNavigate()
    const handelNavigate=()=>{
        navigate(navigtepath)
    }
    return(
        <>
        <button onClick={handelNavigate} className="navigation-button"><IoMdArrowBack /></button>
        </>
    )
}
export default NavigationBackButton;