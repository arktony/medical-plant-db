import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
