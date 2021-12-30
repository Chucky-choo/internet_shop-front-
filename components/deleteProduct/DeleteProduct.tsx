import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { Api } from "../../api/Api";
import { useAppSelector } from "../../redux/hooks";
import { Role } from "../../redux/slices/ProductType";

interface IDeleteProductProps {
  id: number | undefined;
}

export const DeleteProduct: NextPage<IDeleteProductProps> = ({ id }) => {
  const deleteProduct = () => {
    Api().product.deleteById(id);
  };
  return (
    <Button variant="outlined" color="error" onClick={deleteProduct}>
      Delete this product
    </Button>
  );
};
