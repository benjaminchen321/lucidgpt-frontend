import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginatedList from "./PaginatedList";

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
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold text-blue-600 mb-4">
        {customerId
          ? "Upcoming Appointments for Selected Customer"
          : "Upcoming Appointments"}
      </h2>
      <p className="text-gray-600 mb-4">
        {customerId
          ? "Here are the upcoming appointments for the selected customer."
          : "Below is a list of all upcoming appointments."}
      </p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <PaginatedList
          items={appointments}
          itemsPerPage={5}
          renderItem={(appointment) => (
            <div className="appointment-item p-4 bg-gray-50 shadow-md rounded-lg">
              <p className="appointment-date text-lg font-medium text-gray-800">
                {new Date(appointment.date).toLocaleDateString()} -{" "}
                {appointment.service_type}
              </p>
              <p className="appointment-status text-sm text-gray-500">
                Status: {appointment.status}
              </p>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default AppointmentList;
