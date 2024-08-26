import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { clearCart } from "../../redux/actions/cartActions"; // Import the clearCart action
import "./Checkout.css";
import Header from "./Header";

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "");

      const limited = cleaned.slice(0, 16);

      const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ");

      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderId = generateOrderId();
      const orderData = {
        ...formData,
        paymentMethod,
        items: cartItems,
        totalAmount,
        createdAt: new Date(),
        orderId,
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order added with ID: ", docRef.id);

      dispatch(clearCart());

      navigate("/", { state: { transdata: true } });
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 mt-set2 pt-5">
        <h2 className="mb-4 clr-set mt-3"></h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Billing Address Section */}
            <div className="col-md-6">
              <h4 className="mb-3 clr-set">Billing Address</h4>
              <div className="form-group mb-3">
                <label htmlFor="fullName" className="clr-set">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="address" className="clr-set">
                  Address
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  required
                />
              </div>
              <div className="d-flex ">
                <div className="form-group mb-3 w-50">
                  <label htmlFor="Phone" className="clr-set">
                    Mobile No
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="Phone"
                    name="Phone"
                    value={formData.no}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3 ms-2 w-50">
                  <label htmlFor="city" className="clr-set">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="col-md-6 w-50 mb-3">
                  <label htmlFor="state" className="clr-set">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3 ms-2 pe-2">
                  <label htmlFor="zip" className="clr-set">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="col-md-6">
              <h4 className="mb-3 clr-set">Payment</h4>
              <div className="form-group mb-3">
                <label htmlFor="paymentMethod" className="clr-set">
                  Payment Method
                </label>
                <select
                  className="form-control"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {/* UPI Payment Option */}
              {paymentMethod === "upi" && (
                <div className="form-group mb-3 ms-5 ps-5">
                  <div className="">
                    <label htmlFor="upiQrCode" className="clr-set ms-set">
                      Scan QR Code
                    </label>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/upi.png?alt=media&token=3d006c1c-b8c3-4773-b00f-60898c34427e"
                      alt="UPI QR Code"
                      className="img-fluid qr-img"
                    />
                  </div>
                </div>
              )}

              {/* Card Payment Option */}
              {paymentMethod === "card" && (
                <>
                  <div className="form-group mb-3">
                    <label htmlFor="cardName" className="clr-set">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="cardNumber" className="clr-set">
                      Credit / Debit Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      maxLength={19}
                      pattern="\d{4} \d{4} \d{4} \d{4}"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div className="d-flex ">
                    <div className="form-group mb-3 col-4">
                      <label htmlFor="expMonth" className="clr-set">
                        Expiry Month
                      </label>
                      <select
                        className="form-control"
                        id="expMonth"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div className="form-group mb-3 ms-2 col-4">
                      <label htmlFor="expYear" className="clr-set">
                        Expiry Year
                      </label>
                      <select
                        className="form-control"
                        id="expYear"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mb-3 ms-2 col">
                      <label htmlFor="cvv" className="clr-set">
                        CVV
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        maxLength={3}
                        pattern="\d{3}"
                        title="CVV must be a 3-digit number"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Cash on Delivery Option */}
              {paymentMethod === "cod" && (
                <div className="form-group mb-3">
                  <div className="mt-3 w-100">
                    <div className="alert alert-info w-100">
                      <p>
                        You have chosen Cash on Delivery (COD). Please make sure
                        you have the exact amount ready when your order arrives.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
