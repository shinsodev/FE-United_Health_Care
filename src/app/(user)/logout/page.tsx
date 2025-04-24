"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react"

const LogoutPage = () => {
    return (
        <div
            style={{
                height: "70vh", // Chiều cao toàn màn hình
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button
                variant="contained"
                color="error"
                size="large"
                sx={{
                    fontSize: "1.2rem",
                    padding: "12px 24px",
                }}
                onClick={() => {
                    signOut({ callbackUrl: "/login" });
                }}
            >
                Log out
            </Button>
        </div>
    )
}

export default LogoutPage