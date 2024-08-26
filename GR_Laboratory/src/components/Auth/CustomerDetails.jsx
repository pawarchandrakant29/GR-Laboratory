import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import CompleteButton from "./CompleteButton";
import AdminHeader from "./HeaderAdmin";

const Details = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const isSuc = useSelector((state) => state.auth.isSuc);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuc) {
      navigate("/login");
    } else {
      fetchAppointments();
    }
  }, [isSuc, navigate]);

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

  const handleEdit = (appointment) => {
    setIsEditing(appointment.id);
    setCurrentAppointment({ ...appointment });
  };

  const handleUpdate = async () => {
    try {
      const appointmentRef = doc(db, "appointments", currentAppointment.id);
      await updateDoc(appointmentRef, currentAppointment);
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === currentAppointment.id
            ? currentAppointment
            : appointment
        )
      );
      setIsEditing(false);
      setCurrentAppointment(null);
    } catch (error) {
      setError("Error updating appointment");
      console.error("Error updating appointment:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAppointment({ ...currentAppointment, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const appointmentRef = doc(db, "appointments", id);
      await deleteDoc(appointmentRef);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      setError("Error deleting appointment");
      console.error("Error deleting appointment:", error);
    }
  };

  const formatDate = (date) => {
    const appointmentDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return appointmentDate.toLocaleDateString(undefined, options);
  };

  const filterAppointments = (filterType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filterType === "today") {
      return appointments.filter(
        (appointment) =>
          new Date(appointment.date).toDateString() === today.toDateString()
      );
    } else if (filterType === "upcoming") {
      return appointments
        .filter((appointment) => new Date(appointment.date) > today)
        .filter(
          (appointment) =>
            new Date(appointment.date).toDateString() !== today.toDateString()
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      return appointments
        .filter((appointment) => new Date(appointment.date) < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  const renderTable = (appointments, title, filterType) => (
    <div>
      <h2 className="app">{title}</h2>
      <table width="1450" className="table1 mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
            {filterType === "today" && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={appointment.id}
              className={index % 2 === 0 ? "even" : "odd"}
            >
              <td>
                {isEditing === appointment.id ? (
                  <input
                    type="text"
                    name="name"
                    value={currentAppointment.name}
                    onChange={handleChange}
                    style={{ width: "200px" }}
                  />
                ) : (
                  appointment.name
                )}
              </td>
              <td>
                {isEditing === appointment.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={currentAppointment.phone}
                    onChange={handleChange}
                    style={{ width: "150px" }}
                  />
                ) : (
                  appointment.phone
                )}
              </td>
              <td>
                {isEditing === appointment.id ? (
                  <input
                    type="number"
                    name="age"
                    value={currentAppointment.age}
                    onChange={handleChange}
                    style={{ width: "50px" }}
                  />
                ) : (
                  appointment.age
                )}
              </td>
              <td>
                {isEditing === appointment.id ? (
                  <textarea
                    name="address"
                    value={currentAppointment.address}
                    onChange={handleChange}
                    style={{ width: "600px", height: "60px" }}
                  />
                ) : (
                  appointment.address
                )}
              </td>
              <td>
                {isEditing === appointment.id ? (
                  <input
                    type="date"
                    name="date"
                    value={currentAppointment.date}
                    onChange={handleChange}
                    style={{ width: "120px" }}
                  />
                ) : (
                  formatDate(appointment.date)
                )}
              </td>
              <td>
                {isEditing === appointment.id ? (
                  <input
                    type="time"
                    name="time"
                    value={currentAppointment.time}
                    onChange={handleChange}
                    style={{ width: "80px" }}
                  />
                ) : (
                  appointment.time
                )}
              </td>
              <td className="sep">
                {filterType === "today" || filterType === "upcoming" ? (
                  <>
                    {isEditing === appointment.id ? (
                      <>
                        <button className="btn1" onClick={handleUpdate}>
                          Update
                        </button>
                        <button
                          className="btn2"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn1"
                          onClick={() => handleEdit(appointment)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn2"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="btn2"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
              {filterType === "today" && (
                <td>
                  <CompleteButton appointment={appointment} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <AdminHeader />
      {renderTable(
        filterAppointments("today"),
        "Today's Appointments",
        "today"
      )}
      {renderTable(
        filterAppointments("upcoming"),
        "Upcoming Appointments",
        "upcoming"
      )}
      {renderTable(filterAppointments("other"), "Past Appointments", "other")}
    </>
  );
};

export default Details;
