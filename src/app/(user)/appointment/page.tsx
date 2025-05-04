"use client";
import DoctorCard from "@/components/DoctorCard";
import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  loading?: boolean;
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

// Use the API_BASE_URL directly like in appointmentlist
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://appointment-service-e6za.onrender.com";

const Appointment = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const pageSize = 10;

  // Load page data when currentPage changes
  useEffect(() => {
    const loadDoctorsAndSchedules = async () => {
      setLoading(true);
      try {
        // Fetch doctors list directly from the API
        const response = await fetch(
          `${API_BASE_URL}/api/v1/doctors?page=${currentPage}&size=${pageSize}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch doctors list");
        }

        const data = await response.json();

        // Set pagination data
        setTotalPages(data.data.totalPages);
        setTotalDoctors(data.data.totalElements);

        // Create initial doctor objects
        const initialDoctors = data.data.items.map((doctor: DoctorInfo) => ({
          id: doctor.id,
          name: doctor.fullName,
          image: `/assets/images/doctor.jpg`,
          schedules: [],
          loading: true,
        }));

        // Set doctors immediately to show cards
        setDoctors(initialDoctors);
        setLoading(false);

        // Fetch schedules for each doctor
        const doctorsWithSchedules = [...initialDoctors];

        for (let i = 0; i < data.data.items.length; i++) {
          const doctorId = data.data.items[i].id;
          try {
            // Fetch schedules directly from the API
            const schedulesResponse = await fetch(
              `${API_BASE_URL}/api/v1/doctor-schedules/doctor/${doctorId}`
            );

            if (!schedulesResponse.ok) {
              doctorsWithSchedules[i] = {
                ...doctorsWithSchedules[i],
                loading: false,
              };
              continue;
            }

            const schedulesData = await schedulesResponse.json();

            // Update this doctor's schedules
            doctorsWithSchedules[i] = {
              ...doctorsWithSchedules[i],
              schedules: schedulesData.data?.items || [],
              loading: false,
            };

            // Update the state with the latest information
            setDoctors([...doctorsWithSchedules]);
          } catch (err) {
            console.warn(
              `Error fetching schedules for doctor ${doctorId}:`,
              err
            );
            doctorsWithSchedules[i] = {
              ...doctorsWithSchedules[i],
              loading: false,
            };
          }
        }

        // Filter doctors to only show those with available schedules
        setDoctors((prev) =>
          prev.filter(
            (doctor) =>
              doctor.schedules.length > 0 &&
              doctor.schedules.some((schedule) => schedule.available)
          )
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load doctor schedules. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctorsAndSchedules();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
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
        variant="h6"
        sx={{ p: 2, fontWeight: "bold", color: "#007bff" }}
      >
        Appointment
      </Typography>

      {doctors.length === 0 ? (
        <Typography align="center" sx={{ my: 4 }}>
          No doctor schedules available at the moment.
        </Typography>
      ) : (
        <>
          {/* Doctor cards */}
          {doctors.map((doctor) => {
            const { timeSlots, details } = getScheduleData(doctor.schedules);
            return (
              <Box key={doctor.id} position="relative">
                {doctor.loading && (
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bgcolor="rgba(255,255,255,0.7)"
                    zIndex={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress size={30} />
                  </Box>
                )}
                <DoctorCard
                  id={doctor.id}
                  name={doctor.name}
                  image={doctor.image}
                  schedule={timeSlots}
                  scheduleDetails={details}
                />
              </Box>
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
