import React from "react";
import { Table } from "react-bootstrap";
import "./itemsList.css";

const ItemList = ({
  items,
  page,
  totalPages,
  setPage,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  onItemDetails,
  onReportsList,
}) => {
  return (
    <div
      className="bg-white rounded-4 overflow-hidden shadow p-3 flex-grow-1 d-flex flex-column"
      style={{ width: "100%" }}
    >
      {/* FILTER + SORT BAR */}
      <div className="flex-shrink-0 d-flex flex-wrap gap-2 gap-md-3 mb-4">
        {/* Search */}
        <div className="flex-grow-1" style={{ minWidth: "150px" }}>
          <input
            type="text"
            className="form-control ps-2 shadow-none"
            placeholder="Search nickname..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Selects */}
        <div className="d-flex gap-2 flex-grow-1 flex-md-grow-0">
          <select
            className="form-select w-auto shadow-none"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="SAFE">Safe</option>
            <option value="LOST">Lost</option>
          </select>

          {/* Sort Field */}
          <select
            className="form-select w-auto shadow-none"
            style={{
              backgroundColor: "var(--nl-light-bg)",
              borderRadius: "16px",
              fontSize: "0.85rem",
              paddingRight: "2.5rem",
              border: "1px solid #eceef0",
            }}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="nickname">Name</option>
            <option value="status">Status</option>
          </select>

          {/* Sort Direction */}
          <button
            className="btn btn-outline-secondary px-3"
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? (
              <i className="bi bi-sort-up"></i>
            ) : (
              <i className="bi bi-sort-down"></i>
            )}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-grow-1 overflow-auto">
        <Table responsive className="mb-0 custom-table">
          <thead>
            <tr
              className="text-secondary opacity-75"
              style={{ fontSize: "0.85rem" }}
            >
              <th className="p-3 border-0 w-50">Item Nickname</th>
              <th className="p-3 border-0">Item Status</th>
              <th className="p-3 border-0 d-none d-md-table-cell">
                Last Activity
              </th>
              <th className="p-3 border-0 text-center">Reports</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="align-middle border-bottom border-light shadow-hover"
              >
                <td className="p-3 py-4">
                  <div
                    className="fw-bold text-dark"
                    onClick={() => onItemDetails(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.nickname}
                  </div>

                  <div
                    className="d-md-none text-muted small"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {" "}
                    Last Activity:{" "}
                    {new Date(item.latestEvent.timestamp).toLocaleDateString()}
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`status-dot me-2 ${item.status.toLowerCase()}`}
                  ></span>
                  {item.status}
                </td>

                <td className="p-3 text-muted small small d-none d-md-table-cell">
                  {item.latestEvent.type || "No activity yet"}
                  <br />
                  {new Date(item.latestEvent.timestamp).toLocaleString()}
                </td>

                <td className="p-3 text-center">
                  <button
                    className="btn p-0 border-0 position-relative nl-report-btn"
                    onClick={() => onReportsList(item.id)}
                    disabled={item.reportCount === 0}
                    style={{ transition: "transform 0.2s ease" }}
                  >
                    <i
                      className={`bi bi bi-file-earmark-text fs-4 ${item.reportCount > 0 ? "text-primary" : "text-muted opacity-50"}`}
                    ></i>

                    {item.reportCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill border border-light nl-badge-report"
                        style={{
                          backgroundColor: " var(--nl-info)",
                          color: "var(--nl-deep-blue)",
                          fontSize: "0.80rem",
                          padding: "0.4em 0.6em",
                        }}
                      >
                        {item.reportCount}
                        <span className="visually-hidden">unread reports</span>
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="fw-bold">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemList;
