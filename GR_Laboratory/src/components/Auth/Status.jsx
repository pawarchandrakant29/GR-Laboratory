import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const AppointmentStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const appointmentsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAppointments(appointmentsData);
    } catch (error) {
      setError("Error fetching appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filterAppointments = (appointments) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= today;
    });
  };

  const upcomingAppointments = filterAppointments(appointments);

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setEditDate(appointment.date);
    setEditTime(appointment.time);
  };

  const handleSaveClick = async () => {
    try {
      const appointmentRef = doc(db, "appointments", editingAppointment.id);
      await updateDoc(appointmentRef, { date: editDate, time: editTime });
      fetchAppointments();
      setEditingAppointment(null);
    } catch (error) {
      setError("Error updating appointment");
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeleteClick = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, "appointments", appointmentId));
      fetchAppointments();
    } catch (error) {
      setError("Error deleting appointment");
      console.error("Error deleting appointment:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingAppointment(null);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="appointment-status">
      <h2 className="clr-set mb-4" align="center">
        Appointment Status
      </h2>
      {upcomingAppointments.length === 0 ? (
        <p className="clr-set">No upcoming appointments scheduled.</p>
      ) : (
        <div className="appointment-list">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <strong>Name:</strong> {appointment.name} <br />
              <strong>Date:</strong>{" "}
              {new Date(appointment.date).toLocaleDateString()} <br />
              <strong>Time:</strong> {formatTime(appointment.time)} <br />
              <strong>Status:</strong>{" "}
              <div
                className={
                  appointment.completed ? "text-success" : "text-warning"
                }
              >
                {appointment.completed ? "Completed" : "Pending"}
              </div>
              <br />
              {appointment.completed ? null : (
                <>
                  {editingAppointment &&
                  editingAppointment.id === appointment.id ? (
                    <div className="edit-form">
                      <label>
                        Date:
                        <input
                          type="date"
                          value={editDate.split("T")[0]}
                          onChange={(e) => setEditDate(e.target.value)}
                        />
                      </label>
                      <label>
                        Time:
                        <input
                          type="time"
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                        />
                      </label>
                      <div className="mt-2">
                        <button className="apt-save" onClick={handleSaveClick}>
                          Save
                        </button>
                        <button
                          className="apt-del ms-2"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className="apt-edit mt-2"
                        onClick={() => handleEditClick(appointment)}
                      >
                        Edit
                      </button>
                      <button
                        className="apt-del mt-2 ms-2"
                        onClick={() => handleDeleteClick(appointment.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentStatus;
