import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const patients = [
  {
    id: 1,
    firstName: "Sam",
    lastName: "Sapoooth",
    nic: "61622626V",
    email: "hsn@gmail",
    mobile: "0774596005",
    dob: "2022-01-13",
    gender: "Male",
    address: "Galle",
  },
  {
    id: 2,
    firstName: "Sam",
    lastName: "Sapoooth",
    nic: "61622626V",
    email: "hsn@gmail",
    mobile: "0774596005",
    dob: "2022-01-13",
    gender: "Male",
    address: "Galle",
  },
  {
    id: 3,
    firstName: "Sam",
    lastName: "Sapoooth",
    nic: "61622626V",
    email: "hsn@gmail",
    mobile: "0774596005",
    dob: "2022-01-13",
    gender: "Male",
    address: "Galle",
  },
  {
    id: 4,
    firstName: "Sam",
    lastName: "Sapoooth",
    nic: "61622626V",
    email: "hsn@gmail",
    mobile: "0774596005",
    dob: "2022-01-13",
    gender: "Male",
    address: "Galle",
  },
];

const RecentPatient = () => {
  return (
    <Box
      sx={{
        border: "2px solid #28a745", // Viền màu xanh lá cây
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px" }}>
        Recent patients
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#6c757d", marginBottom: "20px" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>

      {/* Bảng */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile number</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.nic}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.mobile}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    sx={{
                      color: "#6f42c1",
                      minWidth: "40px",
                      marginRight: "5px",
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "#dc3545", minWidth: "40px" }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentPatient;
