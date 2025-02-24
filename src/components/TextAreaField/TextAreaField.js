import React from "react";

export const TextAreaField = ({
  label,
  name,
  id,
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
      <div className="TextAreaField">
        {icon && <span className="icons">{icon}</span>}
        <textarea
          name={name}
          id={id}
          className={`${className} `}
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
