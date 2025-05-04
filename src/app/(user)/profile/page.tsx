"use client";

import { Box, Container, Typography, Button, CircularProgress, Modal, TextField, Snackbar, Alert } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface BaseUserInfo {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT';
  googleAccount: boolean;
}

interface AdminInfo extends BaseUserInfo {
  role: 'ADMIN';
}

interface DoctorInfo extends BaseUserInfo {
  role: 'DOCTOR';
  department: string;
  experienceYears: number;
  specialization: string;
}

interface PatientInfo extends BaseUserInfo {
  role: 'PATIENT';
  birthDate: string;
  phoneNumber: string;
  address: string;
  assurance: string;
}

type UserInfo = AdminInfo | DoctorInfo | PatientInfo;

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    department: "",
    experienceYears: 0,
    specialization: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    assurance: ""
  });
  const { data: session } = useSession();

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setUserInfo(data.data);
      setEditForm({
        ...editForm,
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        department: (data.data as DoctorInfo).department || "",
        experienceYears: (data.data as DoctorInfo).experienceYears || 0,
        specialization: (data.data as DoctorInfo).specialization || "",
        birthDate: (data.data as PatientInfo).birthDate || "",
        phoneNumber: (data.data as PatientInfo).phoneNumber || "",
        address: (data.data as PatientInfo).address || "",
        assurance: (data.data as PatientInfo).assurance || ""
      });
    } catch (err) {
      console.log("Error fetching user info", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const handleUpdate = async () => {
    try {
      const updateData: any = {
        id: editForm.id,
        email: editForm.email,
        name: editForm.name,
        ...(editForm.password && { password: editForm.password }),
      };

      if (userInfo?.role === 'DOCTOR') {
        updateData.department = editForm.department;
        updateData.experienceYears = editForm.experienceYears;
        updateData.specialization = editForm.specialization;
      } else if (userInfo?.role === 'PATIENT') {
        updateData.birthDate = editForm.birthDate;
        updateData.phoneNumber = editForm.phoneNumber;
        updateData.address = editForm.address;
        updateData.assurance = editForm.assurance;
      }

      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (data.code === 200) {
        setSnackbar({ open: true, message: data.message, severity: "success" });
        setOpen(false);
        fetchUserInfo();
      } else {
        alert("Failed to update user info");
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user info");
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>User information not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Box
          sx={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", position: "relative" }}
        >
          <Image
            src="/assets/images/avatar.jpg"
            alt="Avatar"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ paddingTop: 1 }}>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>{userInfo.name}</Typography>
          <Typography sx={{ opacity: "50%", fontSize: 16 }}>{userInfo.email}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", columnGap: 3, rowGap: 1, gridTemplateColumns: "repeat(2, 1fr)", mt: 5 }}>
        <Box>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Full Name</Typography>
          <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{userInfo.name}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>ID</Typography>
          <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{userInfo.id}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Role</Typography>
          <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{userInfo.role}</Typography>
        </Box>
        {userInfo.role === 'DOCTOR' && (
          <>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Department</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as DoctorInfo).department}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Experience Years</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as DoctorInfo).experienceYears}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Specialization</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as DoctorInfo).specialization}</Typography>
            </Box>
          </>
        )}
        {userInfo.role === 'PATIENT' && (
          <>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Birth Date</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as PatientInfo).birthDate}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Phone Number</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as PatientInfo).phoneNumber}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Address</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as PatientInfo).address}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Assurance</Typography>
              <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{(userInfo as PatientInfo).assurance}</Typography>
            </Box>
          </>
        )}
      </Box>

      {(userInfo.role === 'PATIENT' || userInfo.role === 'DOCTOR') && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={openModal}
              sx={{
                color: "#1F2B6C",
                borderColor: "#1F2B6C",
                borderRadius: 2,
                padding: "8px 24px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1F2B6C", color: "#fff" },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
          <TextField
            fullWidth
            label="ID"
            value={editForm.id}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Full Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={editForm.password}
            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
            sx={{ mb: 2 }}
          />
          {userInfo.role === 'DOCTOR' && (
            <>
              <TextField
                fullWidth
                label="Department"
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Experience Years"
                type="number"
                value={editForm.experienceYears}
                onChange={(e) => setEditForm({ ...editForm, experienceYears: parseInt(e.target.value) })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Specialization"
                value={editForm.specialization}
                onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {userInfo.role === 'PATIENT' && (
            <>
              <TextField
                fullWidth
                label="Birth Date"
                type="date"
                value={editForm.birthDate}
                onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={editForm.phoneNumber}
                onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Assurance"
                value={editForm.assurance}
                onChange={(e) => setEditForm({ ...editForm, assurance: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Button variant="contained" onClick={handleUpdate}>Save Changes</Button>
        </Box>
      </Modal>
      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity as any}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Page;