import { wrapper } from '../../redux/redux-store';
import { fetchProduct } from '../../redux/slices/product-reducer';
import { Button, Typography } from '@mui/material';
import style from '../../styles/Product.module.scss';
import ProductInfo from '../../components/product/ProductInfo/ProductInfo';
import { MainLayout } from '../../layouts/MainLayout';
import { Pictures } from '../../components/product/pictures/Pictures';
import { useAppSelector } from '../../redux/hooks';
import { OrderButtons } from '../../components/product/orderButtons/orderButtons';

export default function Product() {
  const { currentProduct } = useAppSelector(store => store.product);
  const idUser = useAppSelector(store => store.user.userData?.id);

  const { cover, photos, ...productInfo } = currentProduct;
  const photosArr = [{ id: 0, url: cover }, ...photos];

  return (
    <MainLayout title={productInfo.name}>
      <div className={style.root}>
        <Pictures photosArr={photosArr} />
        <ProductInfo {...productInfo} />
      </div>
      {idUser ? (
        <OrderButtons idProduct={currentProduct.id} idUser={idUser} />
      ) : (
        <Button variant='outlined'>Додати в кошик</Button>
      )}
      <Typography variant='h4' gutterBottom align='center'>
        Comments
      </Typography>
      {/*<Comments commentsArr={Product.comments}/>*/}
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
