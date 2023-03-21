import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IProduct } from '../Types/ProductType';
import { AppThunk } from '../redux-store';
import { Api } from '../../api/Api';
import { productToBasketDto } from '../../api/CartApi';
import { Order } from '../Types/orderType';

export const cartSlice = createSlice({
  name: 'orders',
  initialState: {
    data: null as Order[],
  },
  reducers: {
    addOrdersData: (state, action: PayloadAction<Order[] | null>) => {
      state.data = action.payload;
    },
    // addPositions: (state, action: PayloadAction<IProduct>) => {
    //   state.data.push(action.payload);
    // },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.orders.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrdersData } = cartSlice.actions;

export default cartSlice.reducer;

//Thunks
export const setOrdersData = dto => async dispatch => {
  const product = await Api().orders.getOrdersUser(dto);
  dispatch(addOrdersData(product));
};

// export const pickUpFromTheCart =
//   (dto: productToBasketDto): AppThunk =>
//   async (dispatch) => {
//     try {
//       await Api().cart.pickUpFromTheBasket(dto);
//       dispatch(deletePositions(dto.idProduct));
//     } catch (e) {
//       console.log(e);
//     }
//   };
