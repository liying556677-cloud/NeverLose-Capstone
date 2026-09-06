import React from "react";
import "./EditDeleteComponent.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const EditDeleteComponent = ({ onEdit, onDelete }) => {
  return (
    <div className="EditDelete-container">
      {/* Edit button (triggers edit action for item)  */}
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip>Edit the item</Tooltip>}
      >
        <button className="btn btn-edit btn-link p-0 border-0" onClick={onEdit}>
          <i className="bi bi-pencil-fill"></i>
        </button>
      </OverlayTrigger>

      {/* Delete button (triggers delete action for item)  */}
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip>Delete the item</Tooltip>}
      >
        <button
          className="btn btn-delete btn-link p-0 border-0"
          onClick={onDelete}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default EditDeleteComponent;
