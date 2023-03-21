import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import { MainLayout } from "../layouts/MainLayout";
import { useAppSelector } from "../redux/hooks";
import { Position } from "../components/cartComponents/position/position";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { EmptyCart } from "../components/cartComponents/emptyCart/EmptyCart";
import { Sum } from "../components/cartComponents/sum/sum";
import { Ordering } from "../components/cartComponents/ordering/Ordering";

const Cart: NextPage = () => {
  console.log("Cart");
  const { data } = useAppSelector((store) => store.cart);

  return (
    <MainLayout title={"cart"}>
      {!data || data.length === 0 ? (
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
            <Divider color="black" />
            <Sum data={data} />
            <Ordering productIdArr={data.map((product) => product.id)} />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Cart;
