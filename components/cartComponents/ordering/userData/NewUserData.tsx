import { NextPage } from "next";
import { Box, TextField } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import CustomizedInputBase from "../../../CustomizedInputBase/CustomizedInputBase";

const UserDataComponent: NextPage = () => {
  console.log("NewUserData");

  return (
    <Box minWidth={"40%"}>
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        ДАНІ ПОКУПЦЯ
      </Typography>
      <CustomizedInputBase type="string" name="fullName" placeholder="ПІБ" />
      <CustomizedInputBase
        type="string"
        name="phoneNumber"
        placeholder="номер телефону"
      />
    </Box>
  );
};

export const NewUserData = React.memo(UserDataComponent);
