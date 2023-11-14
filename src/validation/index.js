import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("University's name is required"),
  website: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  min_cost: Yup.number()
    .required("Province is required")
    .min(1000, "Minimum cost must be at least 1000")
    .max(5000, "Maximum cost must not exceed 5000"),
  max_cost: Yup.number()
    .required("Province is required")
    .min(1000, "Minimum cost must be at least 1000")
    .max(5000, "Maximum cost must not exceed 5000"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),

  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});
