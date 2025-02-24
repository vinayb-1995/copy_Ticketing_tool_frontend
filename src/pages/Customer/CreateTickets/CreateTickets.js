import { Col, Row } from "react-bootstrap";
import { InputField } from "../../../components/InputField/InputField";
import { MdAlternateEmail } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";
// import { FaRegBuilding } from "react-icons/fa";
// import { IoLockClosedOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa6";
import ButtonStyle1 from "../../../components/Buttons/ButtonStyle1";
import Headings from "../../../components/Heading/Headings";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DropdownField } from "../../../components/Dropdown/DropdownField";
import { TextAreaField } from "../../../components/TextAreaField/TextAreaField";
import ConformationModal from "../../../components/Modals/ConformationModal";
import Toast from "../../../components/Toast/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import SecondaryHeader from "../../../components/Heading/SecondaryHeader";

const CreateTickets = () => {
  const location = useLocation();
  const uuid = location.state?.uuid;
  // console.log("uniquei id for customer>> ",uuid)
  const navigate = useNavigate();
  /* customer data from redux */
  const customerData = useSelector((state) => state.customer.customerData);
  const customerName = `${customerData?.customerBody?.firstname || ""} ${
    customerData?.customerBody?.lastname || ""
  }`.trim();
  // console.log("customerData>>", customerData);
  // const admiId = customerData?.customerBody?.adminDetails?._id.toString();
  const adminaMilID = {
    email: customerData?.customerBody?.adminDetails?.email,
  }; //posting the data for counter
  // console.log("adminaMilID>>",adminaMilID)
  const adminId = customerData?.customerBody?.adminDetails?._id //uniquie adminID for TI and SAP
    .toString()
    .trim();
  // console.log("adminId", adminId);

  const [getNewTicket, setNewTicket] = useState({
    uniqueticketID: "",
    adminName: "",
    adminId: "",
    adminMailID: "",
    customerName: "",
    customerID: "",
    customerMailID: "",
    customerContactNumber: "",
    department: "",
    subModule: "",
    issueType: "",
    description: "",
    image: "",
  });
  // console.log('getNewTicket>>',getNewTicket)
  const [getConformfields, setConformfields] = useState({});
  const { showToast } = Toast();
  // Update getConformfields whenever getNewTicket changes
  useEffect(() => {
    setConformfields({
      "Ticket ID": getNewTicket.uniqueticketID,
      "Admin Name": getNewTicket.adminName,
      "Admin ID": getNewTicket.adminMailID,
      "Customer Name": getNewTicket.customerName,
      "Customer ID": getNewTicket.customerID,
      "Customer Email": getNewTicket.customerMailID,
      "Customer Mobile": getNewTicket.customerContactNumber,
      Department: getNewTicket.department,
      "Sub Modules": getNewTicket.subModule,
      "Type of Issue": getNewTicket.issueType,
      Description: getNewTicket.description,
    });
  }, [getNewTicket]);
  /* -----------------------------------------------------------------dependent dropdown--------------------*/
  const [departments, setDepartments] = useState([]);
  const [subModules, setSubModules] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  // console.log("departments>>",departments)
  useEffect(() => {
    fetch("http://localhost:5000/api/dropdown/departments")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);
  const handleDepartmentChange = (value) => {
    if (value !== getNewTicket.department) {
      setNewTicket((prev) => ({
        ...prev,
        department: value,
        subModule: "",
        issueType: "",
      }));
      // console.log("department>>",value)
      fetch(`http://localhost:5000/api/dropdown/submodules/${value}`)
        .then((response) => response.json())
        .then((data) => setSubModules(data))
        .catch((error) => console.error("Error fetching subModules:", error));
    }
  };
  const handleSubModuleChange = (value) => {
    if (value !== getNewTicket.subModule) {
      setNewTicket((prev) => ({ ...prev, subModule: value, issueType: "" }));
      // console.log("subModule>>",value)
      fetch(`http://localhost:5000/api/dropdown/issues/${value}`)
        .then((response) => response.json())
        .then((data) => setIssueTypes(data))
        .catch((error) => console.error("Error fetching issueTypes:", error));
    }
  };
  const handleIssueTypeChange = (value) => {
    if (value !== getNewTicket.issueType) {
      // console.log("type of issue>>", value);
      setNewTicket((prev) => ({
        ...prev,
        issueType: value, // Store the selected issue type name
      }));
    }
  };
  /* -----------------------------------------------------------------dependent dropdown--------------------*/
  const { isOpen, onOpen, onClose: chakraOnClose } = useDisclosure();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target; // Destructure to get name, value, type, and files
    setNewTicket((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value, // Check if the input is a file
      adminName: customerData?.customerBody?.adminDetails?.username,
      adminMailID: customerData?.customerBody?.adminDetails?.email,
      customerName: customerName,
      customerID: customerData?.customerBody?.user_unique_ID || "",
      customerMailID: customerData?.customerBody?.email || "",
      customerContactNumber: customerData?.customerBody?.mobile || "",
      adminId: adminId || "",
    }));
  };
  const [errors, setErrors] = useState({});
  const validate = () => {
    const tempErrors = {};

    if (!getNewTicket.department) {
      tempErrors.department = "Department is required";
    }
    if (!getNewTicket.subModule) {
      tempErrors.subModule = "Sub Module is required";
    }
    if (!getNewTicket.issueType) {
      tempErrors.issueType = "Type of Issue is required";
    }
    if (!getNewTicket.description) {
      tempErrors.description = "Description is required";
    } else if (getNewTicket.description.length > 1000) {
      tempErrors.description = "Description can't exceed 1000 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* hande submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors) {
      // console.log("getNewTicket", getNewTicket);
      // setFormData(getNewCustomer); // Save the data for modal display
      if (getNewTicket.department === "IT") {
        try {
          // const response = await fetch("http://localhost:5000/api/counter/it");
          const response = await fetch(
            `http://localhost:5000/api/counter/incrementIt`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(adminaMilID),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch itid"); // Handle HTTP errors
          }
          const data = await response.json(); // Parse the JSON response
          // console.log("itcounterid>>", data);
          // setUniqueID(data.itID)
          setNewTicket((prevState) => ({
            ...prevState,
            uniqueticketID: data.itID,
          }));
          setTimeout(() => {
            onOpen();
          }, 100);
        } catch (err) {
          console.error(err.message); // Set error in case of a failure
        }
      } else if (getNewTicket.department === "ERP") {
        try {
          // const response = await fetch("http://localhost:5000/api/counter/sap");
          const response = await fetch(
            `http://localhost:5000/api/counter/incrementSap`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(adminaMilID),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch itid"); // Handle HTTP errors
          }
          const data = await response.json(); // Parse the JSON response
          // console.log("itcounterid>>",data)
          // setUniqueID(data.sapID)
          setNewTicket((prevState) => ({
            ...prevState,
            uniqueticketID: data.sapID,
          }));
          setTimeout(() => {
            onOpen();
          }, 100);
        } catch (err) {
          console.error(err.message); // Set error in case of a failure
        }
      }
    }
  };
  // handle onClose function with logging
  const onClose = async () => {
    if (getNewTicket.department === "IT") {
      try {
        // const response = await fetch("http://localhost:5000/api/counter/decrementIT");
        const response = await fetch(
          `http://localhost:5000/api/counter/decrementIT`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminaMilID),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch itid"); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON response
        // console.log("itcounterid>>",data)
        // setUniqueID(data.itID)
        setNewTicket((prevState) => ({
          ...prevState,
          uniqueticketID: data.itID,
        }));
        setTimeout(() => {
          chakraOnClose();
        }, 100);
      } catch (err) {
        console.error(err.message); // Set error in case of a failure
      }
    } else if (getNewTicket.department === "ERP") {
      try {
        // const response = await fetch("http://localhost:5000/api/counter/decrementSAP");
        const response = await fetch(
          `http://localhost:5000/api/counter/decrementSAP`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminaMilID),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch itid"); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON response
        // console.log("itcounterid>>",data)
        // setUniqueID(data.sapID)
        setNewTicket((prevState) => ({
          ...prevState,
          uniqueticketID: data.sapID,
        }));
        setTimeout(() => {
          chakraOnClose();
        }, 100);
      } catch (err) {
        console.error(err.message); // Set error in case of a failure
      }
    }
    // chakraOnClose();
  };
  //handel Ok
  const handleOk = async () => {
    // console.log("getNewTicket", getNewTicket);
    // console.log(uniqueId);
    try {
      const formData = new FormData();
      // Ensure each field is defined before appending
      Object.keys(getNewTicket).forEach((key) => {
        if (getNewTicket[key] !== undefined && getNewTicket[key] !== null) {
          formData.append(key, getNewTicket[key]);
        }
      });
      // for (let pair of formData.entries()) {
      //   // console.log(`${pair[0]}: ${pair[1]}`);
      //   console.log(
      //     `${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`
      //   );
      // }
      // console.log("formData>>",formData)
      const response = await fetch(
        "http://localhost:5000/api/tickets/createTicket",
        {
          method: "POST",
          body: formData,
          headers: {
            // Do not set Content-Type, browser will set it automatically when sending FormData
          },
        }
      );
      // console.log("response", response);
      // const resData = await response.json(); // or response.text() if you're expecting plain text
      // console.log("Response Data:", resData);
      if (response.ok) {
        // console.log("Ticket created successfully!");
        setTimeout(() => {
          // alert("Successfully created customer");//gree toast show created and navigate to the admim page
          navigate("/");
          showToast({
            title: "",
            message: "New ticket created succeful",
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
          message: `Please try another email  already exists.`,
          status: "warning",
        });
      } else {
        // alert("some thing went wrong");
        showToast({
          title: "Error",
          message: "Some thing went wrong.",
          status: "warning",
        });
      }
    } catch (error) {
      console.log("fetch error creat tickets>>", error);
    }
  };

  /* Handle file change */
  //  const handleFileChange = (e) => {
  //   setNewTicket({ ...getNewTicket, image: e.target.files[0] });  // Save the file object
  // };
  return (
    <>
      <div className="mt-2 mb-4 container createcutomer">
        <Headings
          navigtepath="/"
          headingname="Create New Ticket"
          ticketID={uuid}
        />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={12} lg={12} className="mt-2">
              <SecondaryHeader header="Customer Details" />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Admin Name"
                placeholder="Admin Name"
                name="adminName"
                type="text"
                value={customerData?.customerBody?.adminDetails?.username || ""}
                onChange={handleChange}
                icon={<IoPersonOutline />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Admin Mail-ID"
                placeholder="Admin Mail-ID"
                name="adminMailID"
                type="text"
                value={customerData?.customerBody?.adminDetails?.email || ""}
                onChange={handleChange}
                icon={<IoPersonOutline />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Customer Name"
                placeholder="Customer Name"
                name="customerName"
                type="text"
                value={customerName}
                onChange={handleChange}
                icon={<MdAlternateEmail />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Customer ID"
                placeholder="Customer ID"
                value={customerData?.customerBody?.user_unique_ID || ""}
                name="customerID"
                type="text"
                onChange={handleChange}
                icon={<MdAlternateEmail />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Customer Mail-ID"
                placeholder="Customer Mail-ID"
                name="customerMailID"
                type="text"
                value={customerData?.customerBody?.email || ""}
                onChange={handleChange}
                icon={<FiPhone />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Customer Contact Number"
                placeholder="Customer Contact Number"
                name="customerContactNumber"
                type="text"
                value={customerData?.customerBody?.mobile || ""}
                onChange={handleChange}
                icon={<IoPhonePortraitOutline />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={12} lg={12} className="mt-2">
              <SecondaryHeader header=" Please Fill The Ticket Information" />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              {/* <DropdownField
                index={0}
                label="Department(IT/ERP)"
                placeholder="Department/Expertise"
                id="Department(IT/ERP)"
                name="department"
                // data={departments}
                setValue={setNewTicket?.department || ""}
                // getvalue={setDropdownData}
                disabled={false}
                required={true}
                error={errors.department}
                icon={<IoLockClosedOutline />}
              /> */}
              <DropdownField
                label="Department"
                data={departments}
                setValue={getNewTicket.department}
                onChangeValue={(_, __, value) => handleDepartmentChange(value)}
                placeholder="Select Department"
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              {/* <DropdownField
                index={0}
                label="Sub Modules"
                placeholder="Sub Modules"
                id="subModule"
                name="subModule"
                data={subModule}
                setValue={setNewTicket?.subModule || ""}
                // getvalue={setDropdownData}
                disabled={false}
                required={true}
                error={errors.subModule}
                icon={<FaRegAddressCard />}
              /> */}
              <DropdownField
                label="SubModule"
                data={subModules}
                setValue={getNewTicket.subModule}
                onChangeValue={(_, __, value) => handleSubModuleChange(value)}
                placeholder="Select SubModule"
                disabled={!getNewTicket.department}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              {/* <DropdownField
                index={0}
                label="Type of Issue"
                placeholder="Type of Issue"
                id="issueType"
                name="issueType"
                data={issueTypes}
                setValue={setNewTicket?.issueType || ""}
                // getvalue={setDropdownData}
                disabled={false}
                required={true}
                error={errors.issueType}
                icon={<FaRegBuilding />}
              /> */}
              <DropdownField
                label="Issue Type"
                data={issueTypes}
                setValue={getNewTicket.issueType}
                onChangeValue={(_, __, value) => handleIssueTypeChange(value)}
                placeholder="Select Issue Type"
                disabled={!getNewTicket.subModule}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              {/*   <InputField
                label="Upload Image"
                placeholder="Upload Image"
                name="uploadImage"
                type="file"
                // value={customerData?.customerBody?.adminDetails?.username || ""}
                // onChange={handleChange}
                icon={<IoPersonOutline />}
                disabled={false}
              />*/}
              <InputField
                label="Upload Image"
                placeholder="Upload Image"
                name="image"
                type="file"
                onChange={handleChange} // Handle file input change
                icon={<IoPersonOutline />}
                disabled={false}
              />
            </Col>
            <Col xs={12} md={8} lg={8} className="my-2">
              <TextAreaField
                label="Description of the Issue"
                name="description"
                id="description"
                placeholder="Describe your issue here..."
                onChange={handleChange}
                error={errors.description}
                icon={<FaRegAddressCard />}
                // required
                maxLength={1000}
                extraLabel="Please provide detailed information"
              />
            </Col>
          </Row>
          <div className="mt-4">
            <ButtonStyle1 type="submit">Create</ButtonStyle1>
          </div>
        </form>
        <ConformationModal
          title="Confirm Agent Details"
          // bodyText={getNewAgent}
          bodyText={getConformfields}
          isOpen={isOpen}
          onClose={onClose}
          onOk={handleOk}
        />
      </div>
    </>
  );
};
export default CreateTickets;
