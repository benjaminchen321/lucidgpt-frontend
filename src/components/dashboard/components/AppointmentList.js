import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentList.css"; // Add this for skeleton loader styles

const AppointmentList = ({ customerId }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const endpoint = customerId
          ? `${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}`
          : `${process.env.REACT_APP_BACKEND_URL}/appointments`;
        const response = await axios.get(endpoint);
        setAppointments(response.data.appointments || response.data || []); // Fallback logic
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
      {loading && <div className="skeleton-loader"></div>} {/* Add Skeleton Loader */}
      {error && <p className="error">{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id || appointment.date}>
            {appointment.date} - {appointment.service_type} (
            {appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
