import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import classes from "./CardProduct.module.scss";
import { useAppSelector } from "../../../redux/hooks";
import Link from "next/link";

function CardsProduct() {
  const data = useAppSelector((store) => store.product.data);

  return (
    <div className={classes.container}>
      {data.map((product) => {
        const { id, photos, size, name, salePrice, price } = product;
        return (
          <Card key={id} className={classes.root}>
            <Link href={"/product/" + id}>
              <a>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    image={photos}
                    alt={name}
                  />
                </CardActionArea>
              </a>
            </Link>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                size: {size}
              </Typography>
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default CardsProduct;
