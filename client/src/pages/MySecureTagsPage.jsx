import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useDashboard } from "../hooks/useDashboard";

import MainLayout from "../layouts/MainLayout/MainLayout";
import ItemsList from "../components/itemsList/ItemsList";
import WelcomeState from "../components/welcomeState/WelcomeState";
import CustomButton from "../components/CustomButton/CustomButton";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const MySecureTagsPage = () => {
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

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="text-white text-center">
        Checking session...
      </div>
    );
  }

  if (!user) return null;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="container py-4">

        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <div>
            <h2 className="text-white fw-bold mb-1">
              My Secure Tags
            </h2>

            <p className="text-white-50 mb-0">
              Manage and track your registered items.
            </p>
          </div>

          <CustomButton
            onClick={handleCreate}
            className="btn-red d-flex align-items-center gap-2 shadow-sm border-0 p-2 px-md-4 py-md-2"
          >
            <i className="bi bi-plus-lg fw-bold"></i>

            <span className="d-none d-sm-inline fw-semibold">
              Add Item
            </span>
          </CustomButton>
        </div>

        {/* Items */}
        {itemsLoading ? (
          <LoadingSpinner />
        ) : !items || items.length === 0 ? (
          <WelcomeState onCreateClick={handleCreate} />
        ) : (
          <ItemsList
            items={items}

            page={page}
            totalPages={totalPages}
            setPage={setPage}

            search={search}
            setSearch={setSearch}

            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}

            sortField={sortField}
            setSortField={setSortField}

            sortDirection={sortDirection}
            setSortDirection={setSortDirection}

            onItemDetails={handleItemDetails}
            onReportsList={handleReportsList}
          />
        )}

      </div>
    </MainLayout>
  );
};

export default MySecureTagsPage;