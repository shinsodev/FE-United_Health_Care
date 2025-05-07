"use client";
import React, { useEffect, useState } from "react";
import {
    Button, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert, IconButton, Drawer, List, ListItem, ListItemText
} from "@mui/material";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSession } from "next-auth/react";

// Định nghĩa interface cho user
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    googleAccount?: boolean;
    department?: string;
    experienceYears?: number;
    specialization?: string;
    birthDate?: string;
    phoneNumber?: string;
    address?: string;
    assurance?: string;
}

const UserList = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        if (!session?.token) return;

        try {
            const res = await fetch('/api/userlist', {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.code === 200) {
                setUsers(data.data || []);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            const res = await fetch(`/api/userlist/${id}`, {
                method: "DELETE",
                headers: {
                    //@ts-ignore
                    Authorization: `Bearer ${session.token}`, // Fixed syntax
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (res.ok) {
                setSnackbar({ open: true, message: result.message, severity: "success" });
                //@ts-ignore
                setUsers((prev) => prev.filter((u) => u.id !== id));
            } else {
                setSnackbar({ open: true, message: result.message, severity: "error" });
            }
        } catch (err) {
            console.error("Delete failed:", err);
            setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
        }
    };

    const handleViewUser = async (id: number) => {
        try {
            const res = await fetch(`/api/userlist/${id}`, {
                method: "GET",
                headers: {
                    //@ts-ignore
                    Authorization: `Bearer ${session.token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (res.ok) {
                setSelectedUser(result.data);
                setDrawerOpen(true);
            } else {
                setSnackbar({ open: true, message: result.message || "Failed to fetch user", severity: "error" });
            }
        } catch (err) {
            console.error("Fetch user failed:", err);
            setSnackbar({ open: true, message: "Failed to fetch user", severity: "error" });
        }
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUsers();
    }, [session?.token]);

    return (
        <Box sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fff", boxShadow: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                All Users
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    User List
                </Typography>
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
                </Box>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => handleViewUser(user.id)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
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

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity as any}>{snackbar.message}</Alert>
            </Snackbar>

            {/* Drawer for User Details */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleCloseDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '80vw', sm: 400 }, // Responsive width
                        maxWidth: '100%',
                        backgroundColor: '#f9fafb',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px 0 0 8px',
                        padding: 3,
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: '#1a202c',
                            borderBottom: '2px solid #a855f7',
                            pb: 1,
                        }}
                    >
                        User Details
                    </Typography>
                    {selectedUser ? (
                        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {[
                                { label: 'ID', value: selectedUser.id },
                                { label: 'Name', value: selectedUser.name },
                                { label: 'Email', value: selectedUser.email },
                                { label: 'Role', value: selectedUser.role },
                                { label: 'Google Account', value: selectedUser.googleAccount ? 'Yes' : 'No' },
                                ...(selectedUser.role === 'DOCTOR'
                                    ? [
                                        { label: 'Department', value: selectedUser.department },
                                        { label: 'Experience Years', value: selectedUser.experienceYears },
                                        { label: 'Specialization', value: selectedUser.specialization },
                                    ]
                                    : []),
                                ...(selectedUser.role === 'PATIENT'
                                    ? [
                                        { label: 'Birth Date', value: selectedUser.birthDate },
                                        { label: 'Phone Number', value: selectedUser.phoneNumber },
                                        { label: 'Address', value: selectedUser.address },
                                        { label: 'Assurance', value: selectedUser.assurance },
                                    ]
                                    : []),
                            ].map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        py: 1.5,
                                        borderBottom: '1px solid #e2e8f0',
                                        '&:last-child': { borderBottom: 'none' },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography sx={{ fontWeight: 600, color: '#2d3748' }}>
                                                {item.label}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography sx={{ color: '#4a5568', mt: 0.5 }}>
                                                {item.value || 'N/A'}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography sx={{ color: '#4a5568', p: 2 }}>
                            No user selected
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleCloseDrawer}
                            sx={{
                                backgroundColor: '#a855f7',
                                color: '#fff',
                                borderRadius: '8px',
                                padding: '8px 24px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#9333ea',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default UserList;