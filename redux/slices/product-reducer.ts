import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./ProductType";
import { productApi } from "../../api/ProductApi";
import { HYDRATE } from "next-redux-wrapper";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null as IProduct[],
    error: null as string,
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.product.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewProduct, addDataProducts, setErrorMessage } =
  productSlice.actions;

export default productSlice.reducer;

//Thunks
export const getDataProducts = () => async (dispatch) => {
  try {
    const data = await productApi.findAll();
    dispatch(addDataProducts(data));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};

export const saveNewProduct = (newProductData) => async (dispatch) => {
  try {
    const newProduct = await productApi.create(newProductData);
    dispatch(addNewProduct(newProduct));
  } catch (e) {
    dispatch(setErrorMessage(e.message));
  }
};
