import axios from "axios";
import { instance } from "./UserApi";

export const productApi = {
  async create(dto) {
    try {
      const { data } = await instance.post("/product", dto);
      return data;
    } catch (e) {
      console.log(e.message);
    }
  },
  async findAll() {
    const { data } = await instance.get("/product");
    console.log("request");
    return data;
  },
};
