import { instance } from "./UserApi";

export const authApi = {
  async login(loginDto: { phoneNumber: string; password: string }) {
    const data = await instance.post("/auth/login", loginDto);
    return data;
  },

  async register(registerDto) {
    const data = await instance.post("/auth/register", registerDto);
    return data;
  },
};
