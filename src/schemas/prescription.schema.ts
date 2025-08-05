import * as yup from "yup";

export const previousPrescriptionCreateSchema = yup.object().shape({
  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters"),

  url: yup
    .string()
    .required("Image URL is required")
    .url("Must be a valid URL"),

  uploadDate: yup.string().nullable().notRequired(),

  // Optional fields that might be auto-generated on backend
  created_at: yup.string().notRequired(),
  updated_at: yup.string().notRequired(),
});

export const previousPrescriptionUpdateSchema = yup.object().shape({
  id: yup
    .number()
    .typeError("ID must be a number")
    .required("ID is required for update"),

  description: yup
    .string()
    .optional()
    .min(3, "Description must be at least 3 characters"),

  url: yup.string().optional().url("Must be a valid URL"),

  uploadDate: yup.string().nullable().notRequired(),

  updated_at: yup.string().notRequired(),
});
