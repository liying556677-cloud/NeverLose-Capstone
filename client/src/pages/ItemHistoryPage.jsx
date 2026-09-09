import React, { useContext, useEffect, useState } from "react";
import itemApi from "../api/itemApi";
import { AuthContext } from "../context/AuthContext";
import { logApi } from "../api/logApi";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { useNavigate } from "react-router-dom";

const ItemHistoryPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const loadItems = async () => {
      try {
        setLoading(true);

        const res = await itemApi.list();

        const rawItems =
          Array.isArray(res)
            ? res
            : Array.isArray(res?.items)
            ? res.items
            : Array.isArray(res?.data)
            ? res.data
            : [];

        const recovered = rawItems.filter(
  (item) => item.status === "RECOVERED"
);

        const recoveredWithDates = await Promise.all(
         recovered.map(async (item) => {
        try {
         const logResponse = await logApi.getLogsItem(item.id);
        const logs = logResponse.data.events || [];

        const recoveredLog = logs.find(
        (log) =>
          log.type === "UPDATED" &&
          log.details?.changedFields?.status?.to === "RECOVERED"
      );

      return {
        ...item,
        recoveredAt: recoveredLog?.timestamp || null,
      };
    } catch (error) {
      console.error(`Failed to load logs for ${item.id}:`, error);

      return {
        ...item,
        recoveredAt: null,
      };
    }
  })
);

setRecoveredItems(recoveredWithDates);
      } catch (error) {
        console.error("Failed to load item history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="container py-5">
        <p>Loading item history...</p>
      </div>
    );
  }

  return (
   <MainLayout username={user?.displayName || "User"}>
    <div className="px-4 pt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="text-white fw-bold">Item History</h1>
        
        <button
        className="btn btn-link text-white text-decoration-none p-0 opacity-hover"
        onClick={() => navigate("/")}
            >
        <i className="bi bi-chevron-left"></i>
        <span className="ms-1">Back</span>
        </button>
        </div>

        <p className="text-white-50 mb-0">
          View your recovered items here.
        </p>
      
    </div>

    {recoveredItems.length === 0 ? (
      <div className="bg-white rounded-4 shadow-sm p-4">
        <p className="text-muted mb-0">
          No recovered items found.
        </p>
      </div>
    ) : (
      recoveredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-4 shadow-sm p-4 mb-3"
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h4 className="fw-bold mb-2">
                {item.nickname || "Unnamed Item"}
              </h4>

              <p className="mb-1">
                <strong>Status:</strong> {item.status}
              </p>

              <p className="mb-0">
                <strong>Recovered Date:</strong>{" "}
                {item.recoveredAt
                  ? new Date(item.recoveredAt).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>

            {item.photoUrl && (
              <img
                src={item.photoUrl}
                alt={item.nickname}
                className="rounded"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      ))
    )}
  </div>
   </MainLayout>
);
};
export default ItemHistoryPage;