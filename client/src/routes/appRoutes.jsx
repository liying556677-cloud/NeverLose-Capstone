import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import PublicScan from "../pages/PublicScan";
import DashboardPage from "../pages/DashboardPage";
import CreateItemPage from "../pages/CreateItemPage";
import QRCodePage from "../pages/QRCodePage";
import ReportListPage from "../pages/ReportListPage";
import FoundReport from "../pages/FoundReport";
import ItemDetailsPage from "../pages/ItemDetailsPage";
import EditItemPage from "../pages/EditItemPage"
import LandingPage from "../pages/LandingPage";
import HowItWork from "../pages/HowItWork";
import Features from "../pages/features";
import GenericErrorPage from "../pages/GenericErrorPage";
// PrivateRoute Component: If the user is not authenticated, it redirects them to the login page using the Navigate component
function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  // While Firebase is checking the session status, we show a loading state
  if (loading) return <div className="text-white">Loading...</div>;
  // If user exists, render the child component, otherwise redirect to login
  return user ? children : <Navigate to="/login" replace />;
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/f/:token" element={<PublicScan />} />
      <Route path="/found/:token" element={<FoundReport />} />
      <Route path="/home" element={<LandingPage />} />

      {/* private routes */}
      {/* <PrivateRoute>Wrap it when backend is completely done</PrivateRoute> */}
      <Route path="/" element={<DashboardPage />} />
      <Route path="/create-item" element={<CreateItemPage />} />
      <Route path="/label/:itemId" element={<QRCodePage />} />
      <Route path="/item-details/:id" element={<ItemDetailsPage />} />
      <Route path="/item-reports/:id" element={<ReportListPage />} />
<Route path="/how-it-works" element={<HowItWork/>}/>
<Route path="/features" element={<Features/>}/>
<Route path="/edit-item/:id" element={<EditItemPage />} />
      {/* Default redirection - if the path does not exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/error" element={<GenericErrorPage />} />

    </Routes>
  );
};

export default AppRoutes;
