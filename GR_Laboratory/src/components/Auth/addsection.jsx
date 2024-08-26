import React from "react";
import './StepsSection.css';

const StepsSection = () => {
  const steps = [
    {
      number: "01",
      title: "Book a test",
      description: "Select and book the test for yourself through the Website or Whatsapp.",
    },
    {
      number: "02",
      title: "Sample Collection",
      description: "Our sample collector will collect your sample from your home.",
    },
    {
      number: "03",
      title: "Get reports",
      description: "Receive reports in the Website, via Whatsapp, and via SMS.",
    },
  ];

  return (
    <div className="steps-section pb-5 pt-1">
      <h2 className="clr-set mb-4">Book your tests just in 3 steps</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="step-number">{step.number}</div>
            <h3 className="step-title clr-set2">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsSection;