import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./myorder.css";
import Header from "./Header";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setOrders(orders.filter((order) => order.id !== id));
      alert("Order successfully deleted.");
    } catch (error) {
      console.error("Error deleting order: ", error);
      alert("Failed to delete the order.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-set2">
        <h3 className="clr-set mb-3">My Orders</h3>
        {orders.length === 0 ? (
          <p className="no-data-message">No data found</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h4 className="clr-set">Order Id: {order.orderId}</h4>
                <p>
                  <strong>Name :</strong> {order.fullName}
                </p>
                <p>
                  <strong>Phone :</strong> {order.Phone}
                </p>
                <p>
                  <strong>Address :</strong> {order.address}
                </p>
                <p>
                  <strong>Tests :</strong>
                </p>
                <ul>
                  {order.items.map((item, index) => (
                    <li className="clr-set" key={index}>
                      {item.title}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total Price :</strong> ₹ {order.totalAmount}
                </p>
                <p>
                  <strong>Payment :</strong>
                  <span className="upr-set"> {order.paymentMethod}</span>
                </p>
                <button
                  className="btn-delete mt-2 w-100"
                  onClick={() => handleDelete(order.id)}
                >
                  CANCEL
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderCard;
