import { useState, useEffect, useContext } from "react";
import { reportsApi } from "../api/reportsApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useItemReports = (itemId) => {
  const { user, loading: authLoading } = useContext(AuthContext);
const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish
    if (authLoading) return;

    // If no user, stop loading and return empty list
    if (!user) {
      setReports([]);
      setLoading(false);
      return;
    }

    if (!itemId) return;

    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await reportsApi.list(itemId);
        setReports(res.data || []);
      } catch (err) {
        console.error("Fail to load reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [itemId, user, authLoading]);

  const updateStatus = async (reportId, itemId, newStatus) => {
    try {
      await reportsApi.updateStatus(reportId,{itemId:itemId,reportStatus:newStatus});
     if(newStatus!="RESOLVED")
     {
      navigate(0);
     }
     else 
     {
        navigate(`/dashboard`);
     }
      
    } catch (err) {
      navigate("/error", {
    state: {
      title: "Report update failed.",
      message: "Report updation failed. Please try again.",
      
    },
  });
    }
  };

  return {
    reports,
    loading: loading || authLoading,
    updateStatus,
  };
};