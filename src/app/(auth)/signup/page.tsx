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
import NextLink from "next/link";
const SignUpPage = () => {
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
        }}
      >
        {/* Title form  */}
        <Box width="100%">
          <Typography
            sx={{ fontSize: 32, fontWeight: "medium", color: "#404040" }}
          >
            Sign up for account
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
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField fullWidth label="First Name" variant="outlined" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField fullWidth label="Last Name" variant="outlined" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField fullWidth label="Email Address" variant="outlined" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Term and condition  */}
        <Box width="65%">
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="body2">
                I accept all <Link href="#">terms and condition</Link>
              </Typography>
            }
            sx={{ mt: 2 }}
          />
        </Box>

        {/* Button  */}
        <Button
          variant="contained"
          sx={{ mt: 4, backgroundColor: "#16205b", padding: "15px 100px" }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" component={NextLink}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
