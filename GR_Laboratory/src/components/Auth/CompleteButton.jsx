import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const CompleteButton = ({ appointment }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const appointmentRef = doc(db, "appointments", appointment.id);
        const appointmentSnap = await getDoc(appointmentRef);
        if (appointmentSnap.exists()) {
          setIsCompleted(appointmentSnap.data().completed);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving appointment:", error);
      }
    };

    getAppointment();
  }, [appointment.id]);

  const handleClick = async () => {
    try {
      const appointmentRef = doc(db, "appointments", appointment.id);
      await updateDoc(appointmentRef, {
        completed: true,
      });
      setIsCompleted(true);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="btn-set">
      <button className={isCompleted ? "completed" : ""} onClick={handleClick}>
        {isCompleted ? "Completed" : "Complete"}
      </button>
    </div>
  );
};

export default CompleteButton;
