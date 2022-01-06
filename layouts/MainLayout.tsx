import React, { FC } from "react";
import Head from "next/head";
import PrimarySearchAppBar from "../components/Header";
import { wrapper } from "../redux/redux-store";
import { productApi } from "../api/ProductApi";
import {
  addDataProducts,
  setErrorMessage,
} from "../redux/slices/product-reducer";

interface IMainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({
  children,
  title = "Edelweiss",
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/*@ts-ignore*/}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <PrimarySearchAppBar />
        {children}
      </main>
    </div>
  );
};
