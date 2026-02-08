import { AxiosInstance } from 'axios';
import { IProduct } from '../redux/Types/ProductType';
import { IUserDataAndCart } from './authApi';

export type productToBasketDto = {
  idUser: number;
  idProduct: number;
  size: string
};

export const cartApi = (instance: AxiosInstance) => ({
  async addProductToCart(dto: productToBasketDto) {
    const { data } = await instance.patch<IProduct>('users/addProduct', dto);
    return data;
  },
  async pickUpFromTheBasket(dto: productToBasketDto) {
    const { data } = await instance.patch<IUserDataAndCart>('users/pickUpFromTheBasket', dto);
    return data;
  },
});
