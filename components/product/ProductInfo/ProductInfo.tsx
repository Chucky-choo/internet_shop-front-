import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { NextPage } from 'next';
import { PriceBox } from '../../PriceBox/PriceBox';
import { DeleteProduct } from '../../deleteProduct/DeleteProduct';
import { UpdateProduct } from '../../updateProduct/updateProduct';
import { AdminWrapper } from '../../adminWrapper/AdminWrapper';
import style from '../../../styles/Product.module.scss';
import css from '../../../styles/info.module.scss';

interface IProductInfo {
  id: number;
  name: string;
  size: string;
  color: string;
  material: string;
  price: number;
  count: number;
  weight: string;
  description: string;
  salePrice: number;
  selectedSize: number | string;
  setSelectedSize: Dispatch<SetStateAction<null | string>>;
}

const ProductInfo: NextPage<IProductInfo> = props => {
  const { name, price, salePrice, id, ...infoDataProduct } = props;

  const sizes = infoDataProduct.size.split(' ').filter(el => el);

  return (
    <div className={style.info}>
      <Typography align='center' noWrap gutterBottom variant='h4' component='h3' sx={{ mb: 0 }}>
        {name}
      </Typography>
      <Typography className={css.subtitle_tiny} sx={{ paddingBottom: 2 }}>
        Артикул: {id}
      </Typography>
      <Typography>РОЗМІР</Typography>
      <ButtonGroup aria-label='Basic button group'>
        {sizes.map(size => (
          <Button
            key={size}
            variant={props.selectedSize === size ? 'contained' : 'outlined'}
            onClick={() => props.setSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
      </ButtonGroup>
      <PriceBox price={price} salePrice={salePrice} />
      <AdminWrapper>
        <DeleteProduct id={+id} />
        <UpdateProduct idProduct={+id} />
      </AdminWrapper>
    </div>
  );
};
export default ProductInfo;
