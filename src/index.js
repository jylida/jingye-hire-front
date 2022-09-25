import "@fontsource/noto-sans-sc";
import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./theme/themecontext";
import { AuthProvider } from "./context/authProvider";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
