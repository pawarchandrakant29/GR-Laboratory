import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../index.css";
import Header from "./Header";
import StepsSection from "./addsection";
import TestCategories from "./category";
import Footer from "./Footer";
import ImageSlider from "./Slider";
import Template from "./Template";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuc = useSelector((state) => state.auth.isSuc);
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [TransNotification, setTransNotification] = useState(false);

  useEffect(() => {
    if (location.state?.success) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        navigate(location.pathname, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (location.state?.transdata) {
      setTransNotification(true);
      const timer = setTimeout(() => {
        setTransNotification(false);
        navigate(location.pathname, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <>
      <Header />
      {showNotification && (
        <div className="notification">Appointment booked successfully</div>
      )}
      {TransNotification && (
        <div className="notification">Order Placed successfully</div>
      )}
      <div className="pt-5">
        <div className="set1 mt-4">
          <div>
            <ImageSlider />
            <TestCategories />
            <StepsSection />
            <Template />
            <div class="promotions-section container pt-0 mb-4">
              <h2 className="clr-set text-center fw-semibold">
                Promotions & Discounts
              </h2>
              <div class="promotions-container">
                <div class="promotion">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/dada.jpeg?alt=media&token=c6d03efd-95d2-4782-9082-c94e28b65b23"
                    alt="Promotion 1"
                  />
                  <div class="promotion-caption">
                    Swasth Points for Senior Citizens
                  </div>
                </div>
                <div class="promotion">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/dada2.jpeg?alt=media&token=02e1ef9e-0128-49c7-ae18-bc610c103aec"
                    alt="Promotion 2"
                  />
                  <div class="promotion-caption">
                    Family Offer on Swasthfit Healthcare Packages
                  </div>
                </div>
                <div class="promotion">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/dada.jpeg?alt=media&token=c6d03efd-95d2-4782-9082-c94e28b65b23"
                    alt="Promotion 3"
                  />
                  <div class="promotion-caption">
                    Home Collection Exclusive Offer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div className="img-set2 position-fixed bottom-0 end-0 pe-4 mb-4">
          <Link to="/appointment">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/boy.png?alt=media&token=f0df8742-19ad-4d11-b819-7afa5076da22"
              alt="Boy"
              className="boypng"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
