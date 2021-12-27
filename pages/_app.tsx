import "../styles/globals.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { wrapper } from "../redux/redux-store";
import type { AppProps } from "next/app";
import { theme } from "./_document";
import { addUserData } from "../redux/slices/auth-reducer";
import nookies from "nookies";
import { authApi } from "../api/authApi";

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
        const userData = await authApi.authorization(token);
        store.dispatch(addUserData(userData));
      } catch (e) {
        console.log(e.response.data.message);
      }
    }

    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps({ ...ctx, store: store })
        : {},
    };
  }
);

export default wrapper.withRedux(WrappedApp);
