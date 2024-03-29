import { NextPage } from "next";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { PriceBox } from "../../PriceBox/PriceBox";
import Divider from "@mui/material/Divider";
import * as React from "react";
import Link from "next/link";
import { pickUpFromTheCart } from "../../../redux/slices/cart-reducer";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import s from "./position.module.scss";

export interface IPositionProps {
  id: number;
  cover: string;
  name: string;
  size: string;
  price: number;
  salePrice: number;
}

export const Position: NextPage<IPositionProps> = ({
  id,
  price,
  cover,
  name,
  size,
  salePrice,
}) => {
  const dispatch = useAppDispatch();
  const idUser = useAppSelector((store) => store.user.userData.id);

  const pickUpProduct = () => {
    dispatch(pickUpFromTheCart({ idProduct: id, idUser }));
  };

  return (
    <>
      <Divider color="black" />
      <div className={s.position_wrapper}>
        <img src={cover} alt={name} width={155} height={220} />
        <div className={s.info}>
          <Link key={id} href={"/product/" + id}>
            <a>
              <h2>{name}</h2>
            </a>
          </Link>
          <h3>Розміри в наявності: {size}</h3>
          <PriceBox salePrice={salePrice} price={price} />
        </div>
        <DeleteForeverOutlinedIcon
          onClick={pickUpProduct}
          style={{ fontSize: "50px", alignSelf: "center", cursor: "pointer" }}
        />
      </div>
    </>
  );
};
