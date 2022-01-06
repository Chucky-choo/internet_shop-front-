import { IProduct, IUserData } from "../redux/slices/ProductType";
import { AxiosInstance } from "axios";

export interface IUserDataAndCart extends IUserData {
  cart: IProduct[];
}

export const authApi = (instance: AxiosInstance) => ({
  async login(loginDto: { phoneNumber: string; password: string }) {
    const data = await instance.post("/auth/login", loginDto);
    return data;
  },

  async register(registerDto) {
    const data = await instance.post("/auth/register", registerDto);
    return data;
  },

  async authorization() {
    const { data } = await instance.get<IUserDataAndCart>("/auth/profile");
    return data;
  },
});
