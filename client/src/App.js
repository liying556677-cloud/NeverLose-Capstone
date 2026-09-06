import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    //AuthProvider wraps the entire app so any component can access user data
    <AuthProvider>
      {/* BrowserRouter allows navigation without full page reloads */}
      <BrowserRouter>
        {/* AppRoutes component for path definitions */}
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
