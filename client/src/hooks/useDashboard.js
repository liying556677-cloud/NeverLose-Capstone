import { useState, useEffect, useContext, useMemo } from "react";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FILTERS
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // PAGINATION
  const [page, setPage] = useState(1);
  const pageSize = 7;

  // SORTING
  const [sortField, setSortField] = useState("nickname");
  const [sortDirection, setSortDirection] = useState("asc");

  // FETCH ITEMS
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await itemApi.list();

        const rawItems =
          Array.isArray(res) ? res :
          Array.isArray(res?.items) ? res.items :
          Array.isArray(res?.data) ? res.data :
          [];

        setItems(rawItems);
      } catch (err) {
         navigate("/error", {
    state: {
      title: "Could not load your items",
      message: "Could not load your items. Please try again.",
      
    },
  });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user, authLoading]);

  // Add hasReports
  const itemsWithReports = useMemo(() => {
    return items.map((item) => ({
      ...item,
      hasReports:
        item.reportsCount > 0 ||
        (Array.isArray(item.reports) && item.reports.length > 0),
    }));
  }, [items]);

  // FILTERING
  const filteredItems = useMemo(() => {
    return itemsWithReports
      .filter((item) =>
        item.nickname.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) =>
        statusFilter === "ALL" ? true : item.status === statusFilter
      );
  }, [itemsWithReports, search, statusFilter]);

  // SORTING
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const valA = a[sortField]?.toString().toLowerCase();
      const valB = b[sortField]?.toString().toLowerCase();

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortField, sortDirection]);

  // PAGINATION
  const totalPages = Math.ceil(sortedItems.length / pageSize);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, page]);

  // NAVIGATION
  const handleCreate = () => navigate("/create-item");
  const handleItemDetails = (id) => navigate(`/item-details/${id}`);
  const handleReportsList = (id) => navigate(`/item-reports/${id}`);

  return {
    items: pagedItems,
    loading: loading || authLoading,
    error,

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

    // Paging
    page,
    totalPages,
    setPage,

    // Navigation
    handleCreate,
    handleItemDetails,
    handleReportsList,
  };
};