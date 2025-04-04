import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const personalInfo = [
  { label: "Full Name", value: "Robert Harry" },
  { label: "ID", value: "2210000" },
  { label: "Gender", value: "Male" },
  { label: "Address", value: "Lost Angeles" },
  { label: "Department", value: "Cardiology" },
];

const page = () => {
  return (
    <Container sx={{ mt: 4 }}>
      {/* Avatar & Name */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Avatar */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/assets/images/avatar.jpg"
            alt="Avatar"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Name */}
        <Box sx={{ paddingTop: 1 }}>
          <Typography
            sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}
          >
            Robert Harry
          </Typography>
          <Typography sx={{ opacity: "50%", fontSize: 16 }}>
            robert@gmail.com
          </Typography>
        </Box>
      </Box>

      {/* User Info Section */}
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
          mt: 5,
        }}
      >
        {personalInfo.map((item, index) => (
          <Box key={index}>
            <Typography
              sx={{ color: "#1F2B6C", fontWeight: "medium", fontSize: 20 }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                color: "#1F2B6C",
                opacity: "50%",
                fontSize: 16,
                p: 2,
                fontWeight: "medium",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Edit Profile Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
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
    </Container>
  );
};

export default page;
