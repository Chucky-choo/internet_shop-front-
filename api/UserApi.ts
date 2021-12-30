import axios from "axios";

interface IRegisterUserDto {
  fullName: string;
  email?: string;
  password: string;
  phoneNumber: string;
  basketId?: number;
}

export const userApi = (instance) => ({
  async register(dto: IRegisterUserDto) {
    const { data } = await instance.post("/users", dto);
    return data;
  },
  async getUsers() {
    const { data } = await instance.get("/users");
    return data;
  },
});
