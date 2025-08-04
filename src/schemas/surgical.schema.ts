import * as yup from "yup";

export const createSurgicalHistorySchema = yup.object().shape({
  procedure: yup.string().required("Procedure is required"),
  surgery_date: yup
    .string()
    .required("Surgery date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      "Surgery date must be in ISO format"
    ),
  surgeon_name: yup.string().required("Surgeon name is required"),
  hospital_name: yup.string().required("Hospital name is required"),
  complications: yup.string().optional(),
});

export const updateSurgicalHistorySchema = yup.object().shape({
  procedure: yup.string().optional(),
  surgery_date: yup
    .string()
    .optional()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
      "Surgery date must be in ISO format"
    ),
  surgeon_name: yup.string().optional(),
  hospital_name: yup.string().optional(),
  complications: yup.string().optional(),
});
