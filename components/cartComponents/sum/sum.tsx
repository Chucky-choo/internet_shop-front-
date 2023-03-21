import { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { IProduct } from '../../../redux/Types/ProductType';

interface ISumProps {
  data: IProduct[];
}

export const Sum: NextPage<ISumProps> = ({ data }) => {
  console.log('Sum');
  return (
    <>
      <Typography variant='h5' align='center' sx={{ marginTop: 1, color: 'gray' }}>
        СУМА ДО ОПЛАТИ ЗА ТОВАР
      </Typography>
      <Typography variant='h6' align='center' sx={{ marginTop: 1 }}>
        {data.reduce(
          (sum, product) => (product.salePrice ? product.salePrice + sum : product.price + sum),
          0
        )}{' '}
        грн
      </Typography>
    </>
  );
};
