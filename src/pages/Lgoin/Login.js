import { Col, Row } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import ButtonStyle1 from "../../components/Buttons/ButtonStyle1";
import { MdAlternateEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/slice/authSlice";
import Toast from "../../components/Toast/Toast";

const Login = () => {
  /* Store input changes */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = Toast();
  const [getLoginID, setLoginID] = useState({
    user_unique_ID: "",
    password: "",
  });
// console.log("lgoindetails",getLoginID)
  /* Store errors */
  const [errors, setErrors] = useState({});

  /* Handle input changes */
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginID({
      ...getLoginID,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  /* Validate inputs */
  const validate = () => {
    const newErrors = {};
    if (!getLoginID.user_unique_ID) {
      newErrors.user_unique_ID = "Email/ID is required";
    } 
    // else if (!/\S+@\S+\.\S+/.test(getLoginID.email)) {
    //   newErrors.email = "Email address is invalid";
    // }
    if (!getLoginID.password) {
      newErrors.password = "Password is required";
    } 
    // else if (getLoginID.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long";
    // }
    return newErrors;
  };

  /* On click submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // console.log("getLoginID>>", getLoginID);
      // Add your fetch 
      try {
        const urls = [
          `http://localhost:5000/api/customer/customerlogin`,
          `http://localhost:5000/api/admin/adminlogin`,
          `http://localhost:5000/api/agent/agentlogin`
        ];
      
        // Use Promise.allSettled to handle all requests without throwing an error for failed ones
        const results = await Promise.allSettled(
          urls.map(url =>
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(getLoginID),
            })
          )
        );
      
        // Find the first successful response without logging errors for failed responses
        const successfulResponse = results.find(
          result => result.status === "fulfilled" && result.value.ok
        );
      
        if (successfulResponse) {
          const res_data = await successfulResponse.value.json();
          const role = res_data.role;
      
          // Dispatch token and role to Redux store
          dispatch(setToken({ token: res_data.token, role }));
      
          // Navigate based on role
          if (role === "admin") {
            navigate("/");
            showToast({
              title: "",
              message: "Login successful",
              status: "success",
            });
          } else if (role === "customer") {
            navigate("/");
            showToast({
              title: "",
              message: "Login successful",
              status: "success",
            });
          } else if (role === "agent") {
            navigate("/");
            showToast({
              title: "",
              message: "Login successful",
              status: "success",
            })
          } else {
            showToast({
              title: "Error",
              message: "Invalid credentials",
              status: "warning",
            });
          }
        } else {
          // If none of the APIs returned a successful response
          showToast({
            title: "Error",
            message: "Invalid credentials or network error.",
            status: "warning",
          });
        }
      } catch (err) {
        // General error handling for other potential issues
        showToast({
          title: "Error",
          message: "Something went wrong, please try logging in again.",
          status: "warning",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center login-form">
        <Row>
          <Col lg={12}>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-header">
                <p>Login to Your Account</p>
              </div>
              <InputField
                label="Email/ID"
                placeholder="Email/ID"
                name="user_unique_ID"
                type="text"
                onChange={handleChange}
                icon={<MdAlternateEmail />}
                error={errors.user_unique_ID}
              />
              <InputField
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                icon={<IoLockClosedOutline />}
                error={errors.password}
              />
              <div className="flex-row">
                {/* <div>
                  <input type="radio" />
                  <label>Remember me </label>
                </div> */}
                {/* <span className="span">Forgot password?</span> */}
              </div>
              <ButtonStyle1 type="submit">Login</ButtonStyle1>
              <p className="p">
                Don't have an account?
                <span className="span">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </p>
            </form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
