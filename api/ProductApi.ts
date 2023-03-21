import { IProduct, photo } from '../redux/Types/ProductType';
import { AxiosInstance } from 'axios';

interface whereGetRequest {
  filters?: Object;
  take: number;
  skip?: number;
  order?: Object;
}

export const productApi = (instance: AxiosInstance) => ({
  async create(dto) {
    const { data } = await instance.post<IProduct>('/product', dto);
    return data;
  },
  async findAll(whereObj: whereGetRequest = { take: 20 }) {
    const { data } = await instance.post<IProduct[]>('/product/getFiltered', whereObj);
    console.log('request findAll', data);
    return data;
  },
  async findById(id) {
    const { data } = await instance.get<IProduct>(`/product/${id}`);
    console.log('request ById');
    return data;
  },
  async update(id, dto) {
    dto.salePrice = dto.salePrice ? dto.salePrice : null;
    const { data } = await instance.patch<IProduct>(`/product/${id}`, dto);
    return data;
  },
  async deleteById(id) {
    const { data } = await instance.delete(`/product/${id}`);
    return data;
  },
  async getPhotosProduct(id) {
    const { data } = await instance.get<photo[]>(`/product/photos/${id}`);
    return data;
  },
  async getDiscountList(gender) {
    const { data } = await instance.get<IProduct[]>(`/product/discounts/${gender}`);
    console.log(data);
    return data;
  },
});
