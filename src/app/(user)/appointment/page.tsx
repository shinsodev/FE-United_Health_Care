"use client";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Pagination,
  Stack,
} from "@mui/material";
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

interface DoctorInfo {
  id: number;
  fullName: string;
  available: boolean;
}

interface DoctorData {
  id: number;
  name: string;
  image: string;
  schedules: DoctorSchedule[];
}

interface DoctorsResponse {
  status: number;
  message: string;
  data: {
    pageNo: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    items: DoctorInfo[];
  };
}

const Appointment = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const pageSize = 10;

  // Fetch doctors for current page
  const fetchDoctorsForPage = async (page: number) => {
    setLoading(true);
    try {
      // Fetch doctors for the current page
      const doctorsListResponse = await fetch(
        `/api/doctors?page=${page}&size=${pageSize}`
      );

      if (!doctorsListResponse.ok) {
        throw new Error("Failed to fetch doctors list");
      }

      const doctorsListData: DoctorsResponse = await doctorsListResponse.json();

      if (doctorsListData.status !== 200 || !doctorsListData.data?.items) {
        throw new Error("Invalid doctors list data");
      }

      // Update pagination information
      setTotalPages(doctorsListData.data.totalPages);
      setTotalDoctors(doctorsListData.data.totalElements);

      // Extract the list of doctors for this page
      const doctorsList = doctorsListData.data.items;

      // Fetch schedules for each doctor on this page
      const doctorsWithSchedules = await Promise.all(
        doctorsList.map(async (doctor) => {
          try {
            // Fetch schedules for this doctor
            const schedulesResponse = await fetch(
              `/api/schedules/${doctor.id}`
            );

            if (!schedulesResponse.ok) {
              console.warn(`No schedules found for doctor ID ${doctor.id}`);
              return null; // Skip doctors with no schedules
            }

            const schedulesData = await schedulesResponse.json();

            // Only include doctors with available schedules
            if (schedulesData.data?.items?.length > 0) {
              return {
                id: doctor.id,
                name: doctor.fullName,
                // Assign a different image based on doctor ID
                image: `/assets/images/doctor.jpg`,
                schedules: schedulesData.data.items,
              };
            }
            return null;
          } catch (err) {
            console.warn(
              `Error fetching schedules for doctor ID ${doctor.id}:`,
              err
            );
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

  // Initialize with first page
  useEffect(() => {
    fetchDoctorsForPage(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (loading && doctors.length === 0) {
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
        <>
          {/* Show loading overlay when fetching new page */}
          {loading && (
            <Box
              position="fixed"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgcolor="rgba(255,255,255,0.7)"
              zIndex={999}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}

          {/* Doctor cards */}
          {doctors.map((doctor) => {
            const { timeSlots, details } = getScheduleData(doctor.schedules);
            return (
              <DoctorCard
                key={doctor.id}
                id={doctor.id}
                name={doctor.name}
                image={doctor.image}
                schedule={timeSlots}
                scheduleDetails={details}
              />
            );
          })}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <Stack spacing={2} alignItems="center" sx={{ my: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
              <Typography color="text.secondary" variant="body2">
                Page {currentPage} of {totalPages} • Showing doctors with
                available schedules
              </Typography>
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};

export default Appointment;
