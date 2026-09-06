import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useItemReports } from "../hooks/useItemReports";
import ReportList from "../components/reportList/ReportList";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function ReportListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authLoading } = useContext(AuthContext);
  const { reports, loading, updateStatus } = useItemReports(id);

  // if there are reports we take the nickname of the first one
  const itemNickname = reports.length > 0 ? reports[0].item_nickname : "item";

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="w-100">
        <div className="d-flex flex-column align-items-start mb-0 p-2 p-md-0">
          <h3 className="text-white fw-bold mb-2">
            Found Reports: {itemNickname}
          </h3>

          <button
            className="btn btn-link text-white text-decoration-none p-0 pb-1 pb-md-0 opacity-hover"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-chevron-left"></i>
            <span className="ms-1">Back</span>
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner message="Fetching reports..." />
      ) : (
        <ReportList reports={reports} onUpdateStatus={updateStatus} />
      )}
    </MainLayout>
  );
}
