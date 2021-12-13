import { NextPage } from "next";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";

interface IDialogHeaderProps {
  text: string;
  handleClose(): void;
}

export const DialogHeader: NextPage<IDialogHeaderProps> = ({
  text,
  handleClose,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "95%",
      }}
    >
      <DialogTitle>{text}</DialogTitle>
      <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
    </Box>
  );
};
