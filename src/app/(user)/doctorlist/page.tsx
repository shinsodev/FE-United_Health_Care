// ... tương tự như trên
"use client";
import React, { useEffect, useState } from "react";
import {
    Button, Typography, Box, Table, TableHead, TableRow, TableCell,
    TableBody, Modal, TextField, Snackbar, Alert
} from "@mui/material";
import { useSession } from "next-auth/react";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const { data: session } = useSession();

    const fetchDoctors = async () => {
        if (!session?.token) {
            console.log("No token available");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all-doctors?page=0&size=5`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                console.log("Failed to fetch doctors", res.status);
                return;
            }

            const data = await res.json();
            if (data.code === 200) {
                setDoctors(data.data || []);
            } else {
                console.log("No doctors found");
            }
        } catch (err) {
            console.log("Error fetching doctors:", err);
        } finally {
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [session?.token]);

    const handleCreateDoctor = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create-doctor`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
            });

            const result = await res.json();

            if (res.ok) {
                setSnackbar({ open: true, message: result.message, severity: "success" });
                fetchDoctors(); // refresh list
                setOpenModal(false);
            } else {
                setSnackbar({ open: true, message: result.message, severity: "error" });
            }
        } catch (err) {
            console.error("Error creating doctor:", err);
            setSnackbar({ open: true, message: "Failed to create doctor", severity: "error" });
        }
    };

    return (
        <Box sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fff", boxShadow: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                All Doctors
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>User List</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <input
                        type="text"
                        placeholder="Search by name"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            padding: "8px 12px",
                            outline: "none",
                        }}
                    />
                    <Button variant="contained" sx={{ background: "#a855f7" }}>
                        <FilterListAltIcon />
                    </Button>
                    <Button variant="outlined" onClick={() => setOpenModal(true)}>
                        Add Doctor
                    </Button>
                </Box>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                <Typography variant="body2">5 results found. Showing page 1 of 1</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" size="small">Previous</Button>
                    <Button variant="contained" size="small" sx={{ backgroundColor: "#a855f7" }}>1</Button>
                    <Button variant="outlined" size="small">Next</Button>
                </Box>
            </Box>

            {/* Modal Thêm bác sĩ */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white', p: 4, borderRadius: 2, width: 400, boxShadow: 24
                }}>
                    <Typography variant="h6" mb={2}>Create New Doctor</Typography>
                    <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
                    <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
                    <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCreateDoctor}>
                        Submit
                    </Button>
                </Box>
            </Modal>

            {/* Snackbar */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity as any}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default DoctorList;