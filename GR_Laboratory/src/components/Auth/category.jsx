import React from "react";
import {
  FaHeartbeat,
  FaStethoscope,
  FaVials,
  FaUserMd,
  FaTachometerAlt,
  FaFlask,
  FaLungs,
  FaTint,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./StepsSection.css";

const TestCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: <FaTint />, title: "All Tests", category: "All" },
    { icon: <FaUserMd />, title: "Full body checkup", category: "All" },
    {
      icon: <FaStethoscope />,
      title: "Thyroid care",
      category: "Thyroid Profile",
    },
    {
      icon: <FaTachometerAlt />,
      title: "Diabetes care",
      category: "Diabetes Screen",
    },
    {
      icon: <FaHeartbeat />,
      title: "Heart health",
      category: "Iron Deficiency Profile",
    },
    {
      icon: <FaFlask />,
      title: "Kidney function test",
      category: "Kidney Profile",
    },
    { icon: <FaLungs />, title: "Liver profile", category: "Liver Profile" },
    { icon: <FaVials />, title: "Covid tests", category: "Covid Profile" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/tests?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="test-categories pt-0 mt-0 pb-4 mb-2">
      <h2 className="mb-5">
        <span className="clr-set">One place for all of your tests</span>
      </h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(category.category)}
          >
            <div className="icon">{category.icon}</div>
            <p>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCategories;
