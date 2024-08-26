import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actions/cartActions";
import "./Test.css";
import Header from "./Header";

const LabTestCards = () => {
  const [labTests, setLabTests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLabTests = async () => {
      const querySnapshot = await getDocs(collection(db, "labTests"));
      const tests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLabTests(tests);
    };

    fetchLabTests();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || "All";
    setSelectedCategory(category);
  }, [location]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredLabTests =
    selectedCategory === "All"
      ? labTests
      : labTests.filter((test) => test.category === selectedCategory);

  const handleAddToCart = async (test) => {
    const q = query(collection(db, "cartItems"), where("id", "==", test.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setNotification("This item is already in your cart!");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    dispatch(addItemToCart(test));
    setNotification("Item added to cart successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <Header />
      {notification && <div className="notification">{notification}</div>}
      <div className="container mt-5 pt-5">
        <div className="filter-section mt-3">
          <label className="clr-set fs-4">Filter by category :</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Tests</option>
            {[...new Set(labTests.map((test) => test.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div className="lab-test-cards">
          <div className="card-grid">
            {filteredLabTests.map((test) => (
              <div key={test.id} className="lab-test-card p-3">
                <h3>{test.title}</h3>
                <p className="text-dark fs-4 mb-2 fw-semibold">
                  ₹ {test.price}
                </p>
                <div className="d-flex mb-2 justify-content-between">
                  {test.homeVisit && <span>🏠 Home Collection</span>}
                  {test.labVisit && <span>🔬 Lab Visit</span>}
                </div>
                <div className="mb-2">
                  {test.maleOption && <span className="pe-2">👨 Male</span>}
                  {test.femaleOption && <span className="pe-2">👩 Female</span>}
                  {test.childOption && <span className="pe-2">🧒 Child</span>}
                </div>
                <div className="pt-1">
                  <button
                    className="btn-cart"
                    onClick={() => handleAddToCart(test)}
                  >
                    Add to cart
                  </button>
                  <a href="#">Know More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabTestCards;
