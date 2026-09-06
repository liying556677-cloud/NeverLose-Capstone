import React from "react";
import ItemCard from "../itemCard/ItemCard";
import LabelScreen from "../LabelScreen/LabelScreen";
import EditDeleteComponent from "../EditDeleteComponent/EditDeleteComponent";
import { useNavigate } from "react-router-dom";

function ItemDetails({ item, onDelete, loadingDel }) {
  const navigate = useNavigate();//Hook for navigation between pages

  return (
    // Main container for item details 
    <div className="bg-white rounded-4 shadow p-4">
      {/* Item card displaying item info + edit/delete actions */}
      <ItemCard
        data={item}
        onEdit={() => navigate(`/edit-item/${item.id}`)}
        onDelete={onDelete}
        showActions={true}
      />
      {/* Label screen showing QR code and related info  */}
      <div className="mt-4">
        <LabelScreen item={item} embedded />
      </div>
    </div>
  );
}

export default ItemDetails;
