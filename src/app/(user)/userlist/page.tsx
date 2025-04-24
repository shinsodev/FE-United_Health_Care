"use client";
import React, { useEffect, useState } from "react";
import {
    Button, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert, IconButton
} from "@mui/material";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSession } from "next-auth/react";

const UserList = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const fetchUsers = async () => {
        if (!session?.token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all-users?page=0&size=5`, {
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

    const handleDeleteUser = async (userId: number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (res.ok) {
                setSnackbar({ open: true, message: result.message, severity: "success" });
                //@ts-ignore
                setUsers((prev) => prev.filter((u) => u.id !== userId));
            } else {
                setSnackbar({ open: true, message: result.message, severity: "error" });
            }
        } catch (err) {
            console.error("Delete failed:", err);
            setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
        }
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
                                <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination giả lập */}
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
        </Box>
    );
};

export default UserList;
