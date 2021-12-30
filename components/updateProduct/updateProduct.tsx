import { NextPage } from "next";
import { Button, Dialog } from "@mui/material";
import { Formik } from "formik";
import { Validatione } from "../CreateNewDish/Validatione";
import DishForm from "../CreateNewDish/DishForm";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Api } from "../../api/Api";

interface IUpdateProductProps {
  idProduct: number | null;
}

export const UpdateProduct: NextPage<IUpdateProductProps> = ({ idProduct }) => {
  const dispatch = useAppDispatch();

  const { currentProduct } = useAppSelector((store) => store.product);
  const { id, ...oldDataProduct } = currentProduct;

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
        поміняти дані цього товару
      </Button>
      <Dialog
        open={open}
        title={"Here you can update the product"}
        onClose={handleClose}
      >
        {
          <Formik
            initialValues={oldDataProduct}
            validationSchema={Validatione}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              Api().product.update(idProduct, values);
              setSubmitting(false);
              handleClose();
              resetForm();
            }}
          >
            <DishForm handleClose={handleClose} nameRightBtn={"Обновити"} />
          </Formik>
        }
      </Dialog>
    </div>
  );
};
