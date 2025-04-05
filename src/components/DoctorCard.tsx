import React from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

interface DoctorCardProps {
  name: string;
  image: string;
  schedule: string[];
}

const DoctorCard = ({ name, image, schedule }: DoctorCardProps) => {
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
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            WED - 01/01
          </span>
          &nbsp; | &nbsp;
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
            <Button
              key={idx}
              variant="outlined"
              sx={{
                textTransform: "none",
                fontSize: "12px",
                padding: "5px 10px",
              }}
            >
              {time}
            </Button>
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
