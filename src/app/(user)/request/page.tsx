'use client'
import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const appointmentsData = [
  {
    id: 1,
    patientName: "Shyam Khanna",
    doctorName: "Dr. Smith",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    patientName: "Jean Lee Un",
    doctorName: "Dr. Johnson",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    patientName: "Clara Brook",
    doctorName: "Dr. Williams",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    patientName: "Shyam Khanna",
    doctorName: "Dr. Smith",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 5,
    patientName: "Jean Lee Un",
    doctorName: "Dr. Johnson",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 6,
    patientName: "Clara Brook",
    doctorName: "Dr. Williams",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 7,
    patientName: "Shyam Khanna",
    doctorName: "Dr. Smith",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 8,
    patientName: "Jean Lee Un",
    doctorName: "Dr. Johnson",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 9,
    patientName: "Clara Brook",
    doctorName: "Dr. Williams",
    date: "01/27",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

export default function AppointmentRequests() {
  const [appointments, setAppointments] = useState(appointmentsData);

interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    date: string;
    avatar: string;
}

const handleApproval = (id: number, status: boolean): void => {
    alert(`Appointment ${status ? "Accepted" : "Rejected"} for ID: ${id}`);
};

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: "auto", mt: 4, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "#007bff" }}>
        Appointment Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "gray" }}>Patient</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "gray" }}>Doctor</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "gray" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "gray" }}>Approval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={appointment.avatar} sx={{ mr: 1 }} />
                {appointment.patientName}
              </TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleApproval(appointment.id, true)} color="success">
                  <CheckCircle />
                </IconButton>
                <IconButton onClick={() => handleApproval(appointment.id, false)} color="error">
                  <Cancel />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
