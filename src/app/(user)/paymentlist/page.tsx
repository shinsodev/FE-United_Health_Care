import React from "react";
import {
  Button,
  Typography,
  Box,
} from "@mui/material";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import PaymentForm from "@/components/PaymentForm";


const PaymentList = () => {
  return (
    <Box sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fff", boxShadow: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Payment
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          All Payment
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <input
            type="text"
            placeholder="Search by name"
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "8px 12px",
              outline: "none",
            }}
          />
          <Button variant="contained" sx={{ background: "#a855f7" }}>
            <FilterListAltIcon />
          </Button>
        </Box>
      </Box>

      <PaymentForm />

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body2">8 results found. Showing page 1 of 1</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small">
            Previous
          </Button>
          <Button variant="contained" size="small" sx={{ backgroundColor: "#a855f7" }}>
            1
          </Button>
          <Button variant="outlined" size="small">
            2
          </Button>
          <Button variant="outlined" size="small">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentList;