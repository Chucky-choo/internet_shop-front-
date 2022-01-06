import React from "react";
import {Form} from "formik";
import {Button, Grid} from "@mui/material";
import CustomizedInputBase from "../CustomizedInputBase/CustomizedInputBase";

const DishForm = ({handleClose, nameRightBtn, setPhotos}) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotos(e.target.files);
  }

  return (
    <Form autoComplete="off" style={{width: 600, padding: 14}}>
      <CustomizedInputBase type="text" name="name" placeholder="назва"/>
      <p>Оберіть фото</p>
      <input type='file' multiple accept='image/*' onChange={onChange}/>
      <CustomizedInputBase type="number" name="count" placeholder="кількість"/>
      <CustomizedInputBase
        type="text"
        name="description"
        placeholder="опис"
        multiline={true}
      />
      <CustomizedInputBase type="text" name="weight" placeholder="вага"/>
      <CustomizedInputBase type="text" name="size" placeholder="розміри"/>
      <CustomizedInputBase type="text" name="color" placeholder="колір"/>
      <CustomizedInputBase type="text" name="material" placeholder="матеріал"/>
      <CustomizedInputBase type="number" name="price" placeholder="ціна"/>
      <CustomizedInputBase
        type="number"
        name="salePrice"
        placeholder="ціна зі знижкою"
      />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button onClick={handleClose} color="primary">
          cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {nameRightBtn}
        </Button>
      </Grid>
    </Form>
  );
};

export default DishForm;
