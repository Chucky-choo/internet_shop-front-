import { FC } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Form, Formik } from "formik";
import CustomizedInputBase from "../../CustomizedInputBase/CustomizedInputBase";
import { RegisterFormValidation } from "./FormsValidation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { DialogHeader } from "./dialogHeader/HeaderDialog";
import { getUserData, registerUser } from "../../../redux/slices/auth-reducer";
import { Typography } from "@mui/material";

interface IDialogRegister {
  open: boolean;

  setRegister(a: boolean): void;

  setLogin(a: boolean): void;
}

export const DialogRegister: FC<IDialogRegister> = ({
  open,
  setRegister,
  setLogin,
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.user.error);

  const handleClose = () => {
    setRegister(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterFormValidation}
        onSubmit={async (values, { resetForm }) => {
          let res = await dispatch(registerUser(values));
          if (res === "response") {
            handleClose();
            resetForm();
          }
        }}
      >
        <Form>
          <DialogHeader text={"Регістрація"} handleClose={handleClose} />
          <DialogContent>
            <DialogContentText sx={{ fontWeight: "bold" }}>
              Через акаунд Edelweiss
            </DialogContentText>
            <CustomizedInputBase
              type="string"
              name="fullName"
              placeholder="ПІП*"
            />
            <CustomizedInputBase
              type="email"
              name="email"
              placeholder="Email"
            />
            <CustomizedInputBase
              type="string"
              name="phoneNumber"
              placeholder="Номер телефону*"
            />
            <CustomizedInputBase
              type="string"
              name="password"
              placeholder="Пароль*"
            />
            <CustomizedInputBase
              type="string"
              name="confirmPassword"
              placeholder="Підтвердити пароль*"
            />
            {error && (
              <Typography
                color="error"
                variant="h5"
                align="center"
                sx={{ margin: 1 }}
              >
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setLogin(true);
              }}
              fullWidth
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              вхід
            </Button>
            <Button type="submit" fullWidth variant="contained">
              отримати код
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};
