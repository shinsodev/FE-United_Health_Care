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
    Button,
    Stack,
    Pagination,
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
    startHour: string;
    endHour: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://appointment-service-e6za.onrender.com';

const AppointmentList = () => {

    const [totalPages, setTotalPages] = useState(1);
    // const [totalDoctors, setTotalDoctors] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Handle page change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/appointments?page=${currentPage}&size=10`); // use proxy to avoid CORS
                const data = await res.json();
                console.log(data);
                setAppointments(data.data.items || []);
                setTotalPages(data.data.totalPages);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [currentPage]);

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

    const formatTime = (time: string) => {
        if (!time) return "—";
        const [hours, minutes] = time.split(":");
        return `${parseInt(hours)}:${minutes}`;
    };

    return (
        <Box sx={{ pl: 4 }}>
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
                            <TableCell>Accept/Decline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appt) => (
                            <TableRow key={appt.id}>
                                <TableCell>{appt.id}</TableCell>
                                <TableCell>{appt.appointmentDate || "--"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: "none",
                                            fontSize: "12px",
                                            padding: "5px 10px",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backgroundColor: "#e3f2fd",
                                                borderColor: "#1976d2",
                                            },
                                        }}
                                    >
                                        {formatTime(appt.startHour) && formatTime(appt.endHour)
                                            ? `${formatTime(appt.startHour)} - ${formatTime(appt.endHour)}`
                                            : "—"}
                                    </Button>
                                </TableCell>
                                <TableCell>{appt.specialtyName || "--"}</TableCell>
                                <TableCell>{appt.doctorName || "--"}</TableCell>
                                <TableCell>{appt.patientName || "--"}</TableCell>
                                <TableCell>{appt.symptoms || "--"}</TableCell>
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
            {
                totalPages > 1 && (
                    <Stack spacing={2} alignItems="center" sx={{ my: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                        />
                        <Typography color="text.secondary" variant="body2">
                            Page {currentPage} of {totalPages}
                        </Typography>
                    </Stack>
                )
            }
        </Box>
    );
};

export default AppointmentList;
