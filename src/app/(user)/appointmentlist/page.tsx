"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

type Appointment = {
    id: number;
    appointmentDate: string;
    specialtyName: string;
    patientName: string;
    doctorName: string;
    status: string;
    symptoms: string;
    startHour: string | null;
    endHour: string | null;
};

const AppointmentList = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch("/api/appointments"); // use proxy to avoid CORS
                const data = await res.json();
                console.log(data);
                setAppointments(data.data.items || []);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Function to handle status update
    const updateStatus = async (id: number, status: string) => {
        const confirm = window.confirm(`Are you sure you want to change the status to ${status}?`);

        if (!confirm) return;

        try {
            const res = await fetch(`api/appointments/${id}?status=${status}`, {
                method: "PATCH",
                headers: {
                    "Accept": "*/*",
                },
            });
            if (res.ok) {
                // Update the status locally after successful patch
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appt) =>
                        appt.id === id ? { ...appt, status } : appt
                    )
                );
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "#007bff" }}>
                Appointment List
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Specialty</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Symptoms</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appt) => (
                            <TableRow key={appt.id}>
                                <TableCell>{appt.id}</TableCell>
                                <TableCell>{appt.appointmentDate || "N/A"}</TableCell>
                                <TableCell>
                                    {appt.startHour && appt.endHour
                                        ? `${appt.startHour} - ${appt.endHour}`
                                        : "—"}
                                </TableCell>
                                <TableCell>{appt.specialtyName || "N/A"}</TableCell>
                                <TableCell>{appt.doctorName || "N/A"}</TableCell>
                                <TableCell>{appt.patientName || "N/A"}</TableCell>
                                <TableCell>{appt.symptoms || "N/A"}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={appt.status}
                                        color={
                                            appt.status === "COMPLETED"
                                                ? "success"
                                                : appt.status === "CONFIRMED"
                                                    ? "info"
                                                    : appt.status === "PENDING"
                                                        ? "warning"
                                                        : appt.status === "CANCELLED"
                                                            ? "error"
                                                            : "default"
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => updateStatus(appt.id, "CONFIRMED")}
                                        color="success"
                                        disabled={appt.status !== "PENDING"}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => updateStatus(appt.id, "CANCELLED")}
                                        color="error"
                                        disabled={appt.status !== "PENDING"}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AppointmentList;
