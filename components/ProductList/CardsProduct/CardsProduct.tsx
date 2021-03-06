import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import classes from "./CardProduct.module.scss";
import { useAppSelector } from "../../../redux/hooks";
import Link from "next/link";
import { PriceBox } from "../../PriceBox/PriceBox";

function CardsProduct() {
  const data = useAppSelector((store) => store.product.data);

  return (
    <div className={classes.container}>
      {data.map((product) => {
        const { id, cover, size, name, salePrice, price } = product;
        return (
          <Link key={id} href={"/product/" + id}>
            <a>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    height="140"
                    image={cover}
                    alt={name}
                  />
                </CardActionArea>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    size: {size}
                  </Typography>
                  <PriceBox price={price} salePrice={salePrice} />
                </CardContent>
              </Card>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export default CardsProduct;
