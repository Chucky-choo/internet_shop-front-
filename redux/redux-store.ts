import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-reducer";
import productReducer from "./slices/product-reducer";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
  },
});

const makeStore = (context: Context) => store;

export const wrapper = createWrapper<Store<AppStoreType>>(makeStore);

export type AppStoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
