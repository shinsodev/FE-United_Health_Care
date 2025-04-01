import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ModeSwitch from "@/components/ModeSwitch";
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

    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ display: "flex", height: "100vh" }}>
              {/* Sidebar */}
              <Sidebar />

              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <Box component="main" sx={{ flex: 1, p: 4, overflowY: "auto" }}>
                  {props.children}
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
