import React from "react";
import "./AboutUs.css";
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us mt-5 pt-5">
        {/* Vision and Mission Section */}
        <section className="vision-mission mt-4 pt-2 container">
          <div className="vision w-50">
            <h2>Our Vision</h2>
            <p>
              Be the most trusted healthcare partner, enabling healthier lives.
            </p>
          </div>
          <div className="mission w-50">
            <h2>Our Mission</h2>
            <p>
              To be the undisputed market leader by providing accessible,
              affordable, timely, and quality healthcare diagnostics, applying
              insights and cutting-edge technology to create value for all
              stakeholders.
            </p>
          </div>
        </section>

        {/* Journey Section */}
        <section className="container mt-4 pt-2">
          {/* Add content here as per the image */}
          <div className="our-journey-container">
            <h2>Our Journey</h2>
            <p className="text-white">
              Mr. Ganesh R. Patil, commenced the business of providing pathology
              services in the year 2019 through sole proprietorship GR Clinical
              Laboratory. The business of diagnostic and related healthcare
              tests and services now continues to be provided by our Laboratory.
            </p>

            <div className="journey-content">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/jrny.png?alt=media&token=52c115d2-2e44-44ea-bbca-d0598a410461"
                alt="Our Journey Image"
                className="journey-image"
              />
              <div className="journey-text">
                <h3>2018 - 2020</h3>
                <ul>
                  <li className="text-white">2019: Founded by Ganesh Patil</li>
                  <li className="text-white">
                    2019: Company incorporated as Gr Pathology Laboratory
                    Private Ltd.
                  </li>
                  <li className="text-white">
                    2020: Partnership With Rahul Patil
                  </li>
                  <li className="text-white">
                    2021: Gr Pathology Laboratory at Godadara, Surat received
                    ISO 9001:2000 certification
                  </li>
                  <li className="text-white">
                    2023: Open's 2 New Branches and Partnership with Rohit Patil
                  </li>
                </ul>
              </div>
            </div>

            <div className="timeline-navigation">
              <span>2018 – 2019</span>
              <span>2020 – 2022</span>
              <span>2022 – 2023</span>
              <span>2024 onwards</span>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container  mt-4 pt-2">
          {/* Add content here as per the image */}
          <div className="values-container">
            <h2 align="center">Our Values</h2>
            <div className="values-cards">
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/girl.png?alt=media&token=79e03f33-3fcb-4d20-b3fb-9c00c765ea5e"
                  alt="Quality"
                  className="card-image"
                />
                <div className="card-content">
                  <span className="card-title">Quality</span>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/customer-first.png?alt=media&token=3f07ef92-70ce-4f3f-a2f5-d97ae0ca1f0e"
                  alt="Customer First"
                  className="card-image"
                />
                <div className="card-content">
                  <span className="card-title">Customer First</span>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/accountability.png?alt=media&token=bfea18b4-0f03-4976-b3ff-3b78090f28d2"
                  alt="Accountability"
                  className="card-image"
                />
                <div className="card-content">
                  <span className="card-title">Accountability</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Section */}
        <section className="container  mt-4 pt-2">
          {/* Add content here as per the image */}
          <div className="logistics-strength">
            <h2>Logistics Strength</h2>
            <div className="stats-container mt-4">
              <div className="d-flex align-items-center">
                <div className="icon">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/floor-state_0.png?alt=media&token=6b054d13-644c-44c2-9cf4-ddd7864e8626"
                    alt="Satellite Labs"
                  />
                </div>
                <div className="ms-3">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Total Labs</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="icon">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/Team-of-Doctors.png?alt=media&token=b4018069-28c0-44ce-b884-9526fb73333d"
                    alt="Staff"
                  />
                </div>
                <div className="ms-3">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Staff</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="icon">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/logistics-strength-icon-1.png?alt=media&token=bf9b23b1-ac02-4496-9034-e70a54ec8cd6"
                    alt="Doctors"
                  />
                </div>
                <div className="ms-3">
                  <div className="stat-number">55+</div>
                  <div className="stat-label">Doctors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container  mt-4 pt-2">
          {/* Add content here as per the image */}
          <div className="team-section">
            <h2>Our Team</h2>
            <div className="tab-container">
              <button className="tab active">CEO / Directors</button>
              <button className="tab">Staff</button>
            </div>
            <div className="team-slider">
              <div className="team-members">
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/jiju.jpg?alt=media&token=531d6a9a-6de6-4ffc-9e34-71606318f8c2"
                    alt="ganeshpatil"
                  />
                  <div className="member-info">
                    <h3>Ganesh Patil</h3>
                    <p className="text-white">CEO</p>
                  </div>
                </div>
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/rahul.jpg?alt=media&token=9001c0f0-7adb-4b04-8282-e79be71f96f1"
                    alt="rahul"
                  />
                  <div className="member-info">
                    <h3>Rahul Patil</h3>
                    <p className="text-white">Managing Director</p>
                  </div>
                </div>
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/rohit.jpg?alt=media&token=aec8bce4-77ad-4a3b-9f16-083546c53862"
                    alt="rohit"
                  />
                  <div className="member-info">
                    <h3>Rohit Patil</h3>
                    <p className="text-white">
                      Bussiness <br />
                      Partner
                    </p>
                  </div>
                </div>
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/vishalpatil.jpg?alt=media&token=49738444-88ac-41bc-9d53-f36e521513cf"
                    alt="patilsir"
                  />
                  <div className="member-info">
                    <h3>Dr. Vishal Patil</h3>
                    <p className="text-white">Doctor</p>
                  </div>
                </div>
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/me-s.jpg?alt=media&token=01f8bcb2-c511-4cca-b172-0e55938b6eac"
                    alt="Me"
                  />
                  <div className="member-info">
                    <h3>Chandrakant Pawar</h3>
                    <p className="text-white">Technical Supporter</p>
                  </div>
                </div>
                <div className="member">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/sample.png?alt=media&token=8e0de395-1820-442e-8cb6-7ac7d6d0dc8b"
                    alt="Roshni Patel"
                  />
                  <div className="member-info">
                    <h3>Roshni Patel</h3>
                    <p className="text-white">Assistant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container  mt-4 pt-2">
            <div className="maps-section">
              <h2 className="text-center">Laboratory Details</h2>
              <div className="d-flex">
                <div className="col-4 gaps">
                  <div className="">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.425656389666!2d72.87020357471825!3d21.175243282732332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fe70de33c1d%3A0xde14c7b61e79a426!2sGR%20PATHOLOGY%20LABORATORY!5e0!3m2!1sen!2sin!4v1724588148881!5m2!1sen!2sin"
                      width="410"
                      height="290"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className=" text-center mt-2">
                    <p className="mb-1 fs-5 fw-semibold clr-set">
                      GR PATHOLOGY LABORATORY
                    </p>
                    <p className="mb-2">
                      <i class="bi bi-geo-alt me-1"></i>E1B 105, Sai Milan
                      Residency, beside Raj Empire, Sanjay Nagar, Dhruv Park
                      Society, Godadara, Surat, Gujarat 394210
                    </p>
                    <p>
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 11:00 PM (Mon -- Sat)
                      <br />
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 02:00 PM (Sunday)
                    </p>
                    <p>
                      <i class="bi bi-phone"></i> +91 98756XXXXX
                    </p>
                  </div>
                </div>
                <div className="col-4 gaps">
                  <div className="">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.186485000444!2d72.8255376442056!3d21.14497562792803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051004ff79941%3A0x52912f069b49a343!2sGR%20pathology%20laboratory!5e0!3m2!1sen!2sin!4v1724607998661!5m2!1sen!2sin"
                      width="410"
                      height="290"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className=" text-center mt-2">
                    <p className="mb-1 fs-5 fw-semibold clr-set">
                      GR PATHOLOGY LABORATORY
                    </p>
                    <p className="mb-2">
                      <i class="bi bi-geo-alt me-1"></i>181, New Bamroli Rd,
                      Sukhi Nagar, Nem Nagar, Pandesara, Udhana, Surat, Gujarat
                      394220
                    </p>
                    <p>
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 11:00 PM (Mon -- Sat)
                      <br />
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 02:00 PM (Sunday)
                    </p>
                    <p>
                      <i class="bi bi-phone"></i> +91 98756XXXXX
                    </p>
                  </div>
                </div>
                <div className="col-4 gaps2 pe-4">
                  <div className="">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.425656389666!2d72.87020357471825!3d21.175243282732332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fe70de33c1d%3A0xde14c7b61e79a426!2sGR%20PATHOLOGY%20LABORATORY!5e0!3m2!1sen!2sin!4v1724588148881!5m2!1sen!2sin"
                      width="390"
                      height="290"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className=" text-center mt-2">
                    <p className="mb-1 fs-5 fw-semibold clr-set">
                      GR PATHOLOGY LABORATORY
                    </p>
                    <p className="mb-2">
                      <i class="bi bi-geo-alt me-1"></i>Comming Soon In <br />
                      Kadodara
                    </p>
                    <p>
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 11:00 PM (Mon -- Sat)
                      <br />
                      <i class="bi bi-stopwatch me-1"></i>
                      08:00 AM - 02:00 PM (Sunday)
                    </p>
                    <p>
                      <i class="bi bi-phone"></i> +91 98756XXXXX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-5">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default AboutUs;
