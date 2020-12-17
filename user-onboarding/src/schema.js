import * as yup from 'yup';

export default yup.object().shape({
    name: yup
        .string()
        .required("name is required")
        .min(3,"name must be 3 chars long"),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Passwords must be at least 6 characters long."),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept Terms and Conditions"),
  });