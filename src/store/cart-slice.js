import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        _id: null,
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state._id = action.payload._id;
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id)
            state.totalQuantity++;
            state.changed = true;
            if(!existingItem) {
                state.items.push({
                    _id: newItem._id,
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const _id = action.payload;
            const existingItem = state.items.find(item => item._id === _id);
            state.totalQuantity--;
            state.changed = true;
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item._id !== _id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions

export default cartSlice;