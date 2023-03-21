import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { destroyCookie, setCookie } from 'nookies';
import { AppThunk } from '../redux-store';
import { IUserData } from '../Types/ProductType';
import { HYDRATE } from 'next-redux-wrapper';
import { Api } from '../../api/Api';
import nookies from 'nookies';
import { addCartData } from './cart-reducer';

export const initialAuthState = {
  userData: null as IUserData | null,
  error: null as string,
};

export const authSlice = createSlice({
  name: 'auth',
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
const thunkCreateUser = request => dto => async dispatch => {
  try {
    const response = await request(dto);
    const { token, userData } = response.data;

    dispatch(addUserData(userData));
    dispatch(setErrorMessage(null));
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return 'response';
  } catch (e) {
    dispatch(setErrorMessage(e.response.data.message));
    return 'error';
  }
};

export const getUserData = thunkCreateUser(Api().auth.login);
export const registerUser = thunkCreateUser(Api().auth.register);

export const toLogOut = (): AppThunk => async dispatch => {
  setCookie(null, 'token', null, {
    maxAge: -1,
    path: '/',
  });
  destroyCookie(null, 'token');
  dispatch(addUserData(null));
};

export const updateUserData =
  (id, dto): AppThunk =>
  async dispatch => {
    try {
      const data = await Api().user.update(id, dto);
      dispatch(addUserData(data));
    } catch (e) {
      console.error(e);
    }
  };
