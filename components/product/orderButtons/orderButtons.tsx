import { NextPage } from "next";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addPositionsToCart } from "../../../redux/slices/cart-reducer";

interface IOrderButtons {
  idProduct: number;
}

export const OrderButtons: NextPage<IOrderButtons> = ({ idProduct }) => {
  const dispatch = useAppDispatch();

  const idUser = useAppSelector((store) => store.user.userData.id);
  const { data } = useAppSelector((store) => store.cart);

  const putInTheCart = () => {
    dispatch(addPositionsToCart({ idProduct, idUser }));
  };

  let isDisabled = false;
  data.forEach((item) => {
    if (item.id === idProduct) {
      isDisabled = true;
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button
        onClick={putInTheCart}
        disabled={isDisabled}
        color="secondary"
        variant="outlined"
      >
        Додати в кошик
      </Button>
      <Button color="secondary" variant="contained">
        Придбати в один клік
      </Button>
    </div>
  );
};
