export interface IUserData {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updateAt: string;
  roles: IRole[];
}

export interface IProduct {
  id: number;
  name: string;
  cover: string;
  size: string;
  color: string;
  count: number;
  description: string;
  weight: string;
  material: string;
  price: number;
  salePrice: number;
}

export type photo = {
  id: number;
  url: string;
};

export interface currentProduct extends IProduct {
  photos: photo[];
}

export enum Gender {
  Man = 'man',
  Woman = 'woman',
}

export interface ICategory {
  gender: Gender;
}

export enum Role {
  admin = 'ADMIN',
  user = 'USER',
}

export interface IRole {
  id: number;
  value: Role;
  description: string;
}
