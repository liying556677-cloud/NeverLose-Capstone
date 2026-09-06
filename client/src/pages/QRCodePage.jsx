import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";//// Used to check user authentication status
import LabelScreen from "../components/LabelScreen/LabelScreen";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
function QRCodePage() {
  const { loading: authLoading } = useContext(AuthContext);// Get authentication loading state

  if (authLoading) return <LoadingSpinner message="Authenticating..." />;
  return (
    <div>
      <LabelScreen />
    </div>
  );
}

export default QRCodePage;
