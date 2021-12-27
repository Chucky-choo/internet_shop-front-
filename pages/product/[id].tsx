import { useAppSelector } from "../../redux/hooks";
import { wrapper } from "../../redux/redux-store";
import { IProduct } from "../../redux/slices/ProductType";
import { productApi } from "../../api/ProductApi";
import {
  fetchProduct,
  setErrorMessage,
} from "../../redux/slices/product-reducer";
import { setCurrentProduct } from "../../redux/slices/product-reducer";
import { Typography } from "@mui/material";
import style from "../../styles/Product.module.scss";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import { MainLayout } from "../../layouts/MainLayout";

export default function Product() {
  const currentProduct = useAppSelector(
    (store) => store.product.currentProduct
  );
  const { photos, ...productInfo } = currentProduct;

  return (
    <MainLayout title={productInfo.name}>
      <div className={style.root}>
        <img className={style.img} src={photos} alt="" />
        <div className={style.info}>
          <ProductInfo {...productInfo} />
          {/*<EditDish initialValues={product}/>*/}
        </div>
      </div>
      <Typography variant="h4" gutterBottom align="center">
        Comments
      </Typography>
      {/*<Comments commentsArr={Product.comments}/>*/}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const idProduct = params.id;
      const dataProduct: IProduct[] = store.getState().product.data;

      let product = null;
      if (!dataProduct) {
        try {
          product = await productApi.findById(idProduct);
        } catch (e) {
          store.dispatch(setErrorMessage(e.response.data.message));
          return {
            notFound: true,
          };
        }
      } else {
        product = dataProduct.find((item) => item.id === +idProduct);
      }
      store.dispatch(setCurrentProduct(product));
    }
);
