import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import NextAuthWrapper from "@/lib/next.auth.wrapper";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <NextAuthWrapper>
            {props.children}
          </NextAuthWrapper>
          {/* </ThemeProvider> */}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
