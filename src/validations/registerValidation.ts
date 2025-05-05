import * as yup from "yup";

export const registerValidationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "One uppercase required")
    .matches(/[a-z]/, "One lowercase required")
    .matches(/\d/, "One number required")
    .matches(/[^A-Za-z0-9]/, "One special character required"),
});
