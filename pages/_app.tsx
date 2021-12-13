import { FC } from "react";
import "../styles/globals.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/redux-store";
import type { AppProps } from "next/app";
import { theme } from "./_document";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
