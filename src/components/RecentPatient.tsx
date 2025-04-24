import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Patient {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface RecentPatientProps {
  patients: Patient[];
}

const RecentPatient = ({ patients }: RecentPatientProps) => {
  return (
    <Box
      sx={{
        border: "2px solid #28a745",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "5px" }}>
        Recent patients
      </Typography>
      <Typography variant="body2" sx={{ color: "#6c757d", marginBottom: "20px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.role}</TableCell>
                <TableCell>
                  <Button size="small" sx={{ color: "#6f42c1", minWidth: "40px", marginRight: "5px" }}>
                    <EditIcon />
                  </Button>
                  <Button size="small" sx={{ color: "#dc3545", minWidth: "40px" }}>
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
