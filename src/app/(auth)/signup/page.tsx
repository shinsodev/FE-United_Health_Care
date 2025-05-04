"use client";

import { Box, Button, Checkbox, Grid, TextField, Typography, Link, FormControlLabel, CircularProgress, Alert, Divider } from "@mui/material";
import NextLink from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt";


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    assurance: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
          birthDate: formData.birthDate,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          assurance: formData.assurance,
        }),
      });

      const data = await response.json();

      if (data.code === 200) {
        setSuccess("Patient registration successful!");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          birthDate: "",
          phoneNumber: "",
          address: "",
          assurance: "",
        });
        setAcceptTerms(false);

      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      redirect("/login");
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const res = await sendRequest<JWT>({
        url: "/api/register-google",
        method: "GET"
      })
      if (res && res.data) {
        window.location.href = res.data;
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      redirect("/login");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflowY: "auto",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Background left */}
      <Box
        component="img"
        src="/assets/images/backgroundLogin.png"
        alt="Background"
        sx={{
          width: { xs: "100%", md: 550 },
          maxHeight: { xs: 200, md: "100%" },
          objectFit: "cover",
        }}
      />

      {/* Form right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          p: { xs: 2, md: 4 },
          maxWidth: { md: 600 },
          mx: "auto",
        }}
      >
        {/* Title form */}
        <Box width="100%">
          <Typography
            sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: "medium", color: "#404040" }}
          >
            Sign up for an account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {success}
          </Alert>
        )}

        {/* Input form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Birth Date"
                variant="outlined"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Insurance Number"
                variant="outlined"
                name="assurance"
                value={formData.assurance}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          {/* Term and condition */}
          <Box width="100%" sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  I accept all <Link href="#">terms and conditions</Link>
                </Typography>
              }
            />
          </Box>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              backgroundColor: "#16205b",
              padding: { xs: "10px 50px", md: "15px 100px" },
              width: { xs: "100%" },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ width: "60%", my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ width: "100%", textTransform: "none", mb: 2 }}
          onClick={() => handleSignUpWithGoogle()}
        >
          Sign up with Google
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
