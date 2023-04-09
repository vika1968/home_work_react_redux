import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CartItem {
  _id: string;
  rname: string;
  imgdata: string;
  address: string;
  delimg: string;
  somedata: string;
  price: number;
  rating: string;
  arrimg: string;
  qnty: number;
}

export interface CartState {
  carts: CartItem[];
}

const initialState: CartState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    Add_Cart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.carts.findIndex((item) => item._id == action.payload._id);
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      }
      else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts.push(temp);
      }
    },

    Remove_Cart: (state, action: PayloadAction<CartItem>) => {    
      const data = state.carts.filter((element) => element._id !== action.payload._id );
      state.carts = data;      
    },

    Remove_Portion: (state, action: PayloadAction<CartItem>) => {
      const itemIndexDec = state.carts.findIndex((item) => item._id === action.payload._id);

      if (state.carts[itemIndexDec].qnty >= 2) {
        const dltItems = state.carts[itemIndexDec].qnty! -= 1;
        state.carts[itemIndexDec].qnty = dltItems;
      } else if (state.carts[itemIndexDec].qnty === 1) {
        const data = state.carts.filter((el) => el._id !== action.payload._id);
        state.carts = data;
      }    
    },
  },
});

export const { Add_Cart, Remove_Cart, Remove_Portion } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart.carts;
export default cartSlice.reducer;