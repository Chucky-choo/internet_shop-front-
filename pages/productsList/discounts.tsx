import { MainLayout } from '../../layouts/MainLayout';
import { wrapper } from '../../redux/redux-store';
import { addDataProducts, setErrorMessage, setGender } from '../../redux/slices/product-reducer';
import { AdminWrapper } from '../../components/adminWrapper/AdminWrapper';
import CreateNewDish from '../../components/CreateNewDish/CreateNewDish';
import { ProductsList } from '../../components/ProductList';
import { Api } from '../../api/Api';
import * as React from 'react';

export default function DiscountsProductsList() {
  return (
    <MainLayout>
      <AdminWrapper>
        <CreateNewDish />
      </AdminWrapper>
      <ProductsList />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store =>
  // @ts-ignore
  async () => {
    let { gender } = store.getState().product.category;
    try {
      const data = await Api().product.getDiscountList(gender);
      console.log(data);
      store.dispatch(addDataProducts(data));
      // @ts-ignore
      store.dispatch(setGender(gender));
    } catch (e) {
      store.dispatch(setErrorMessage(e.message));
    }
  }
);
