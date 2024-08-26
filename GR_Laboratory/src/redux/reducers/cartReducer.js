import {
  ADD_ITEM_TO_CART,
  FETCH_CART_ITEMS,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
} from "../actions/cartActions";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      const totalAmount = action.payload.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
      return {
        ...state,
        cartItems: action.payload,
        totalAmount,
      };
    case ADD_ITEM_TO_CART:
      const newItem = action.payload;
      const updatedCartItemsAdd = [...state.cartItems, newItem];
      const updatedTotalAmountAdd = updatedCartItemsAdd.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        cartItems: updatedCartItemsAdd,
        totalAmount: updatedTotalAmountAdd,
      };
    case REMOVE_ITEM_FROM_CART:
      console.log("Removing item with id:", action.payload);
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      console.log("Updated cart items:", updatedCartItems);
      const updatedTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      console.log("Updated total amount:", updatedTotalAmount);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
