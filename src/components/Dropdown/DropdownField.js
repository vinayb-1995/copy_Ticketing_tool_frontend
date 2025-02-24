import React, { useState, useEffect } from "react";
import "react-widgets/scss/styles.scss";
import DropdownList from "react-widgets/DropdownList";

export const DropdownField = ({
  index,
  id,
  name,
  code,
  description,
  label,
  placeholder,
  error,
  data,
  setValue,
  getvalue = () => {},
  disabled,
  onChangeValue = () => {},
  extraLabel = "",
  required,
  icon,
}) => {
  const [selectedData, setSelectedData] = useState(setValue);
  // console.log("error>>",error)
  useEffect(() => {
    let obj ={
      ...selectedData,
      'textField':name,
      'textCode':code,
      'textDesc':description,
      'index':index,
      'status': selectedData?.name ? true : false,
      'label':label
    }
    getvalue(obj);
    onChangeValue(index, name, selectedData?.name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getvalue, selectedData]);

  return (
    <>
      <label className="ms-2">
        {label} {required ? "*" : ""}
        {extraLabel && <i className="bi bi-info-circle" title={extraLabel}></i>}
      </label>
      <div className="dropdown">
        {icon && <span className="icons">{icon}</span>}
        <DropdownList
          id={id}
          name={name}
          className="dropdownfield"
          data={data}
          dataKey="value"
          textField="name"
          value={selectedData}
          onChange={(value) => setSelectedData(value)}
          filter="contains"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {error && typeof error === "string" && (
        <p className="text-danger error" >{error}</p>
      )}
    </>
  );
};
