import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import "./Test.css";
import AdminHeader from "./HeaderAdmin";

const categories = [
  "Kidney Profile",
  "Vitamin Profile",
  "Thyroid Profile",
  "Iron Deficiency Profile",
  "Liver Profile",
  "Diabetes Screen",
  "Covid Profile",
];

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [maleOption, setMaleOption] = useState(false);
  const [femaleOption, setFemaleOption] = useState(false);
  const [childOption, setChildOption] = useState(false);
  const [homeVisit, setHomeVisit] = useState(false);
  const [labVisit, setLabVisit] = useState(false);
  const [category, setCategory] = useState("");
  const [labTests, setLabTests] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const docRef = doc(db, "labTests", editId);
        await updateDoc(docRef, {
          title,
          price: parseFloat(price),
          maleOption,
          femaleOption,
          childOption,
          homeVisit,
          labVisit,
          category,
        });
        alert("Lab test updated successfully!");
      } else {
        await addDoc(collection(db, "labTests"), {
          title,
          price: parseFloat(price),
          maleOption,
          femaleOption,
          childOption,
          homeVisit,
          labVisit,
          category,
        });
        alert("Lab test added successfully!");
      }

      setTitle("");
      setPrice("");
      setMaleOption(false);
      setFemaleOption(false);
      setChildOption(false);
      setHomeVisit(false);
      setLabVisit(false);
      setCategory("");
      setEditId(null);

      const querySnapshot = await getDocs(collection(db, "labTests"));
      const tests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLabTests(tests);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleEdit = (labTest) => {
    setTitle(labTest.title);
    setPrice(labTest.price.toString());
    setMaleOption(labTest.maleOption);
    setFemaleOption(labTest.femaleOption);
    setChildOption(labTest.childOption);
    setHomeVisit(labTest.homeVisit);
    setLabVisit(labTest.labVisit);
    setCategory(labTest.category);
    setEditId(labTest.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lab test?")) {
      try {
        const docRef = doc(db, "labTests", id);
        await deleteDoc(docRef);

        const querySnapshot = await getDocs(collection(db, "labTests"));
        const tests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLabTests(tests);
        alert("Lab test deleted successfully!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-page container mt-4">
        <h2 className="clr-set mb-4" align="center">
          {editId ? "Edit Lab Test" : "Add New Lab Test"}
        </h2>
        <form onSubmit={handleSubmit} className="lab-test-form">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="d-flex">
            <div className="form-group d-flex align-items-center">
              <label className="mb-0 me-2">Male</label>
              <input
                type="checkbox"
                checked={maleOption}
                onChange={() => setMaleOption(!maleOption)}
                className="checkbox"
              />
            </div>

            <div className="form-group  d-flex align-items-center">
              <label className="mb-0 me-2">Female</label>
              <input
                type="checkbox"
                checked={femaleOption}
                onChange={() => setFemaleOption(!femaleOption)}
                className="checkbox"
              />
            </div>

            <div className="form-group d-flex align-items-center">
              <label className="mb-0 me-2">Child</label>
              <input
                type="checkbox"
                checked={childOption}
                onChange={() => setChildOption(!childOption)}
                className="checkbox"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group d-flex align-items-center">
              <label className="mb-0 me-2">Home Visit</label>
              <input
                type="checkbox"
                checked={homeVisit}
                onChange={() => setHomeVisit(!homeVisit)}
                className="checkbox"
              />
            </div>
            <div className="form-group d-flex align-items-center">
              <label className="mb-0 me-2">Lab Visit</label>
              <input
                type="checkbox"
                checked={labVisit}
                onChange={() => setLabVisit(!labVisit)}
                className="checkbox"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editId ? "Update Lab Test" : "Add Lab Test"}
          </button>
        </form>

        {/* Manage Lab Tests Section */}
        <h2 className="clr-set">Manage Lab Tests</h2>
        <div className="lab-test-list">
          {labTests.map((labTest) => (
            <div key={labTest.id} className="lab-test-item p-3">
              <div>
                <h3 className="mb-0">{labTest.title}</h3>
              </div>
              <p className="mb-0 text-dark">({labTest.category})</p>
              <p className="text-dark fs-4  mb-2 fw-semibold">
                ₹{labTest.price}
              </p>
              <p className="text-dark   mb-2 ">
                {labTest.maleOption && <span className="me-2">👨Male </span>}
                {labTest.femaleOption && (
                  <span className="me-2">👩Female </span>
                )}
                {labTest.childOption && <span className="me-2">🧒Child </span>}
              </p>
              <p className="text-dark   mb-3 d-flex justify-content-between">
                {labTest.homeVisit && <span>🏠Home Visit</span>}
                {labTest.labVisit && <span>🔬Lab Visit</span>}
              </p>
              <button onClick={() => handleEdit(labTest)} className="btn-set2">
                Edit
              </button>
              <button
                onClick={() => handleDelete(labTest.id)}
                className="bg-danger ms-2 btn-set2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
