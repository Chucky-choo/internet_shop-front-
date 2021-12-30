import { IProduct } from "../redux/slices/ProductType";
import { AxiosInstance } from "axios";

export const productApi = (instance: AxiosInstance) => ({
  async create(dto) {
    const { data } = await instance.post<IProduct>("/product", dto);
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
  async update(id, dto) {
    const { data } = await instance.patch<IProduct>(`/product/${id}`, dto);
    return data;
  },
  async deleteById(id) {
    const { data } = await instance.delete(`/product/${id}`);
    return data;
  },
});
