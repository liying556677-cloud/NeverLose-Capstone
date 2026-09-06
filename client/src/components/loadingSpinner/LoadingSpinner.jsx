import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 w-100">
      <Spinner animation="border" variant="light" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="text-white mt-3 fw-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
