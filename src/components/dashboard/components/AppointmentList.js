// frontend/src/components/dashboard/components/AppointmentList.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./AppointmentList.css"; // Ensure this file exists for styling

const AppointmentList = ({ customerId }) => {
  const [appointments, setAppointments] = useState([]);
  const observerRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        let endpoint = `${process.env.REACT_APP_BACKEND_URL}/appointments`;
        if (customerId) {
          endpoint = `${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}`;
        }
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored upon login
          },
        });
        setAppointments(response.data.appointments || response.data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [customerId]);

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>
      {loading && <div className="skeleton-loader"></div>}
      {error && <p className="error">{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.service_type} (
            {appointment.status})
          </li>
        ))}
      </ul>
      {loading && <div className="loading-animation">Loading...</div>}
      <div ref={observerRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default AppointmentList;
