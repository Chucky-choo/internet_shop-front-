import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseCookies, setCookie } from "nookies";
import { authApi } from "../../api/authApi";
import { IUserData } from "./ProductType";

export const initialAuthState = {
  userData: null as IUserData | null,
  token: null as string | null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialAuthState,
    error: null as string,
  },
  reducers: {
    addUserData: (state, action: PayloadAction<typeof initialAuthState>) => {
      state.userData = action.payload.userData;
      console.log(action.payload.userData);
      state.token = action.payload.token;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserData, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;

// Thunks
const thunkCreateUser = (request) => (dto) => async (dispatch) => {
  try {
    const userData = await request(dto);
    dispatch(addUserData(userData.data));
    dispatch(setErrorMessage(null));
    const cookies = parseCookies();
    console.log({ cookies });

    // Set
    setCookie(null, "token", userData.data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return "response";
  } catch (e) {
    dispatch(setErrorMessage(e.response.data.message));
    return "error";
  }
};

export const getUserData = thunkCreateUser(authApi.login);

export const registerUser = thunkCreateUser(authApi.register);
