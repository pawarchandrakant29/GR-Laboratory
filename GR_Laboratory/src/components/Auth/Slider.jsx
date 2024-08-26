import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/surat.png?alt=media&token=868a7ee8-7c29-42ec-9b4d-e822d7ddae3d", // Replace with your image paths
    "https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/smart.png?alt=media&token=854c078f-dc01-48ec-ac52-98e6c842ef04",
    "https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/family.png?alt=media&token=983e5097-0623-43b4-bd26-dc3fac489679",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
