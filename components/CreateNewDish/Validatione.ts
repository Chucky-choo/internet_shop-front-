import * as yup from "yup";

const yupStringStandard = (min, max) => {
  return yup
    .string()
    .min(min, "not enough characters")
    .max(max, "too many characters")
    .required("required");
};

export const Validatione = yup.object().shape({
  name: yupStringStandard(2, 25),
  count: yup
    .number()
    .max(1000, "too many")
    .required("required")
    .positive()
    .integer(),
  description: yupStringStandard(10, 900),
  size: yupStringStandard(2, 16),
  weight: yup
    .string()
    .min(3, "not enough characters")
    .max(10, "too many characters")
    .nullable(),
  color: yupStringStandard(3, 15),
  material: yup
    .string()
    .min(3, "not enough characters")
    .max(10, "too many characters")
    .nullable(),
  price: yup.number().required("required").positive(),
  salePrice: yup.number().positive().nullable(),
});
