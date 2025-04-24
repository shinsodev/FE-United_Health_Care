"use client";
import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import RecentPatient from "@/components/RecentPatient";
import PatientForm from "@/components/PatientForm";
import { useSession } from "next-auth/react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPatients = async () => {
      if (!session?.token) {
        console.log("No token available");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all-patients?page=0&size=5`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.log("Failed to fetch patients", res.status);
          return;
        }

        const data = await res.json();
        if (data.code === 200) {
          setPatients(data.data);
        } else {
          console.log("No patients found");
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [session?.token]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Patient Management
      </Typography>
      <PatientForm />
      <RecentPatient patients={patients} />
    </Container>
  );
};

export default PatientList;
