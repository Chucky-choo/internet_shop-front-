import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppThunk } from '../redux-store';
import { Api } from '../../api/Api';
import { productToBasketDto } from '../../api/CartApi';
import { productToBasket } from '../Types/ProductType';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    counter: 0,
    data: null as productToBasket[],
  },
  reducers: {
    addCartData: (state, action: PayloadAction<productToBasket[] | null>) => {
      state.data = action.payload;
      state.counter++
    },
    deletePositions: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(el => el.idProduct !== action.payload);
    },
    addPositions: (state, action: PayloadAction<productToBasket>) => {
      if (!state.data) {
        state.data = [];
      }
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
  (dto: productToBasket): AppThunk =>
  async (dispatch, getState) => {
    const idUser = getState().user.userData?.id;
    if (idUser) {
      await Api().cart.addProductToCart({ ...dto, idUser });
    } else {
      
    }
    dispatch(addPositions(dto));
  };

export const pickUpFromTheCart =
  (dto: productToBasketDto): AppThunk =>
  async dispatch => {
    try {
      await Api().cart.pickUpFromTheBasket(dto);
      dispatch(deletePositions(dto.idProduct));
    } catch (e) {
      console.log(e);
    }
  };

export const cleanTheBasket =
  (idUser: number): AppThunk =>
  async dispatch => {
    try {
      const userData = await Api().user.cleanTheBasket(idUser);
      dispatch(addCartData(userData.cart));
    } catch (e) {
      console.log(e);
    }
  };
