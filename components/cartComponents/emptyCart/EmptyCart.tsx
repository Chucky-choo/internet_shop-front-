import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button } from "@mui/material";
import * as React from "react";

export const EmptyCart: NextPage = () => {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{ marginTop: 1, color: "gray" }}
      >
        Корзина поки що пуста 😿
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", margin: 25 }}>
        <Link href={"/"}>
          <a>
            <Button color="secondary" variant="contained">
              повернутись на головну
            </Button>
          </a>
        </Link>
      </div>
    </>
  );
};
