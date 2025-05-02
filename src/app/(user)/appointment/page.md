"use client";

import { Container, Typography, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Define types based on the API response
interface DoctorSchedule {
  id: number;
  doctorId: number;
  date: string;
  period: string;
  startHour: string;
  endHour: string;
  available: boolean;
}

interface DoctorData {
  id: number;
  name: string;
  image: string;
  schedules: DoctorSchedule[];
}

const Appointment = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Generate array of doctor IDs from 1 to 15 (to catch more potential doctors)
        const doctorIds = Array.from({ length: 15 }, (_, i) => i + 1);

        // Fetch doctor info and schedules for each doctor ID
        const doctorsWithSchedules = await Promise.all(
          doctorIds.map(async (id) => {
            try {
              // First fetch doctor information
              const doctorResponse = await fetch(`/api/doctors/${id}`);

              if (!doctorResponse.ok) {
                console.warn(`Doctor with ID ${id} not found`);
                return null; // Skip if doctor doesn't exist
              }

              const doctorData = await doctorResponse.json();

              // Skip if no valid doctor data
              if (doctorData.status !== 200 || !doctorData.data) {
                console.warn(`Invalid data for doctor ID ${id}`);
                return null;
              }

              // Extract doctor information
              const doctorInfo = {
                name:
                  doctorData.data.name ||
                  doctorData.data.fullName ||
                  `Doctor ${id}`,
                image: doctorData.data.image || `/assets/images/doctor.jpg`,
              };

              // Now fetch schedules for this doctor
              const schedulesResponse = await fetch(`/api/schedules/${id}`);

              if (!schedulesResponse.ok) {
                console.warn(`No schedules found for doctor ID ${id}`);
                return null; // Skip doctors with no schedules
              }

              const schedulesData = await schedulesResponse.json();

              // Only include doctors with available schedules
              if (schedulesData.data?.items?.length > 0) {
                return {
                  id,
                  name: doctorInfo.name,
                  image: doctorInfo.image,
                  schedules: schedulesData.data.items,
                };
              }
              return null;
            } catch (err) {
              console.warn(`Error fetching data for doctor ID ${id}:`, err);
              return null;
            }
          })
        );

        // Filter out null values (doctors with no schedules or errors)
        const validDoctors = doctorsWithSchedules.filter(
          (doctor): doctor is DoctorData => doctor !== null
        );

        setDoctors(validDoctors);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load doctor schedules. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Format time for display (e.g., "07:00:00" to "7:00")
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours)}:${minutes}`;
  };

  // Convert schedule data to array of time slots and schedule details
  const getScheduleData = (schedules: DoctorSchedule[]) => {
    const availableSchedules = schedules.filter(
      (schedule) => schedule.available
    );

    const timeSlots = availableSchedules.map(
      (schedule) =>
        `${formatTime(schedule.startHour)}-${formatTime(schedule.endHour)}`
    );

    const details = availableSchedules.map((schedule) => ({
      date: schedule.date,
      period: schedule.period,
      startHour: schedule.startHour,
      endHour: schedule.endHour,
    }));

    return { timeSlots, details };
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" sx={{ my: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
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

      {doctors.length === 0 ? (
        <Typography align="center" sx={{ my: 4 }}>
          No doctor schedules available at the moment.
        </Typography>
      ) : (
        doctors.map((doctor) => {
          const { timeSlots, details } = getScheduleData(doctor.schedules);
          return (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              image={doctor.image}
              schedule={timeSlots}
              scheduleDetails={details}
            />
          );
        })
      )}
    </Container>
  );
};

export default Appointment;
