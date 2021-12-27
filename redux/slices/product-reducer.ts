import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICategory, Gender } from "./ProductType";
import { productApi } from "../../api/ProductApi";
import { HYDRATE } from "next-redux-wrapper";
import { ThunkAction } from "redux-thunk";
import { AppState, AppThunk } from "../redux-store";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null as IProduct[],
    error: null as string,
    currentProduct: null as IProduct,
    category: { gender: "woman" } as ICategory,
  },
  reducers: {
    addDataProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.data = action.payload;
    },
    addNewProduct: (state, action: PayloadAction<IProduct>) => {
      state.data.push(action.payload);
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setCurrentProduct: (state, action: PayloadAction<IProduct>) => {
      state.currentProduct = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.category.gender = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.product.data;
      state.currentProduct = action.payload.product.currentProduct;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewProduct,
  addDataProducts,
  setErrorMessage,
  setCurrentProduct,
  setGender,
} = productSlice.actions;

export default productSlice.reducer;

type actionType =
  | { payload: IProduct[]; type: string }
  | { payload: string; type: string };

//Thunks
export const getDataProducts = (): AppThunk => {
  return async (dispatch, getState) => {
    console.log(getState().product.data);
    if (!getState().product.data) {
      try {
        const data = await productApi.findAll();
        dispatch(addDataProducts(data));
      } catch (e) {
        dispatch(setErrorMessage(e.message));
      }
    }
  };
};

export const saveNewProduct = (newProductData, token) => async (dispatch) => {
  try {
    const newProduct = await productApi.create(newProductData, token);
    dispatch(addNewProduct(newProduct));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};

export const fetchProduct =
  (idProduct: any): AppThunk =>
  async (dispatch, getState) => {
    const dataProduct: IProduct[] = getState().product.data;
    let product = null;
    if (!dataProduct) {
      try {
        product = await productApi.findById(idProduct);
      } catch (e) {
        dispatch(setErrorMessage(e.response.data.message));
        return {
          notFound: true,
        };
      }
    } else {
      product = dataProduct.find((item) => item.id === +idProduct);
    }
    dispatch(setCurrentProduct(product));
  };
