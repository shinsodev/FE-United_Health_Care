import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/Visibility";

const PatientForm = () => {
  return (
    <Container>
      {/* Form */}
      <Box
        sx={{
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              textTransform: "none",
              width: "30%",
            }}
          >
            Generate Report
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Grid size={3}>
              <TextField label="Patient ID" variant="outlined" size="small" />
            </Grid>
            <Grid size={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  textTransform: "none",
                  width: "30%",
                }}
              >
                Search
              </Button>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="NIC"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={4}>
              <Select fullWidth size="small" defaultValue="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                size="small"
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <VisibilityOff />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              textTransform: "none",
              width: "30%",
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6f42c1",
              color: "#fff",
              textTransform: "none",
              width: "30%",
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#dc3545",
              color: "#fff",
              textTransform: "none",
              width: "30%",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientForm;
