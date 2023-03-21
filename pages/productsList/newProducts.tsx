import * as React from 'react';
import { Api } from '../../api/Api';
import { AdminWrapper } from '../../components/adminWrapper/AdminWrapper';
import CreateNewDish from '../../components/CreateNewDish/CreateNewDish';
import { ProductsList } from '../../components/ProductList';
import { MainLayout } from '../../layouts/MainLayout';
import { wrapper } from '../../redux/redux-store';
import { setErrorMessage } from '../../redux/slices/auth-reducer';
import { addDataProducts, setGender } from '../../redux/slices/product-reducer';

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

export const getServerSideProps = wrapper.getServerSideProps(store =>
  // @ts-ignore
  async () => {
    let { gender } = store.getState().product.category;
    try {
      const data = await Api().product.findAll({
        // filters: { gender },
        skip: 0,
        take: 20,
        order: { createdAt: 'DESC' },
      });
      store.dispatch(addDataProducts(data));
      // @ts-ignore
      store.dispatch(setGender(gender));
    } catch (e) {
      store.dispatch(setErrorMessage(e.message));
    }
  }
);
