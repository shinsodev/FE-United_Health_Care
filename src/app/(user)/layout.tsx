import * as React from "react";

import { Box } from "@mui/material";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body>
    //     <InitColorSchemeScript attribute="class" />
    //     <AppRouterCacheProvider options={{ enableCssLayer: true }}>
    //       <ThemeProvider theme={theme}>
    //         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    //         <CssBaseline />
    //         <ModeSwitch />
    //         {props.children}
    //       </ThemeProvider>
    //     </AppRouterCacheProvider>
    //   </body>
    // </html>

    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, p: 8, overflowY: "auto" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
