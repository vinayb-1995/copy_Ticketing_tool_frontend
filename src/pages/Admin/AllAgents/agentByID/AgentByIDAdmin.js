import { useNavigate, useParams } from "react-router-dom";
import Headings from "../../../../components/Heading/Headings";
import { Col, Row } from "react-bootstrap";
import { InputField } from "../../../../components/InputField/InputField";
// import { DropdownField } from "../../../../components/Dropdown/DropdownField";
import ButtonStyle1 from "../../../../components/Buttons/ButtonStyle1";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineUserSwitch } from "react-icons/ai";
import {
  //   IoLockClosedOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SecondaryHeader from "../../../../components/Heading/SecondaryHeader";
import { DropdownField } from "../../../../components/Dropdown/DropdownField";
import ModalComponentSuccess from "../../../../components/Modals/ModalComponentSuccess";
import { useDisclosure } from "@chakra-ui/react";

const accoutnStatusDropDownOption = [
  { name: "Admin", value: true },
  { name: "User", value: false },
];
const AgentByIDAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // console.log("token>>",token)
  const [getAgentByIDAdmin, setAgentByIDAdmin] = useState();
  //   console.log(getAgentByIDAdmin);
  const { id } = useParams();
  const ticketID = id.slice(1).trim();
  const [getDropdownData, setDropdownData] = useState(null);
  //   console.log("getDropdownData>>", getDropdownData?.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/agent/${ticketID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch itid"); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the JSON response
        setAgentByIDAdmin(data);
      } catch (err) {
        console.error(err.message); // Set error in case of a failure
      }
    };
    fetchData();
  }, [token, ticketID]);
  //   const [getNewAgent, setNewAgent] = useState({
  //   });
  //   console.log("getNewAgent",getNewAgent)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("handel submit>>", getDropdownData?.value);
    // console.log("agent ID>>", getAgentByIDAdmin?.user_unique_ID);
    if (getAgentByIDAdmin?.department === "IT") {
      if (getDropdownData?.value === true) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/admin/updateAdminAgentByIdIt",
            {
              method: "PATCH", // Use PATCH for partial update
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include token if needed
              },
              body: JSON.stringify({
                agentAdminIT: false,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update agent admin status");
          }
          // const data = await response.json();
          // console.log("Agent admin status updated successfully:", data);
        } catch (error) {
          console.error("Error updating agent admin status:", error.message);
        }
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/updateAgentByIdIt/${getAgentByIDAdmin?.user_unique_ID}`,
          {
            method: "PUT", // Use PUT to update
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if needed
            },
            body: JSON.stringify({
              agentAdminIT: getDropdownData?.value,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update agent status");
        }
        if (response.ok) {
          onOpen();
        }
        // const data = await response.json();
        // console.log("Agent updated successfully:", data);
      } catch (error) {
        console.error("Error updating agent:", error.message);
      }
    } else if (getAgentByIDAdmin?.department === "SAP") {
      if (getDropdownData?.value === true) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/admin/updateAdminAgentByIdSap",
            {
              method: "PATCH", // Use PATCH for partial update
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include token if needed
              },
              body: JSON.stringify({
                agentAdminSAP: false,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update agent admin status");
          }

          // const data = await response.json();
          // console.log("Agent admin status updated successfully:", data);
        } catch (error) {
          console.error("Error updating agent admin status:", error.message);
        }
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/updateAgentByIdSap/${getAgentByIDAdmin?.user_unique_ID}`,
          {
            method: "PUT", // Use PUT to update
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token if needed
            },
            body: JSON.stringify({
              agentAdminSAP: getDropdownData?.value,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update agent status");
        }
        if (response.ok) {
          onOpen();
        }
        // const data = await response.json();
        // console.log("Agent updated successfully:", data);
      } catch (error) {
        console.error("Error updating agent:", error.message);
      }
    }
  };
  const handleOk = () => {
    onClose();
    navigate("/allagents");
    // Additional actions can be added here if needed
  };
  return (
    <>
      <div className="mt-4 container createagent mb-4">
        <Headings navigtepath="/allagents" headingname={`Udate Agent`} />
        <form onSubmit={handleSubmit}>
          <Row>
            <SecondaryHeader header="Aget Detials" />
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Full Name"
                placeholder="Full Name"
                name="fullname"
                value={getAgentByIDAdmin?.fullname}
                type="text"
                icon={<IoPersonOutline />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Email"
                placeholder="Email"
                name="email"
                value={getAgentByIDAdmin?.email}
                type="text"
                icon={<MdAlternateEmail />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Agent ID"
                placeholder="Agent ID"
                name="user_unique_ID"
                value={getAgentByIDAdmin?.user_unique_ID}
                type="text"
                icon={<MdAlternateEmail />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                label="Phone Number"
                placeholder="Phone Number"
                name="phoneNumber"
                value={getAgentByIDAdmin?.phoneNumber}
                type="text"
                icon={<IoPhonePortraitOutline />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                id="accountstatus"
                name="accountstatus"
                value={getAgentByIDAdmin?.accountStatus}
                label="Account Status"
                placeholder="Select account status"
                type="text"
                icon={<AiOutlineUserSwitch />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                id="department"
                name="department"
                value={getAgentByIDAdmin?.department}
                label="Department/Expertise"
                placeholder="Department/Expertise"
                type="text"
                icon={<FaRegAddressCard />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <InputField
                id="group"
                name="group"
                value={getAgentByIDAdmin?.group}
                label="team/group"
                placeholder="team/group"
                type="text"
                icon={<FaRegAddressCard />}
                disabled={true}
              />
            </Col>
            <Col xs={12} md={12} lg={12} className="my-2">
              <SecondaryHeader header="Assign Agent Admin" />
            </Col>
            <Col xs={12} md={4} lg={4} className="my-2">
              <DropdownField
                index={0}
                id="Agent Admin"
                name="agentAdmin"
                label="Agent Admin"
                placeholder="Admin or User"
                data={accoutnStatusDropDownOption} // Options for dropdown
                setValue={getDropdownData?.value} // Pre-filled value
                getvalue={setDropdownData} // Set dropdown data on change
                disabled={false}
                required={true}
                //   error={errors.accountstatus}
                icon={<FaRegAddressCard />}
              />
            </Col>
          </Row>
          <div className="mt-4">
            <ButtonStyle1 /* type="submit" */>Update</ButtonStyle1>
          </div>
        </form>
        <ModalComponentSuccess
          isOpen={isOpen}
          onClose={onClose}
          title="Registration Successful"
          bodyText={`${getAgentByIDAdmin?.fullname} is Know ${
            getDropdownData?.value ? "Admin" : "User"
          } for ${getAgentByIDAdmin?.department} Department`}
          onOk={handleOk}
        />
      </div>
    </>
  );
};
export default AgentByIDAdmin;
