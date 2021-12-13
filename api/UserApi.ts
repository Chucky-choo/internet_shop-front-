import axios from "axios";

interface IRegisterUserDto {
  fullName: string;
  email?: string;
  password: string;
  phoneNumber: string;
  basketId?: number;
}

export const instance = axios.create({
  baseURL: "http://localhost:7777",
});

export const userApi = {
  async register(dto: IRegisterUserDto) {
    const { data } = await instance.post("/users", dto);
    return data;
  },
  async getUsers() {
    const { data } = await instance.get("/users");
    return data;
  },
};
