import { wrapper } from '../../redux/redux-store';
import { fetchProduct } from '../../redux/slices/product-reducer';
import { Button } from '@mui/material';
import ProductInfo from '../../components/product/ProductInfo/ProductInfo';
import { MainLayout } from '../../layouts/MainLayout';
import { Pictures } from '../../components/product/pictures/Pictures';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addPositionsToCart } from '../../redux/slices/cart-reducer';
import { useState } from 'react';
import css from '../../styles/Product.module.scss';
import Popup from '../../components/Popup';
import Typography from '@mui/material/Typography';

export default function Product() {
  const dispatch = useAppDispatch();
  const { currentProduct, data } = useAppSelector(({ product, user, cart }) => ({
    ...product,
    idUser: user.userData?.id,
    ...cart,
  }));

  const { cover, photos, ...productInfo } = currentProduct;
  const photosArr = [{ id: 0, url: cover }, ...photos];

  const [selectedSize, setSelectedSize] = useState<null | string>(null);
  const [isOpenSizeReminder, setIsOpenSizeReminder] = useState(false);

  const putInTheCart = () => {
    if (!selectedSize) {
      setIsOpenSizeReminder(true);
      return;
    }

    dispatch(addPositionsToCart({ idProduct: currentProduct.id, size: selectedSize }));
  };

  return (
    <MainLayout title={productInfo.name}>
      <div className={css.root}>
        <Pictures photosArr={photosArr} />
        <ProductInfo
          {...productInfo}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={putInTheCart} color='secondary' variant='contained'>
          Додати в кошик
        </Button>
        {/*<Button color="secondary" variant="contained">*/}
        {/*  Придбати в один клік*/}
        {/*</Button>*/}
      </div>
      <Typography align='center' sx={{ margin: 2 }}>
        {currentProduct.description}
      </Typography>

      <Popup
        open={isOpenSizeReminder}
        onClose={() => setIsOpenSizeReminder(false)}
        title='Помилка'
        description='Спочатку неохідно обрати розмір'
      />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store =>
  // @ts-ignore
  async ({ params: { id: idProduct } }) => {
    // @ts-ignore
    await store.dispatch(fetchProduct(idProduct));
  }
);
