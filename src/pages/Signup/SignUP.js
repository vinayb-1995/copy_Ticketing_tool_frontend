import { Col, Row } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import ButtonStyle1 from "../../components/Buttons/ButtonStyle1";
import { IoPersonOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import ModalComponentSuccess from "../../components/Modals/ModalComponentSuccess";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponentError from "../../components/Modals/ModalComponentError";
import Toast from "../../components/Toast/Toast";

const SignUp = () => {
  const { showToast } = Toast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const navigate = useNavigate();
  /*storing input field  */
  const [getAdminRegister, setAdminRegister] = useState({
    username: "",
    email: "",
    password: "",
    confomr_passowrd: "",
    role: "admin",
  });
  const [errors, setErrors] = useState({});

  /* input filed handle change */
  const handelChange = (e) => {
    const { name, value } = e.target;

    setAdminRegister({
      ...getAdminRegister,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  /* Validation */
  const validate = () => {
    const newErrors = {};
    if (!getAdminRegister.username) newErrors.username = "Name is required";
    if (!getAdminRegister.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(getAdminRegister.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!getAdminRegister.password) {
      newErrors.password = "Password is required";
    } else if (getAdminRegister.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (getAdminRegister.password !== getAdminRegister.confomr_passowrd) {
      newErrors.confomr_passowrd = "Passwords do not match";
    }
    return newErrors;
  };

  /* handel submit */
  const hndelSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log("getAdminRegister>>", getAdminRegister);
      /* use fetch here to post the data */
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/adminregister`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(getAdminRegister),
          }
        );
        console.log("response>>", response);
        if (response.ok) {
          // alert("login succefull please login");
          onOpen();
        } else if (response.status === 400) {
          // alert("email already exists please login")
          onErrorOpen();
        } else {
          // alert("some thing went wrong");
          showToast({ 
            title: "Error", 
            message: "Something went wrong during registration.", 
            status:"warning"
          });
        }
      } catch (err) {
        // alert("login fiaild");
        showToast({ 
          title: "Error", 
          message: "Something went wrong during registration.", 
          status:"warning"
        });

        // console.log("register", err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  /* modal conformation success  */
  const handleOk = () => {
    onClose();
    navigate("/login");
    // Additional actions can be added here if needed
  };
  /* modal error for showin admin alred exisist */
  const handleErrorOk = () => {
    onErrorClose();
    navigate("/login");
    // Additional actions can be added here if needed
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center signup-form">
        <Row>
          <Col lg={12}>
            <form className="form" onSubmit={hndelSubmit}>
              <div className="form-header">
                <p>Create Your Account</p>
              </div>
              <InputField
                label="Name"
                name="username"
                placeholder="Name"
                type="text"
                onChange={handelChange}
                icon={<IoPersonOutline />}
                error={errors.username}
              />
              <InputField
                label="Email"
                name="email"
                placeholder="Email"
                type="text"
                onChange={handelChange}
                icon={<MdAlternateEmail />}
                error={errors.email}
              />
              <InputField
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                icon={<IoLockClosedOutline />}
                onChange={handelChange}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confomr_passowrd"
                type="password"
                onChange={handelChange}
                icon={<FiEye />}
                error={errors.confomr_passowrd}
              />
              <div className="flex-row">
                {/* <div>
                  <input type="radio" />
                  <label>Remember me </label>
                </div> */}
                {/* <span className="span">Forgot password?</span> */}
              </div>
              {/* <ButtonStyle1 children="Sign Up" type="submit" /> */}
              <ButtonStyle1 type="submit">Register</ButtonStyle1>
              <p className="p">
                Do you have an account?
                <span className="span">
                  <Link to="/login">login</Link>
                </span>
              </p>
            </form>
          </Col>
        </Row>
      </div>
      {/* success modal */}
      <ModalComponentSuccess
        isOpen={isOpen}
        onClose={onClose}
        title="Registration Successful"
        bodyText={`${getAdminRegister.username} has been successfully registered as an admin. Click 'OK' to proceed to the login page.`}
        onOk={handleOk}
      />
      {/* show modal for alradey email exsist */}
      <ModalComponentError
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        title="Registration Failed"
        bodyText={`${getAdminRegister.email} already exists. Please log in with a different email address or click 'OK' to proceed to the login page.`}
        onOk={handleErrorOk}
      />
    </>
  );
};

export default SignUp;
