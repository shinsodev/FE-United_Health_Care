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
  Checkbox,
  IconButton,
} from "@mui/material";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const payments = [
    {
      id: 1,
      date: "12 Jan 2022",
      doctor: "Dr. Jacob Ryan",
      treatment: "Check up",
      charges: "$145",
      tax: "5%",
      discount: "8%",
      total: "$156",
    },
    {
      id: 2,
      date: "13 Jan 2022",
      doctor: "Dr. Emily Stone",
      treatment: "Dental",
      charges: "$200",
      tax: "5%",
      discount: "10%",
      total: "$190",
    },
    {
      id: 3,
      date: "14 Jan 2022",
      doctor: "Dr. John Smith",
      treatment: "Surgery",
      charges: "$1200",
      tax: "8%",
      discount: "5%",
      total: "$1260",
    },
    {
      id: 4,
      date: "15 Jan 2022",
      doctor: "Dr. Anna Bell",
      treatment: "Eye Check",
      charges: "$100",
      tax: "5%",
      discount: "2%",
      total: "$103",
    },
    {
      id: 5,
      date: "16 Jan 2022",
      doctor: "Dr. Mark Lee",
      treatment: "Therapy",
      charges: "$180",
      tax: "5%",
      discount: "8%",
      total: "$185",
    },
    {
      id: 6,
      date: "17 Jan 2022",
      doctor: "Dr. Sarah Kim",
      treatment: "Check up",
      charges: "$145",
      tax: "5%",
      discount: "8%",
      total: "$156",
    },
    {
      id: 7,
      date: "18 Jan 2022",
      doctor: "Dr. James Clark",
      treatment: "Dental",
      charges: "$210",
      tax: "5%",
      discount: "10%",
      total: "$199",
    },
    {
      id: 8,
      date: "19 Jan 2022",
      doctor: "Dr. Olivia Dean",
      treatment: "Therapy",
      charges: "$180",
      tax: "5%",
      discount: "8%",
      total: "$185",
    },
    {
      id: 9,
      date: "20 Jan 2022",
      doctor: "Dr. Henry White",
      treatment: "Surgery",
      charges: "$1250",
      tax: "8%",
      discount: "5%",
      total: "$1312",
    },
    {
      id: 10,
      date: "21 Jan 2022",
      doctor: "Dr. Mia Wong",
      treatment: "Check up",
      charges: "$145",
      tax: "5%",
      discount: "8%",
      total: "$156",
    },
  ];
const PaymentForm = () => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Treatment</TableCell>
                      <TableCell>Charges</TableCell>
                      <TableCell>Tax</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Typography sx={{ color: "#4f46e5", cursor: "pointer" }}>
                            {row.doctor}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#f97316", borderRadius: 10, px: 2, py: 0, minWidth: 0 }}
                            size="small"
                          >
                            {row.treatment}
                          </Button>
                        </TableCell>
                        <TableCell>{row.charges}</TableCell>
                        <TableCell>{row.tax}</TableCell>
                        <TableCell>{row.discount}</TableCell>
                        <TableCell>{row.total}</TableCell>
                        <TableCell>
                            <Button
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '6px',
                                    minWidth: 'auto',
                                    marginRight: '8px',
                                    '&:hover': {
                                    backgroundColor: '#f1f1f1',
                                    },
                                }}
                                >
                                <ModeEditOutlineOutlinedIcon sx={{ color: '#6f42c1' }} />
                                </Button>
        
                                <Button
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '6px',
                                    minWidth: 'auto',
                                    '&:hover': {
                                    backgroundColor: '#f1f1f1',
                                    },
                                }}
                                >
                                <DeleteOutlineOutlinedIcon sx={{ color: '#dc3545' }} />
                                </Button>
        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
        </TableContainer>
    )
}

export default PaymentForm