import { wrapper } from "../../redux/redux-store";
import { fetchProduct } from "../../redux/slices/product-reducer";
import { Typography } from "@mui/material";
import style from "../../styles/Product.module.scss";
import ProductInfo from "../../components/product/ProductInfo/ProductInfo";
import { MainLayout } from "../../layouts/MainLayout";
import { useState } from "react";
import { Pictures } from "../../components/product/pictures/Pictures";

export default function Product(currentProduct) {
  const { cover, photos, ...productInfo } = currentProduct;
  const photosArr = [{ id: 0, url: cover }, ...photos];

  return (
    <MainLayout title={productInfo.name}>
      <div className={style.root}>
        <Pictures photosArr={photosArr} />
        <ProductInfo {...productInfo} />
      </div>
      <Typography variant="h4" gutterBottom align="center">
        Comments
      </Typography>
      {/*<Comments commentsArr={Product.comments}/>*/}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params: { id: idProduct } }) => {
      // @ts-ignore
      const product = await store.dispatch(fetchProduct(idProduct));
      return {
        props: product,
      };
    }
);
