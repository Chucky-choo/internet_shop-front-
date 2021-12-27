import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface IPriceBoxProps {
  price: number;
  salePrice: number;
}

export const PriceBox: NextPage<IPriceBoxProps> = ({ salePrice, price }) => {
  return (
    <Box
      sx={{
        minWidth: 190,
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "end",
      }}
    >
      {salePrice && (
        <Typography variant="h5" color="error">
          {salePrice} грн.
        </Typography>
      )}
      <Typography variant="body1" component="div">
        {salePrice ? <s>{price} грн.</s> : `${price} грн.`}
      </Typography>
    </Box>
  );
};