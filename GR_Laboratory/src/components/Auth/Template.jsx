import React from "react";
import "./template.css";

const Template = () => {
  return (
    <div className="clr-dtr mb-4 ">
      <div className="container">
        <div className=" metropolis-container pb-0">
          <div className="image-section">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/dctr.webp?alt=media&token=a9b1d6e9-a9f4-4a8f-a993-ba776bebc05f"
              alt="Healthcare worker with patient"
              className="main-image"
            />
          </div>
          <div className="info-section ms-3">
            <h2 className="mb-4">Why choose GR Laboratory?</h2>
            <div className="info-items">
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-city"></i>
                </div>
                <p>
                  Presence in 50+ Area Surat <br />
                  Navsari, Palsana Etc.
                </p>
              </div>
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-vial"></i>
                </div>
                <p>100+ Tests and Profiles</p>
              </div>
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-flask"></i>
                </div>
                <p>05+ Clinical Labs</p>
              </div>
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-users"></i>
                </div>
                <p>Team of 10+ Experts</p>
              </div>
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-history"></i>
                </div>
                <p>8+ Years of Service</p>
              </div>
              <div className="info-item">
                <div className="bg-ctr">
                  <i className="fas fa-check-double"></i>
                </div>
                <p> 50k + Tests performed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
