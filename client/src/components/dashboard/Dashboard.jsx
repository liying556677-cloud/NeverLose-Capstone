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
    items,
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
      <div className="px-0">
        {itemsLoading ? (
          <LoadingSpinner />
        ) : !items || items.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />
        ) : (
          <>
            {/* Header with title, back navigation */}
            <div className="d-flex flex-row justify-content-between align-items-center py-2 pb-3 pb-md-4 px-2">
              <h2
                className="text-white fw-bold my-2"
                style={{ fontSize: "calc(1.2rem + 0.5vw)" }}
              >
                My Secure Tags
              </h2>

              <CustomButton
                onClick={handleCreate}
                className="btn-red d-flex align-items-center gap-2 shadow-sm border-0 p-2 px-md-4 py-md-2"
              >
                <i className="bi bi-plus-lg fw-bold"></i>
                <span className="d-none d-sm-inline fw-semibold">Add Item</span>
              </CustomButton>
            </div>

            {/* Items List */}
            <ItemsList
              items={items}
              // Paging
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              // Filters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              // Sorting
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              // Navigation
              onItemDetails={handleItemDetails}
              onReportsList={handleReportsList}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
