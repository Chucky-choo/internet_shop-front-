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
import { LoginFormValidation } from "./FormsValidation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { DialogHeader } from "./dialogHeader/HeaderDialog";
import { getUserData } from "../../../redux/slices/auth-reducer";
import { Typography } from "@mui/material";

interface IDialogLogin {
  open: boolean;

  setLogin(a: boolean): void;

  setRegister(a: boolean): void;
}

export const DialogLogin: FC<IDialogLogin> = ({
  open,
  setRegister,
  setLogin,
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.user.error);

  const handleClose = () => {
    setLogin(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        validationSchema={LoginFormValidation}
        onSubmit={async (values, { resetForm }) => {
          let res = await dispatch(getUserData(values));

          if (res === "response") {
            handleClose();
            resetForm();
          }
        }}
      >
        <Form>
          <DialogHeader text={"Вхід"} handleClose={handleClose} />
          <DialogContent>
            <DialogContentText sx={{ fontWeight: "bold" }}>
              Через акаунд Edelweiss
            </DialogContentText>
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
            <div style={{ marginTop: 28 }}>
              <DialogContentText sx={{ fontWeight: "bold" }}>
                Через акаунд соцмережі
              </DialogContentText>
              <FacebookIcon fontSize="large" />
              <GoogleIcon fontSize="large" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setRegister(true);
              }}
              fullWidth
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              регістрація
            </Button>
            <Button type="submit" fullWidth variant="contained">
              увійти
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};
