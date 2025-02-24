import React from "react";
import useAuth from "../useAuth/useAuth";

export const InputField = ({
  label,
  name,
  id,
  type = "text",
  placeholder,
  error,
  className,  
  value,
  disabled,
  onChange,
  required,
  maxLength = "",
  readOnly = false,
  extraLabel = "",
  onBlur,
  icon,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex-column">
      <label htmlFor={id} className="ms-2">
        {label} {required ? "*" : ""}
        {extraLabel !== "" ? (
          <i className="bi bi-info-circle" title={extraLabel}></i>
        ) : (
          ""
        )}
      </label>
      <div className={`${!isAuthenticated ? "inputForm" : "group"}`}>
        {icon && (
          <span className={`${!isAuthenticated ? "input-icon" : "iconss"}`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={id}
          className={`${className}  ${!isAuthenticated ? "input" : "inputs"} `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          readOnly={readOnly}
          autoComplete="off"
        />
      </div>
      {error && <p className="text-danger error">{error}</p>}
    </div>
  );
};
