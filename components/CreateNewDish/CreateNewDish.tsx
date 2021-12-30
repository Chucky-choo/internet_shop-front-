import React, { useState } from "react";
import { Formik } from "formik";
import { Validatione } from "./Validatione";
import DishForm from "./DishForm";
import { Button, Dialog } from "@mui/material";
import { saveNewProduct } from "../../redux/slices/product-reducer";
import { useAppDispatch } from "../../redux/hooks";
import { parseCookies } from "nookies";

const CreateNewDish = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        добавити товар
      </Button>
      <Dialog
        open={open}
        title={"Here you can create your own commodity"}
        onClose={handleClose}
      >
        {
          <Formik
            initialValues={{
              name: "",
              photos: "",
              count: 0,
              description: "",
              weight: undefined,
              size: "",
              color: "",
              material: undefined,
              price: undefined,
              salePrice: undefined,
            }}
            validationSchema={Validatione}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(saveNewProduct(values));
              setSubmitting(false);
              handleClose();
              resetForm();
            }}
          >
            <DishForm handleClose={handleClose} nameRightBtn={"Add"} />
          </Formik>
        }
      </Dialog>
    </div>
  );
};

export default CreateNewDish;
