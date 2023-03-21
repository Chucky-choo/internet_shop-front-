import { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import React, { useEffect } from 'react';
import { setOrdersData } from '../redux/slices/orders-reducer';
import { MainLayout } from '../layouts/MainLayout';
import { EmptyCart } from '../components/cartComponents/emptyCart/EmptyCart';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const News: NextPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(store => store.user.userData);

  useEffect(() => {
    dispatch(setOrdersData(id));
  }, []);

  const { data } = useAppSelector(store => store.orders);
  console.log(data);

  return (
    <MainLayout title={'новини і відгуки'}>
      {!data || data.length === 0 ? <EmptyCart /> : <div>test</div>}
    </MainLayout>
  );
};

export default News;
