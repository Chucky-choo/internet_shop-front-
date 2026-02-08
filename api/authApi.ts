import { IUserData, productToBasket } from '../redux/Types/ProductType';
import { AxiosInstance } from 'axios';

export interface IUserDataAndCart extends IUserData {
  cart: productToBasket[];
}

export const authApi = (instance: AxiosInstance) => ({
  async login(loginDto: { phoneNumber: string; password: string }) {
    const data = await instance.post('/auth/login', loginDto);
    console.log('/auth/login', data)
    return data;
  },

  async register(registerDto) {
    const data = await instance.post('/auth/register', registerDto);
    return data;
  },

  async authorization() {
    const { data } = await instance.get<IUserDataAndCart>('/auth/profile');
    console.log('/auth/profile', data)
    return data;
  },
});
