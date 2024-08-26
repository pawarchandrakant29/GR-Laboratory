import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/config";
import Header from "./Header";

const CartPage = () => {
  const db = getFirestore(app);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const homet = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const billtrans = (e) => {
    e.preventDefault();
    navigate("/check");
  };

  useEffect(() => {
    const fetchCartItemsFromDB = async () => {
      const cartItemsSnapshot = await getDocs(collection(db, "cartItems"));
      const cartItemsData = cartItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    fetchCartItemsFromDB();
  }, [db]);

  useEffect(() => {
    const storedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    const initialQuantities = {};
    let initialTotal = 0;

    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        const itemQuantity = storedQuantities[item.id] || item.quantity || 1;
        initialQuantities[item.id] = itemQuantity;
        initialTotal += item.price * itemQuantity;
      });

      setQuantities(initialQuantities);
      setTotalAmount(initialTotal);
    }
  }, [cartItems]);

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, "cartItems", itemId));
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[itemId];
        localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
        return updatedQuantities;
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedQuantity = parseInt(quantity, 10);
    const item = cartItems.find((item) => item.id === itemId);
    const difference = item.price * (updatedQuantity - quantities[itemId]);

    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [itemId]: updatedQuantity,
      };
      localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });

    setTotalAmount((prevTotal) => prevTotal + difference);
  };

  return (
    <>
      <Header />
      <div className="cart-page position-relative mt-set2">
        <div className="position-absolute end-0 me-3">
          <button className="set-6" onClick={homet}>
            ❌
          </button>
        </div>
        <h1 className="cart-title">Test's Cart</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-table">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>₹ {item.price}</td>
                      <td>
                        <select
                          value={quantities[item.id]}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                          className="quantity-select"
                        >
                          {[...Array(10).keys()].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-amount">
                <h2>Total Amount: ₹ {totalAmount}</h2>
              </div>
            </div>
            <div className="btn-end">
              <button className="checkout-btn" onClick={billtrans}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
