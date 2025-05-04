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

const AppointmentListByPatient = () => {
    const { id } = useParams(); // get patient ID from URL
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    // const [doctorNames, setDoctorNames] = useState<Record<number, string>>({});


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

    const [doctorMap, setDoctorMap] = useState<Record<number, string>>({});

    useEffect(() => {
        const fetchDoctorNames = async () => {
            const uniqueDoctorIds = Array.from(new Set(appointments.map(a => a.doctorId)));
            const doctorMapTemp: Record<number, string> = {};

            await Promise.all(uniqueDoctorIds.map(async (id) => {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/v1/doctors/${id}`);
                    const data = await res.json();
                    doctorMapTemp[id] = data.data.fullName;
                } catch {
                    doctorMapTemp[id] = "Undefined";
                }
            }));

            setDoctorMap(doctorMapTemp);
        };

        if (appointments.length) fetchDoctorNames();
    }, [appointments]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }


    // useEffect(() => {
    //     const fetchDoctorNames = async () => {
    //         const ids = [...new Set(appointments.map((appt) => appt.doctorId))]; // unique doctorIds

    //         const results = await Promise.all(
    //             ids.map(async (id) => {
    //                 try {
    //                     const res = await fetch(`https://appointment-service-e6za.onrender.com/api/v1/doctors/${id}`);
    //                     const data = await res.json();
    //                     return [id, data.data.fullName];
    //                 } catch (err) {
    //                     return [id, "Unknown"];
    //                 }
    //             })
    //         );

    //         const nameMap = Object.fromEntries(results);
    //         setDoctorNames(nameMap);
    //     };

    //     if (appointments.length > 0) {
    //         fetchDoctorNames();
    //     }
    // }, [appointments]);



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
                            <TableCell>Doctor</TableCell>
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
                                <TableCell>{doctorMap[appt.doctorId] || "..."}</TableCell>
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
