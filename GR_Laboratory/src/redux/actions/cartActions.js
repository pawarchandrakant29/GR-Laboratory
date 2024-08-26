import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const FETCH_CART_ITEMS = "FETCH_CART_ITEMS";

export const addItemToCart = (item) => async (dispatch) => {
  try {
    const q = query(collection(db, "cartItems"), where("id", "==", item.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Item already in cart");
      return;
    }

    const docRef = await addDoc(collection(db, "cartItems"), item);
    console.log("Document written with ID: ", docRef.id);

    dispatch(fetchCartItems());
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const fetchCartItems = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "cartItems"));
    const cartItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch({
      type: FETCH_CART_ITEMS,
      payload: cartItems,
    });
  } catch (error) {
    console.error("Error fetching cart items: ", error);
  }
};

export const removeItemFromCart = (itemId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "cartItems", itemId));
    console.log("Document deleted with ID: ", itemId);
    dispatch(fetchCartItems());
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const CLEAR_CART = "CLEAR_CART";

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
