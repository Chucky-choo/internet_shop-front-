import { Action, configureStore, Store, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-reducer";
import productReducer from "./slices/product-reducer";
import { createWrapper, Context } from "next-redux-wrapper";
import cartReducer from "./slices/cart-reducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
    cart: cartReducer,
  },
});

const makeStore = (context: Context) => store;

export const wrapper = createWrapper<Store<AppState>>(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
