import { instance } from "./UserApi";
import { IUserData } from "../redux/slices/ProductType";

export const authApi = {
  async login(loginDto: { phoneNumber: string; password: string }) {
    const data = await instance.post("/auth/login", loginDto);
    return data;
  },

  async register(registerDto) {
    const data = await instance.post("/auth/register", registerDto);
    return data;
  },

  async authorization(token: string) {
    console.log("authorization");
    const { data } = await instance.get<IUserData>("/auth/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  },
};
