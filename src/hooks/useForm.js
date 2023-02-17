import { useEffect, useState } from "react";

const useForm = (initialValues, submit, validations) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validations) {
      setErrors(validations(values));
    } else {
      setErrors({});
    }
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        submit(values);
      }
      setSubmitting(false);
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  }, [errors]);
  return {
    handleChange,
    handleSubmit,
    errors,
    values,
  };
};

export default useForm;
