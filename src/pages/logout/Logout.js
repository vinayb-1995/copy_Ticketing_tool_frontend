import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../features/slice/authSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { clearAllTicketsData } from "../../features/slice/allTickets";
import { clearAdminData } from "../../features/slice/adminDataSlice";
import { clearCustomerData } from "../../features/slice/customerLoginDataSlice";
import { clearagentData } from "../../features/slice/fetchAgentData";
import { clearAgentsData } from "../../features/slice/fetchAgentsAllData";

const Logout = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(clearAllTicketsData());
        dispatch(clearAdminData());
        dispatch(clearCustomerData());
        dispatch(clearagentData());
        dispatch(clearAgentsData());

        navigate("/")
    }
  return (
    <>
      <span onClick={handleLogout} className="link me-4 d-flex align-items-center">
        <p className="me-2">Logout</p>
        <IoLogOutOutline className="icons" />
      </span>
    </>
  );
};
export default Logout;
