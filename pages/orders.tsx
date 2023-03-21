import { NextPage } from 'next';
import { setOrdersData } from '../redux/slices/orders-reducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import React, { useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { EmptyCart } from '../components/cartComponents/emptyCart/EmptyCart';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const Orders: NextPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(store => store.user.userData);

  useEffect(() => {
    dispatch(setOrdersData(id));
  }, []);

  const { data } = useAppSelector(store => store.orders);
  console.log(data);

  return (
    <MainLayout title={'замовлення'}>
      {!data || data.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Typography variant='h4' align='center' sx={{ marginTop: 3 }}>
            Ваші замовлення
          </Typography>
          <div style={{ margin: '20px' }}>
            {data.map(({ id, cityName, comment, productsInOrder, status }) => {
              return (
                <div key={id}>
                  <div>
                    {productsInOrder.map(product => {
                      return <p key={product.id}>{product.name}</p>;
                    })}
                  </div>
                </div>
              );
            })}
            <Divider color='black' />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Orders;
