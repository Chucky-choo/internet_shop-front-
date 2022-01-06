import "../styles/globals.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { wrapper } from "../redux/redux-store";
import type { AppProps } from "next/app";
import { theme } from "./_document";
import { addUserData } from "../redux/slices/auth-reducer";
import nookies from "nookies";
import { Api } from "../api/Api";
import { addCartData } from "../redux/slices/cart-reducer";

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

WrappedApp.getInitialProps = wrapper.getInitialPageProps((store) =>
  // @ts-ignore
  async ({ ctx, Component }) => {
    if (!store.getState().user.userData) {
      try {
        const { token } = nookies.get(ctx);

        const userData = await Api(ctx).auth.authorization();
        const { cart, ...userInfo } = userData;
        store.dispatch(addCartData([...cart]));
        store.dispatch(addUserData(userInfo));
      } catch (e) {
        console.log(e.config.headers);
      }
    }
  }
);

export default wrapper.withRedux(WrappedApp);
