import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { authApi } from "../../api/authApi";
import { AppThunk } from "../redux-store";
import { IUserData } from "./ProductType";
import { HYDRATE } from "next-redux-wrapper";

export const initialAuthState = {
  userData: null as IUserData | null,
  error: null as string,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialAuthState,
  },
  reducers: {
    addUserData: (state, action: PayloadAction<IUserData | null>) => {
      state.userData = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.userData = action.payload.user.userData;
    },
  },
});

export const { addUserData, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;

// Thunks
const thunkCreateUser = (request) => (dto) => async (dispatch) => {
  try {
    const userData = await request(dto);
    dispatch(addUserData(userData.data));
    dispatch(setErrorMessage(null));

    // Set
    setCookie(null, "token", userData.data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    const cookies = parseCookies();
    console.log(cookies.token);

    return "response";
  } catch (e) {
    dispatch(setErrorMessage(e.response.data.message));
    return "error";
  }
};

export const getUserData = thunkCreateUser(authApi.login);
export const registerUser = thunkCreateUser(authApi.register);

export const toLogOut = (): AppThunk => async (dispatch) => {
  destroyCookie(null, "token");
  dispatch(addUserData(null));
};
