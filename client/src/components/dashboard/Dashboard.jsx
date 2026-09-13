import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ItemsList from "../itemsList/ItemsList";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useDashboard } from "../../hooks/useDashboard";
import WelcomeState from "../welcomeState/WelcomeState";
import CustomButton from "../CustomButton/CustomButton";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";


function Dashboard() {
  const {
    allItems,
    loading: itemsLoading,
     

    // Paging
    page,
    totalPages,
    setPage,

    // Filters
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    // Sorting
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,

    // Navigation
    handleCreate,
    handleItemDetails,
    handleReportsList,
    
  } = useDashboard();

  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login once auth is done and user is missing
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // While auth is initializing
  if (authLoading) {
    return <div className="text-white text-center">Checking session...</div>;
  }

  // If user is not logged in, let redirect happen
  if (!user) return null;

  return (
  <MainLayout username={user?.displayName || "User"}>
    <div
    className="container-fluid"
    style={{ maxWidth: "1250px" }}
    >

      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-start mb-4">
  <div>
    <h1 className="text-white fw-bold mb-2">
      Dashboard
    </h1>

    <p className="text-white-50 mb-0">
      Welcome back, {user?.displayName || "User"}!
      Here's an overview of your NeverLose items.
    </p>
  </div>

  <CustomButton
  variant="secondary"
  onClick={handleCreate}
  className="px-4 py-2 fw-semibold"
>
  + Add Item
</CustomButton>
</div>

      {/* Overview Cards */}
      <div className="row g-4">

  <div className="col-6 col-lg-3">
    <div className="dashboard-summary-card">
      <p>Total Items</p>
      <h2>{allItems?.length || 0}</h2>
    </div>
  </div>

  <div className="col-6 col-lg-3">
    <div className="dashboard-summary-card">
      <p>Lost</p>
      <h2>
        {allItems?.filter(
          (item) => item.status === "LOST"
        ).length || 0}
      </h2>
    </div>
  </div>

  <div className="col-6 col-lg-3">
    <div className="dashboard-summary-card">
      <p>Safe</p>
      <h2>
        {allItems?.filter(
          (item) => item.status === "SAFE"
        ).length || 0}
      </h2>
    </div>
  </div>

  <div className="col-6 col-lg-3">
    <div className="dashboard-summary-card">
      <p>Recovered</p>
      <h2>
        {allItems?.filter(
          (item) => item.status === "RECOVERED"
        ).length || 0}
      </h2>
    </div>
  </div>

</div>
</div>
  </MainLayout>
);
}

export default Dashboard;
