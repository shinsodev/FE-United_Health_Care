"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  FormControlLabel,
} from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      //   maxWidth="lg"
      sx={{
        display: "flex",
        height: "100vh",
        //   alignItems: "center"
      }}
    >
      {/* Background left  */}
      <Box
        component="img"
        src="/assets/images/backgroundLogin.png"
        alt="Background"
        sx={{ width: 550 }}
      />

      {/* Form right  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mx: 15,
          width: "100%",
        }}
      >
        {/* Title form  */}
        <Box width="60%">
          <Typography
            sx={{ fontSize: 32, fontWeight: "medium", color: "#404040" }}
          >
            Log In
          </Typography>
        </Box>

        {/* Input form  */}

        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField fullWidth label="Email Address" variant="outlined" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Button  */}
        <Button
          variant="contained"
          sx={{ mt: 5, backgroundColor: "#16205b", padding: "12px 70px" }}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
