import { NextPage } from 'next';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addPositionsToCart } from '../../../redux/slices/cart-reducer';
import { useEffect, useState } from 'react';

interface IOrderButtons {
  idProduct: number;
  idUser: number | undefined;
}

export const OrderButtons: NextPage<IOrderButtons> = ({ idProduct, idUser }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.cart);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (data) {
      data.forEach(item => {
        if (item.id === idProduct) {
          setIsDisabled(true);
        }
      });
    }
  }, []);

  const putInTheCart = () => {
    dispatch(addPositionsToCart({ idProduct, idUser }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button onClick={putInTheCart} disabled={isDisabled} color='secondary' variant='outlined'>
        Додати в кошик
      </Button>
      {/*<Button color="secondary" variant="contained">*/}
      {/*  Придбати в один клік*/}
      {/*</Button>*/}
    </div>
  );
};
