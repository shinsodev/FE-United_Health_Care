"use client";

import { Box, Container, Typography, Button, CircularProgress, Modal, TextField } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

interface UserInfo {
  id: number;
  email: string;
  name: string;
}

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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [id, setId] = useState<number>(0)
  const { data: session } = useSession();

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/my-info`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setUserInfo(data.data);
    } catch (err) {
      console.error("Error fetching user info", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [session]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo?.id,
          name: editName,
          email: editEmail,
          password: editPassword,
        }),
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        setOpen(false);
        fetchUserInfo();
      } else {
        alert("Failed to update user info");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const openModal = () => {
    setId(userInfo?.id!)
    setEditName(userInfo?.name || "");
    setEditEmail(userInfo?.email || "");
    setEditPassword("");
    setOpen(true);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
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
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>{userInfo?.name}</Typography>
          <Typography sx={{ opacity: "50%", fontSize: 16 }}>{userInfo?.email}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", columnGap: 3, rowGap: 1, gridTemplateColumns: "repeat(2, 1fr)", mt: 5 }}>
        <Box>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>Full Name</Typography>
          <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{userInfo?.name}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}>ID</Typography>
          <Typography sx={{ color: "#1F2B6C", opacity: "50%", fontSize: 16, p: 2, fontWeight: "medium" }}>{userInfo?.id}</Typography>
        </Box>
      </Box>

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

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
          <TextField
            fullWidth
            label="ID"
            value={id}
            // onChange={(e) => setId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Full Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleUpdate}>Save Changes</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Page;
