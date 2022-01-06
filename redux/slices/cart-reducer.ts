import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IProduct } from "./ProductType";
import { AppThunk } from "../redux-store";
import { Api } from "../../api/Api";
import { productToBasketDto } from "../../api/CartApi";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null as IProduct[],
  },
  reducers: {
    addCartData: (state, action: PayloadAction<IProduct[] | null>) => {
      state.data = action.payload;
    },
    deletePositions: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((el) => el.id !== action.payload);
    },
    addPositions: (state, action: PayloadAction<IProduct>) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.cart.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartData, addPositions, deletePositions } = cartSlice.actions;

export default cartSlice.reducer;

//Thunks
export const addPositionsToCart =
  (dto: productToBasketDto): AppThunk =>
  async (dispatch) => {
    const product = await Api().cart.addProductToCart(dto);
    dispatch(addPositions(product));
  };

export const pickUpFromTheCart =
  (dto: productToBasketDto): AppThunk =>
  async (dispatch) => {
    try {
      await Api().cart.pickUpFromTheBasket(dto);
      dispatch(deletePositions(dto.idProduct));
    } catch (e) {
      console.log(e);
    }
  };
