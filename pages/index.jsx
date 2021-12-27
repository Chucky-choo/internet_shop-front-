import { ProductList } from "../components/ProductList/ProductList";
import {
  addDataProducts,
  setErrorMessage,
} from "../redux/slices/product-reducer";
import { productApi } from "../api/ProductApi";
import { wrapper } from "../redux/redux-store";
import { MainLayout } from "../layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <ProductList />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // @ts-ignore
  (store) => async (cnx) => {
    let dataProduct = store.getState().product.data;
    if (dataProduct === null) {
      try {
        dataProduct = await productApi.findAll();
        store.dispatch(addDataProducts(dataProduct));
      } catch (e) {
        store.dispatch(setErrorMessage(e.message));
      }
    }
  }
);
