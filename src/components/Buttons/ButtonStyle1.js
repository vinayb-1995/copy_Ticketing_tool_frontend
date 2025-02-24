import React from "react";
const ButtonStyle1 = ({ children ,type}) => {
  return (
    <>
    <button className="button-style1" type={type}>{children}</button>
    </> 
  );
};
export default ButtonStyle1;
