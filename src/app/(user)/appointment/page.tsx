import { Container, Typography } from "@mui/material";
import React from "react";
import DoctorCard from "@/components/DoctorCard";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const doctors = [
  {
    name: "Dr. John Doe",
    image: "/assets/images/doctor.jpg",
    schedule: [
      "8:00-9:00",
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
    ],
  },
  {
    name: "Dr. Jane Smith",
    image: "/assets/images/doctor.jpg",
    schedule: [
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
    ],
  },
  {
    name: "Dr. Emily Johnson",
    image: "/assets/images/doctor.jpg",
    schedule: [
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "13:00-14:00",
      "14:00-15:00",
    ],
  },
  {
    name: "Dr. Michael Brown",
    image: "/assets/images/doctor.jpg",
    schedule: [
      "8:00-9:00",
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
    ],
  },
  {
    name: "Dr. Sarah Davis",
    image: "/assets/images/doctor.jpg",
    schedule: [
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
    ],
  },
];
const Appointment = () => (
  <Container>
    <Typography
      sx={{
        display: "flex",
        alignItems: "center",
        color: "#1F2B6C",
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "10px",
      }}
    >
      <HomeIcon />
      <KeyboardArrowRightIcon />
      Appointment
    </Typography>
    {doctors.map((doctor, index) => (
      <DoctorCard
        key={index}
        name={doctor.name}
        image={doctor.image}
        schedule={doctor.schedule}
      />
    ))}
  </Container>
);

export default Appointment;
