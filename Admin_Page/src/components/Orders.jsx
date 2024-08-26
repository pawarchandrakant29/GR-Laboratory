// OrderCard.js
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import "./check.css";
import AdminHeader from "./HeaderAdmin";
import CompleteButton from "./CompleteButton";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editOrder, setEditOrder] = useState({});

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
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await updateDoc(doc(db, "orders", id), editOrder);
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, ...editOrder } : order
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating order: ", error);
    }
  };

  const handleEditClick = (order) => {
    setEditMode(order.id);
    setEditOrder(order);
  };

  const handleChange = (e) => {
    setEditOrder({
      ...editOrder,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="container mt-4">
        <h3 className="clr-set mb-3">Order's</h3>
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4 className="clr-set">Order Id: {order.orderId}</h4>
              {editMode === order.id ? (
                <>
                  <label className="text-white fw-semibold">
                    Name:
                    <input
                      type="text"
                      name="fullName"
                      value={editOrder.fullName || ""}
                      onChange={handleChange}
                      className="ms-2 w-75"
                    />
                  </label>
                  <label className="text-white mt-2 fw-semibold">
                    Phone:
                    <input
                      type="text"
                      name="Phone"
                      value={editOrder.Phone || ""}
                      onChange={handleChange}
                      className="ms-2 w-75"
                    />
                  </label>
                  <div>
                    <label className="text-white fw-semibold mt-2">
                      Address :{" "}
                    </label>
                  </div>
                  <textarea
                    type="text"
                    name="address"
                    value={editOrder.address || ""}
                    onChange={handleChange}
                    className="mt-2 mb-2 w-100"
                    rows={3}
                  />

                  <label className="text-white fw-semibold">
                    Total Price :
                    <input
                      type="text"
                      name="totalAmount"
                      value={editOrder.totalAmount || ""}
                      onChange={handleChange}
                      className="w-25 ms-2"
                    />
                  </label>
                  {/* Handle items as well if needed */}
                  <div className="mt-3">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(order.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn-delete ms-2"
                      onClick={() => setEditMode(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>Name : </strong> {order.fullName}
                  </p>
                  <p>
                    <strong>Phone : </strong> {order.Phone}
                  </p>
                  <p>
                    <strong>Address : </strong> {order.address}
                  </p>
                  <p>
                    <strong>Tests : </strong>
                  </p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index} className="clr-set">
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Total Price : </strong> ₹ {order.totalAmount}
                  </p>
                  <p>
                    <strong>Payment : </strong>{" "}
                    <span className="upr-set"> {order.paymentMethod}</span>
                  </p>
                  <div className="mt-2">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete ms-2"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
