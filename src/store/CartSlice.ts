import {createSlice} from '@reduxjs/toolkit';

export interface cartStateType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

const initialState: cartStateType[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (
      state,
      action: {
        payload: cartStateType;
        type: string;
      },
    ) => {
      const existingProduct = state.find(
        (product: cartStateType) => product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.push(action.payload);
      }
    },
    removeProduct: (
      state,
      action: {
        payload: number;
        type: string;
      },
    ) => {
      return state.filter(
        (product: cartStateType) => product.id !== action.payload,
      );
    },
    increaseProductCount: (
      state,
      action: {
        payload: number;
        type: string;
      },
    ) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');

      const existingProduct = state.find(
        (product: cartStateType) => product.id === action.payload,
      );
      console.log('====================================');
      console.log(existingProduct, 'existingProduct');
      console.log('====================================');
      if (existingProduct) {
        existingProduct.quantity++;
      }
    },
    decreaseProductCount: (
      state,
      action: {
        payload: number;
        type: string;
      },
    ) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');
      const existingProduct = state.find(
        (product: cartStateType) => product.id === action.payload,
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
  },
});

export default cartSlice.reducer;

export const {
  addProduct,
  removeProduct,
  increaseProductCount,
  decreaseProductCount,
} = cartSlice.actions;
