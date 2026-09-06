import React from "react";
import ReportDetail from "../reportDetail/ReportDetail";

export default function ReportsList({ reports, onUpdateStatus }) {
  return (
    // Container to display all reports in a vertical list
    <div className="d-flex flex-column gap-3">
      {/* Loop through reports and render each report detail  */}
      {reports.map((report) => (
        <ReportDetail
          key={report.id}
          report={report}
          onUpdateStatus={onUpdateStatus} //Pass handler to child component
        />
      ))}
    </div>
  );
}
