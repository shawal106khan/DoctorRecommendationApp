import { useState } from "react";
export const useRequiredValidation = (rules) => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors = {};

    Object.keys(rules).forEach((key) => {
      if (!values[key] || values[key].length === 0) {
        newErrors[key] = rules[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, setErrors, validate };
};
