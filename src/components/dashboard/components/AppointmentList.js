// AppointmentList.jsx
import React from "react";

const AppointmentList = () => {
  const appointments = [
    {
      id: 1,
      date: "2025-01-05",
      time: "10:00 AM",
      serviceType: "Oil Change",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2025-01-10",
      time: "2:00 PM",
      serviceType: "Tire Replacement",
      status: "Pending",
    },
  ];

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} at {appointment.time}: {appointment.serviceType} (
            {appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
