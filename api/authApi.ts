import { IUserData } from "../redux/slices/ProductType";
import { AxiosInstance } from "axios";

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
    // @ts-ignore
    console.log("authorization", instance.defaults.headers.Authorization);
    const { data } = await instance.get<IUserData>("/auth/profile");
    return data;
  },
});
