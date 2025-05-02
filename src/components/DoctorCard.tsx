import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tooltip,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

interface ScheduleInfo {
  date: string;
  period: string;
  startHour: string;
  endHour: string;
}

interface DoctorCardProps {
  name: string;
  image: string;
  schedule: string[];
  scheduleDetails?: ScheduleInfo[]; // Add details for tooltips
}

const DoctorCard = ({
  name,
  image,
  schedule,
  scheduleDetails = [],
}: DoctorCardProps) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format period for display
  const formatPeriod = (period: string) => {
    return period.charAt(0) + period.slice(1).toLowerCase();
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "150px", height: "150px", borderRadius: "20px" }}
          image={image}
          alt={name}
        />
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: "#1F2B6C",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#1F2B6C",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EventIcon
            sx={{
              fontSize: "18px",
              marginRight: "5px",
            }}
          />
          SCHEDULE
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {schedule.map((time, idx) => (
            <Tooltip
              key={idx}
              title={
                scheduleDetails[idx] ? (
                  <React.Fragment>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {formatDate(scheduleDetails[idx].date)}
                    </Typography>
                    <Typography variant="body2">
                      {formatPeriod(scheduleDetails[idx].period)} session
                    </Typography>
                  </React.Fragment>
                ) : (
                  "Schedule details not available"
                )
              }
              arrow
              placement="top"
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "5px 10px",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#1976d2",
                  },
                }}
              >
                {time}
              </Button>
            </Tooltip>
          ))}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#6c757d",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          Select and book (Booking fee 0đ)
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#159EEC",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#1F2B6C" },
            }}
          >
            BOOK
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
