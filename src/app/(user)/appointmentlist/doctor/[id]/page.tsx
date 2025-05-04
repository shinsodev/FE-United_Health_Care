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
    examinationType: string;
    appointmentDate: string;
    specialtyName: string;
    patientName: string;
    doctorId: number;
    doctorName: string;
    status: string;
    symptoms: string;
    startHour: string | null;
    endHour: string | null;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://appointment-service-e6za.onrender.com';

const AppointmentListByDoctor = () => {
    const { id } = useParams(); // get doctor ID from URL
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/v1/appointments/doctor/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "*/*",
                    },
                });
                const data = await response.json();
                console.log(data);
                setAppointments(data.data.items || []);
            } catch (error) {
                console.error("Failed to fetch doctor appointments:", error);
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
        <Box sx={{ pl: 4 }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "#007bff" }}>
                Your Appointments
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            {/* <TableCell>Regular/VIP</TableCell> */}
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            {/* <TableCell>Specialty</TableCell> */}
                            {/* <TableCell>Doctor</TableCell> */}
                            <TableCell>Symptoms</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appt) => (
                            <TableRow key={appt.id}
                                sx={{
                                    backgroundColor: appt.examinationType === "VIP" ? "#C6E2FF" : "inherit", // màu vàng nhạt
                                }}
                            >
                                {/* <TableCell>{appt.id}</TableCell> */}
                                {/* <TableCell>{appt.examinationType || "N/A"}</TableCell> */}
                                <TableCell>{appt.appointmentDate || "N/A"}</TableCell>
                                <TableCell>
                                    {appt.startHour && appt.endHour
                                        ? `${appt.startHour} - ${appt.endHour}`
                                        : "—"}
                                </TableCell>
                                {/* <TableCell>{appt.specialtyName || "N/A"}</TableCell> */}
                                {/* <TableCell>{appt.doctorName || "N/A"}</TableCell> */}
                                {/* <TableCell>{doctorNames[appt.doctorId] || "..."}</TableCell> */}
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

export default AppointmentListByDoctor;
