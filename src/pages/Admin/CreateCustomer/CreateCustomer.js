import { Col, Row } from "react-bootstrap";
import Headings from "../../../components/Heading/Headings";
import { InputField } from "../../../components/InputField/InputField";
import { MdAlternateEmail } from "react-icons/md";
import ButtonStyle1 from "../../../components/Buttons/ButtonStyle1";
import { IoPersonOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { DropdownField } from "../../../components/Dropdown/DropdownField";
import { AiOutlineUserSwitch } from "react-icons/ai";
import ConformationModal from "../../../components/Modals/ConformationModal";
import { useDisclosure } from "@chakra-ui/react";
import Toast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const accoutnStatusDropDownOption = [
  { name: "Active", value: "active" },
  { name: "Created", value: "created" },
];
const contactMethod = [
  { name: "Mail", value: "mail" },
  { name: "Mobile", value: "Mobile" },
];

const CreateCustomer = () => {
  const navigate = useNavigate();
  const admiId = useSelector(
    (state) => state?.admin?.adminData?.adminBody?._id
  );
  // console.log("adminid",admiId)
  const [getNewCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    secondaryemail: "",
    mobile: "",
    alternativemobile: "",
    password: "",
    companyorgnizationname: "",
    preferedcontactmethod: "",
    accountstatus: "",
    createdByAdmin: admiId,
  });
  const [getConformfields, setConformfields] = useState({});

  // Update getConformfields whenever getNewCustomer changes
  useEffect(() => {
    setConformfields({
      "First Name": getNewCustomer.firstname,
      "Last Name": getNewCustomer.lastname,
      Email: getNewCustomer.email,
      "Secondary Email": getNewCustomer.secondaryemail,
      Mobile: getNewCustomer.mobile,
      "Alternative Mobile": getNewCustomer.alternativemobile,
      Password: getNewCustomer.password,
      "Company/Organization Name": getNewCustomer.companyorgnizationname,
      "Preferred Contact Method": getNewCustomer.preferedcontactmethod,
      "Account Status": getNewCustomer.accountstatus,
    });
  }, [getNewCustomer]);
  // const [formData, setFormData] = useState({ name: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showToast } = Toast();
  const [getDropdownData, setDropdownData] = useState(null);

  /* Update getNewCustomer when getDropdownData changes */
  useEffect(() => {
    // Prevent update if getDropdownData is null or undefined
    if (getDropdownData && getDropdownData.name && getDropdownData.textField) {
      setNewCustomer((prevState) => {
        // Prevent setting state if the value is already the same to avoid re-renders
        if (prevState[getDropdownData.textField] === getDropdownData.name) {
          return prevState;
        }
        return {
          ...prevState,
          [getDropdownData.textField]: getDropdownData.name, // Update form field based on dropdown selection
        };
      });
    }
  }, [getDropdownData]);

  /* Handle input changes */
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewCustomer({
      ...getNewCustomer,
      [name]: value,
    });
  };
  /* validation */
  /* soter error */
  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    const phonePattern = /^\d{10}$/; // Regex for 10-digit phone number validation

    // Check required fields and set error messages
    if (!getNewCustomer.firstname)
      tempErrors.firstname = "First Name is required.";
    if (!getNewCustomer.lastname)
      tempErrors.lastname = "Last Name is required.";

    if (!getNewCustomer.email || !emailPattern.test(getNewCustomer.email)) {
      tempErrors.email = "Valid Email is required.";
    }

    if (
      getNewCustomer.secondaryemail &&
      !emailPattern.test(getNewCustomer.secondaryemail)
    ) {
      tempErrors.secondaryemail = "Valid Secondary Email is required.";
    }

    // Check if email and secondary email are the same
    if (
      getNewCustomer.email &&
      getNewCustomer.secondaryemail &&
      getNewCustomer.email === getNewCustomer.secondaryemail
    ) {
      tempErrors.secondaryemail =
        "Secondary email must be different from primary email.";
    }

    if (!getNewCustomer.mobile || !phonePattern.test(getNewCustomer.mobile)) {
      tempErrors.mobile = "Valid 10-digit Mobile number is required.";
    }

    if (
      getNewCustomer.alternativemobile &&
      !phonePattern.test(getNewCustomer.alternativemobile)
    ) {
      tempErrors.alternativemobile =
        "Valid 10-digit Alternative Mobile number is required.";
    }

    // Check if mobile and alternative mobile are the same
    if (
      getNewCustomer.mobile &&
      getNewCustomer.alternativemobile &&
      getNewCustomer.mobile === getNewCustomer.alternativemobile
    ) {
      tempErrors.alternativemobile =
        "Alternative mobile must be different from primary mobile.";
    }

    if (!getNewCustomer.password) tempErrors.password = "Password is required.";
    if (!getNewCustomer.companyorgnizationname)
      tempErrors.companyorgnizationname =
        "Company/Organization Name is required.";
    if (!getNewCustomer.preferedcontactmethod)
      tempErrors.preferedcontactmethod =
        "Preferred Contact Method is required.";
    if (!getNewCustomer.accountstatus)
      tempErrors.accountstatus = "Account Status is required.";

    setErrors(tempErrors); // Set errors state
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };
  /* On click submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("getNewCustomer>>", getNewCustomer);
    const newErrors = validate();
    if (newErrors) {
      // setFormData(getNewCustomer); // Save the data for modal display
      onOpen();
    }
  };
  //on conform model
  const handleOk = async () => {
    //write response heare
    try {
      const response = await fetch(
        `http://localhost:5000/api/customer/customerregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getNewCustomer),
        }
      );
      // console.log("response>>", response);
      if (response.ok) {
        onClose();
        setTimeout(() => {
          // alert("Successfully created customer");//gree toast show created and navigate to the admim page
          navigate("/adminhome");
          showToast({
            title: "",
            message: "Customer Created succeful",
            status: "success",
          });
        }, 100);

        // const res_data = await response.json();
        // const role = res_data.role;
        // console.log("role>>",role)
        // dispatch(setToken(res_data.token,res_data.role))
        // dispatch(setToken({ token: res_data.token, role: res_data.role }));

        // onOpen();
      } else if (response.status === 400) {
        // alert("Some thing went wrong pleas login again");
        showToast({
          title: "Error",
          message: `Please try another email ID; ${getNewCustomer.email} already exists.`,
          status: "warning",
        });
      } else {
        // alert("some thing went wrong");
        showToast({
          title: "Error",
          message: "Some thing went wrong pleas login again.",
          status: "warning",
        });
      }
    } catch (err) {
      // alert(" fiaild");
      showToast({
        title: "Error",
        message: "Some thing went wrong pleas login again.",
        status: "warning",
      });
    }
  };
  return (
    <div className="mt-4 container createcutomer pb-4">
      <Headings
        navigtepath="/adminhome"
        headingname="New Customer Registration"
      />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="First Name"
              placeholder="First Name"
              name="firstname"
              type="text"
              onChange={handleChange}
              icon={<IoPersonOutline />}
              error={errors.firstname}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Last Name"
              placeholder="Last Name"
              name="lastname"
              type="text"
              onChange={handleChange}
              icon={<IoPersonOutline />}
              error={errors.lastname}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
              icon={<MdAlternateEmail />}
              error={errors.email}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Secondary Email"
              placeholder="Secondary Email"
              name="secondaryemail"
              type="text"
              onChange={handleChange}
              icon={<MdAlternateEmail />}
              error={errors.secondaryemail}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Mobile"
              placeholder="Mobile"
              name="mobile"
              type="text"
              onChange={handleChange}
              icon={<IoPhonePortraitOutline />}
              error={errors.mobile}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Alternative Mobile"
              placeholder="Alternative Mobile"
              name="alternativemobile"
              type="text"
              onChange={handleChange}
              icon={<IoPhonePortraitOutline />}
              error={errors.alternativemobile}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Password"
              placeholder="Password"
              name="password"
              type="text"
              onChange={handleChange}
              icon={<IoLockClosedOutline />}
              error={errors.password}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Company/Orgnization Name"
              placeholder="Company/Orgnization Name"
              name="companyorgnizationname"
              type="text"
              onChange={handleChange}
              icon={<FaRegBuilding />}
              error={errors.companyorgnizationname}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <DropdownField
              index={0}
              id="preferedcontactmethod"
              name="preferedcontactmethod"
              label="Preferred Contact Method"
              placeholder="Preferred Contact Method"
              data={contactMethod} // Options for dropdown
              setValue={getNewCustomer?.preferedcontactmethod || ""} // Pre-filled value
              getvalue={setDropdownData} // Set dropdown data on change
              disabled={false}
              required={true}
              error={errors.preferedcontactmethod}
              icon={<FaRegAddressCard />}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <DropdownField
              index={0}
              id="accountstatus"
              name="accountstatus"
              label="Account Status"
              placeholder="Select account status"
              data={accoutnStatusDropDownOption} // Options for dropdown
              setValue={getNewCustomer?.accountstatus} // Pre-filled value
              getvalue={setDropdownData} // Set dropdown data on change
              disabled={false}
              required={true}
              error={errors.accountstatus} // Display error if exists
              icon={<AiOutlineUserSwitch />}
            />
          </Col>
        </Row>
        <div className="mt-4">
          <ButtonStyle1 type="submit">Create</ButtonStyle1>
        </div>
      </form>
      <ConformationModal
        title="Confirm Customer Details"
        bodyText={getConformfields}
        isOpen={isOpen}
        onClose={onClose}
        onOk={handleOk}
      />
    </div>
  );
};

export default CreateCustomer;
