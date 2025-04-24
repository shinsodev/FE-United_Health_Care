import React from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const PaymentPage = () => {
  return (
    <Box p={4}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <ArrowBackIcon sx={{ mr: 2, cursor: 'pointer' }} />
        <Typography variant="h5" fontWeight="bold">Hospital</Typography>
      </Box>

      {/* Top info */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography>Balance: <b>$169.15</b></Typography>
        <Tabs value={0} textColor="primary" indicatorColor="primary">
          <Tab label="Card" />
          <Tab label="Paypal" />
          <Tab label="Skrill" />
        </Tabs>
      </Box>

      {/* Main content */}
      <Box display="flex" gap={4}>
        {/* Left side */}
        <Box flex={1}>
          <Box
            border="1px solid #ccc"
            borderRadius="8px"
            p={2}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CreditCardIcon />
              <Typography fontWeight="bold">**** ---- ---- 3636</Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #ccc"
            borderRadius="8px"
            p={2}
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CreditCardIcon />
              <Typography fontWeight="bold">**** ---- ---- 2424</Typography>
            </Box>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            sx={{ borderRadius: '12px', height: '50px' }}
          >
            + ADD NEW CARD
          </Button>

          {/* Bottom summary */}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="body2">Total price</Typography>
              <Typography variant="h6" fontWeight="bold">$192.50</Typography>
            </Box>
            <Box>
              <Typography variant="body2">You saving on discount</Typography>
              <Typography variant="h6" fontWeight="bold">$42.50</Typography>
            </Box>
          </Box>
        </Box>

        {/* Right side */}
        <Box flex={1}>
          {/* Order details */}
          <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
            <Typography fontWeight="bold" mb={1}>ORDER DETAILS</Typography>
            <Typography variant="body2">Order number</Typography>
            <Typography fontWeight="bold">123456</Typography>
            <Typography variant="body2">Payer ID</Typography>
            <Typography fontWeight="bold">123456</Typography>
          </Paper>

          {/* Card preview */}
          <Card sx={{ backgroundColor: '#e74c3c', color: '#fff', borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>mastercard</Typography>
              <Typography variant="h5" fontWeight="bold">2424 **** **** 2424</Typography>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="body2">Expire date</Typography>
                  <Typography fontWeight="bold">03 / 23</Typography>
                </Box>
                <Button variant="contained" sx={{ bgcolor: '#f1948a', color: '#fff' }}>CVV</Button>
              </Box>
            </CardContent>
          </Card>

          {/* Save + Pay */}
          <Box mt={3} display="flex" alignItems="center" gap={2}>
            <Checkbox defaultChecked />
            <Typography>Save card</Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: '#2ecc71', height: '50px', borderRadius: 2 }}
          >
            PAY
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
