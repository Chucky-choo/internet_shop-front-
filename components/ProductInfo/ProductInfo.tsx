import { Typography } from "@mui/material";
import React from "react";
import { NextPage } from "next";
import { PriceBox } from "../PriceBox/PriceBox";

interface IProductInfo {
  name: string;
  size: string;
  color: string;
  material: string;
  price: number;
  count: number;
  weight: string;
  description: string;
  salePrice: number;
}

const ProductInfo: NextPage<IProductInfo> = (props) => {
  const { name, price, salePrice, description, ...infoDataProduct } = props;

  const createInfoBlock = (infoDataProduct) => {
    let data = [];
    for (let key in infoDataProduct) {
      if (infoDataProduct.hasOwnProperty(key)) {
        data.push(
          <Typography
            key={key}
            noWrap
            variant="body1"
            color="textSecondary"
            component="p"
          >
            {`${key} : ${infoDataProduct[key]}`}
          </Typography>
        );
      }
    }
    return data;
  };

  return (
    <div>
      <Typography
        align="center"
        noWrap
        gutterBottom
        variant="h3"
        component="h2"
      >
        {name}
      </Typography>
      {createInfoBlock(infoDataProduct)}
      <Typography variant="body1" component="p">
        {description}
      </Typography>
      <PriceBox price={price} salePrice={salePrice} />
    </div>
  );
};
export default ProductInfo;
