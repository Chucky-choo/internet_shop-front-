import axios from "axios";
import { instance } from "./UserApi";
import { IProduct } from "../redux/slices/ProductType";

export const productApi = {
  async create(dto, token) {
    const { data } = await instance.post<IProduct>("/product", dto, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  },
  async findAll() {
    const { data } = await instance.get<IProduct[]>("/product");
    console.log("request findAll");
    return data;
  },
  async findById(id) {
    const { data } = await instance.get<IProduct>(`/product/${id}`);
    console.log("request ById");
    return data;
  },
};
