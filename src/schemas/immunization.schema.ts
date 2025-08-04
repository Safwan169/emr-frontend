import * as yup from "yup";

export const createImmunizationSchema = yup.object().shape({
  vaccine_name: yup
    .string()
    .required("Vaccine name is required")
    .min(2, "Vaccine name must be at least 2 characters"),

  date: yup
    .string()
    .required("Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),

  dose_name: yup
    .string()
    .required("Dose name is required")
    .min(1, "Dose name must be at least 1 character"),

  vaccine_provider: yup
    .string()
    .required("Vaccine provider is required")
    .min(2, "Vaccine provider must be at least 2 characters"),
});

export const updateImmunizationSchema = yup.object().shape({
  vaccine_name: yup
    .string()
    .min(2, "Vaccine name must be at least 2 characters"),

  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),

  dose_name: yup.string().min(1, "Dose name must be at least 1 character"),

  vaccine_provider: yup
    .string()
    .min(2, "Vaccine provider must be at least 2 characters"),
});
