import React, { FC } from "react";
import { useField } from "formik";
import { Button, Divider, InputBase, TextField } from "@mui/material";

interface Props {
  type: string;
  name: string;
  placeholder: string;
}

const CustomizedInputBase: FC<Props> = (props) => {
  const [field, meta] = useField(props);

  const test = () => {
    if (meta.touched && meta.error) {
      return true;
    }
  };

  return (
    <>
      <TextField
        error={test()}
        placeholder={props.placeholder}
        inputProps={field}
        margin="dense"
        id="name"
        label={props.placeholder}
        type={props.type}
        fullWidth
        variant="standard"
      />
      {meta.touched && meta.error ? (
        <>
          <Divider orientation="vertical" />
          <p style={{ color: "#d22f2f" }}>{meta.error}</p>
        </>
      ) : null}
      <Divider orientation="vertical" />
    </>
  );
};

export default CustomizedInputBase;
