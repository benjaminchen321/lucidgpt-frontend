import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = ({ customerId }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const endpoint = customerId
          ? `${process.env.REACT_APP_BACKEND_URL}/api/customers/${customerId}`
          : `${process.env.REACT_APP_BACKEND_URL}/appointments`;
        const response = await axios.get(endpoint);
        setAppointments(response.data.appointments || []); // Fallback logic
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments.");
      }
    };
  
    fetchAppointments();
  }, [customerId]);

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.date}>
            {appointment.date} - {appointment.service_type} ({appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
