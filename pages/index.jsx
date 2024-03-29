import { ProductsList } from '../components/ProductList';
import { addDataProducts, setErrorMessage } from '../redux/slices/product-reducer';
import { wrapper } from '../redux/redux-store';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../api/Api';
import { AdminWrapper } from '../components/adminWrapper/AdminWrapper';
import CreateNewDish from '../components/CreateNewDish/CreateNewDish';
import * as React from 'react';

export default function Home() {
  return (
    <MainLayout>
      <AdminWrapper>
        <CreateNewDish />
      </AdminWrapper>
      <ProductsList />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async cnx => {
  let dataProduct = store.getState().product.data;
  if (!dataProduct) {
    try {
      dataProduct = await Api(cnx).product.findAll();
      store.dispatch(addDataProducts(dataProduct));
    } catch (e) {
      store.dispatch(setErrorMessage(e.message));
    }
  }
});
