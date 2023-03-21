import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, ICategory, Gender, currentProduct, photo } from '../Types/ProductType';
import { HYDRATE } from 'next-redux-wrapper';
import { AppThunk } from '../redux-store';
import { Api } from '../../api/Api';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: null as IProduct[],
    error: null as string,
    currentProduct: null as currentProduct,
    category: { gender: 'woman' } as ICategory,
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
    setCurrentProduct: (state, action: PayloadAction<currentProduct>) => {
      state.currentProduct = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      console.log('GENDER', action.payload);
      state.category.gender = action.payload;
    },
    getPhotosProduct: (state, action: PayloadAction<photo[]>) => {
      state.currentProduct.photos = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.data = action.payload.product.data;
      state.currentProduct = action.payload.product.currentProduct;
      state.category.gender = action.payload.product.category.gender;
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
  getPhotosProduct,
} = productSlice.actions;

export default productSlice.reducer;

type actionType = { payload: IProduct[]; type: string } | { payload: string; type: string };

//Thunks
export const saveNewProduct = newProductData => async dispatch => {
  try {
    const newProduct = await Api().product.create(newProductData);
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
        product = await Api().product.findById(idProduct);
      } catch (e) {
        dispatch(setErrorMessage(e.response.data.message));
        return {
          notFound: true,
        };
      }
    } else {
      product = dataProduct.find(item => item.id === +idProduct);
    }
    dispatch(setCurrentProduct(product));
    try {
      const photos = await Api().product.getPhotosProduct(+idProduct);
      dispatch(getPhotosProduct(photos));
    } catch (e) {
      console.log('error photos');
    }
  };
