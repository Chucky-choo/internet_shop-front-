import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import { MainLayout } from "../layouts/MainLayout";
import { useAppSelector } from "../redux/hooks";
import { Position } from "../components/cartComponents/position/position";
import Divider from "@mui/material/Divider";
import * as React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { EmptyCart } from "../components/cartComponents/emptyCart/EmptyCart";

const Cart: NextPage = () => {
  const { data } = useAppSelector((store) => store.cart);

  if (data.length === 0) {
    return <EmptyCart />;
  }

  return (
    <MainLayout title={"cart"}>
      {data.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Typography variant="h4" align="center" sx={{ marginTop: 3 }}>
            КОРЗИНА
          </Typography>
          <div style={{ margin: "20px" }}>
            {data.map((product) => {
              return (
                <Position
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  size={product.size}
                  price={product.price}
                  cover={product.cover}
                  salePrice={product.salePrice}
                />
              );
            })}
            <Divider sx={{ height: 2 }} color={"black"} />
            <Typography
              variant="h5"
              align="center"
              sx={{ marginTop: 1, color: "gray" }}
            >
              СУМА ДО ОПЛАТИ ЗА ТОВАР
            </Typography>
            <Typography variant="h6" align="center" sx={{ marginTop: 1 }}>
              {data.reduce(
                (sum, product) =>
                  product.salePrice
                    ? product.salePrice + sum
                    : product.price + sum,
                0
              )}{" "}
              грн
            </Typography>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Cart;
