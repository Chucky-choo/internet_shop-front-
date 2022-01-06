import axios from "axios";
import nookies, { parseCookies } from "nookies";
import { NextPageContext, GetServerSidePropsContext } from "next";
import { userApi } from "./UserApi";
import { productApi } from "./ProductApi";
import { authApi } from "./authApi";
import { cartApi } from "./CartApi";

export type ApiReturnType = {
  user: ReturnType<typeof userApi>;
  product: ReturnType<typeof productApi>;
  auth: ReturnType<typeof authApi>;
  cart: ReturnType<typeof cartApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? nookies.get(ctx) : parseCookies();
  const token = cookies.token;

  const instance = axios.create({
    baseURL: "http://localhost:7777",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return {
    user: userApi(instance),
    product: productApi(instance),
    auth: authApi(instance),
    cart: cartApi(instance),
  };
};
