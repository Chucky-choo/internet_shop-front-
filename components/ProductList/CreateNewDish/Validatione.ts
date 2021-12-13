import * as yup from "yup";

const yupStringStandard = () => {
  return yup
    .string()
    .min(3, "not enough characters")
    .max(20, "too many characters")
    .required("required");
};

export const Validatione = yup.object().shape({
  name: yupStringStandard(),
  photos: yup.string().min(5, "not enough characters").required("required"),
  count: yup
    .number()
    .max(1000, "too many")
    .required("required")
    .positive()
    .integer(),
  description: yupStringStandard(),
  size: yupStringStandard(),
  weight: yup
    .string()
    .min(3, "not enough characters")
    .max(10, "too many characters")
    .nullable(),
  color: yupStringStandard(),
  material: yup
    .string()
    .min(3, "not enough characters")
    .max(10, "too many characters")
    .nullable(),
  price: yup.number().required("required").positive(),
  salePrice: yup.number().positive().nullable(),
});
