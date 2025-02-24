import { Divider } from "@chakra-ui/react";

const SecondaryHeader = ({header}) => {
  return (
    <>
      <p className="mb-0 fs-5 fw-medium">{header}</p>
      <Divider className="m-0" borderColor="blue.400" borderWidth="0.5px" />
    </>
  );
};
export default SecondaryHeader;
