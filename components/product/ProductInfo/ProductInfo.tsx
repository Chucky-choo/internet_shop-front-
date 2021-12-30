import { Typography } from "@mui/material";
import React from "react";
import { NextPage } from "next";
import { PriceBox } from "../../PriceBox/PriceBox";
import { useRouter } from "next/dist/client/router";
import { DeleteProduct } from "../../deleteProduct/DeleteProduct";
import CreateNewDish from "../../CreateNewDish/CreateNewDish";
import { UpdateProduct } from "../../updateProduct/updateProduct";
import { AdminWrapper } from "../../adminWrapper/AdminWrapper";
import style from "../../../styles/Product.module.scss";

interface IProductInfo {
  id: number;
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
  const { name, price, salePrice, description, id, ...infoDataProduct } = props;

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
    <div className={style.info}>
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
        <AdminWrapper id={+id} />
      </div>
    </div>
  );
};
export default ProductInfo;
