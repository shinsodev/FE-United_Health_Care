"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/Visibility";
import RecentPatient from "@/components/RecentPatient";
import PatientForm from "@/components/PatientForm";

const PatientList = () => {
  return (
    <Container>
      {/* Tiêu đề */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Patient Management
      </Typography>
      <PatientForm />
      <RecentPatient />
    </Container>
  );
};

export default PatientList;
