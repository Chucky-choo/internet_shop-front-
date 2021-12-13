export interface IUserData {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updateAt: string;
}

export interface IProduct {
  id: number;
  name: string;
  photos: string;
  size: string;
  color: string;
  material: string;
  price: number;
  salePrice: number;
}
