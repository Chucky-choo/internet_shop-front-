import { NextPage } from "next";
import Button from "@mui/material/Button";
import s from "./genderSwitch.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setGender } from "../../../redux/slices/product-reducer";

export const GenderSwitch: NextPage = () => {
  const { gender } = useAppSelector((state) => state.product.category);
  const dispatch = useAppDispatch();

  const changeGender = (gender) => {
    dispatch(setGender(gender));
  };

  return (
    <div className={s.wrapper}>
      <Button
        onClick={() => {
          changeGender("man");
        }}
        color="secondary"
        className={gender === "man" ? s.selectedGender : null}
        variant="text"
      >
        для хлопців
      </Button>
      <Button
        onClick={() => {
          changeGender("woman");
        }}
        color="secondary"
        className={gender === "woman" ? s.selectedGender : null}
        variant="text"
      >
        для дівчат
      </Button>
    </div>
  );
};
