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
} from "@mui/material";
import { useParams } from "next/navigation";

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

const AppointmentListByPatient = () => {
    const { id } = useParams(); // get patient ID from URL
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    `/api/appointments/patient/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "*/*",
                    },
                });
                const data = await response.json();
                console.log(data);
                setAppointments(data.data.items || []);
            } catch (error) {
                console.error("Failed to fetch patient appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [id]);

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
                Your Appointments
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
                            <TableCell>Symptoms</TableCell>
                            <TableCell>Status</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AppointmentListByPatient;
