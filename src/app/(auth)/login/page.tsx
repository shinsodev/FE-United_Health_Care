"use client";

import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Grid, TextField, Typography, Link, Divider, } from "@mui/material";
import NextLink from "next/link";
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { sendRequest } from '@/utils/api';
import { JWT } from 'next-auth/jwt';

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  useEffect(() => {
    if (session) {
      redirect("/");
    }
  }, [session]);

  const handleSubmit = async () => {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    });
    if (!response?.error) {
      redirect("/")
    } else {
      setOpen(true)
      setResMessage(response.error)
    }
  };

  const handleSignInWithGoogle = async () => {
    const res = await sendRequest<JWT>({
      url: "/api",
      method: "GET"
    })
    if (res && res.data) {
      window.location.href = res.data;
      console.log("check")
    } else {
      setOpen(true)
      setResMessage(res.message)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src="/assets/images/backgroundLogin.png"
        alt="Background"
        sx={{ width: 550 }}
      />

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
        <Box width="60%">
          <Typography
            sx={{ fontSize: 32, fontWeight: "medium", color: "#404040" }}
          >
            Log In
          </Typography>
        </Box>

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
            <TextField
              fullWidth label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit()
                }
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 5, backgroundColor: "#16205b", padding: "12px 70px" }}
          onClick={() => handleSubmit()}
        >
          Log In
        </Button>

        <Divider sx={{ width: "60%", my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ width: "60%", textTransform: "none", mb: 2 }}
          onClick={() => handleSignInWithGoogle()}
        >
          Log in with Google
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link href="/signup" component={NextLink}>
            Sign up
          </Link>
        </Typography>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </Box >
  );
};

export default LoginPage;
