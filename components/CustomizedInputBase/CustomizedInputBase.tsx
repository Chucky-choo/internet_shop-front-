import React, { FC } from "react";
import { useField } from "formik";
import { Button, Divider, InputBase, TextField } from "@mui/material";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  multiline?: boolean;
}

const CustomizedInputBase: FC<Props> = ({
  placeholder,
  type,
  name,
  multiline = false,
}) => {
  const [field, meta] = useField(name);

  const test = () => {
    if (meta.touched && meta.error) {
      return true;
    }
  };

  return (
    <>
      <TextField
        error={test()}
        placeholder={placeholder}
        inputProps={field}
        margin="dense"
        id="name"
        label={placeholder}
        type={type}
        fullWidth
        variant="standard"
        multiline={multiline}
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
