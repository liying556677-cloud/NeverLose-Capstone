import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useItemDetails } from "../hooks/useItemDetails";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useConfirmDialog } from "../hooks/useConfirmDialog";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();//Hook for navigation
  const { user, loading: authLoading } = useContext(AuthContext);

  const { item, loading, error } = useItemDetails(id);
  const { deleteItem, loadingDel } = useDeleteItem();
  const confirm = useConfirmDialog();

  const handleDelete = () => {
    confirm.ask(
      "This will permanently delete the item and all associated reports.",
      async () => {
        const result = await deleteItem(id);
        if (result.ok) navigate("/dashboard");
        confirm.close();
      },
    );
  };

  if (authLoading || loading) return <LoadingSpinner message="Loading..." />;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="px-4 pt-4">
        <div className="d-flex flex-column align-items-start mb-3">
          <h3 className="text-white fw-bold mb-2">Item Details</h3>

          <button
            className="btn btn-link text-white text-decoration-none p-0 opacity-hover"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-chevron-left"></i>
            <span className="ms-1">Back</span>
          </button>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ItemDetails
            item={item}
            onDelete={handleDelete}
            loadingDel={loadingDel}
          />
        )}
      </div>

      <ConfirmDialog
        open={confirm.open}
        title="Delete Item?"
        message={confirm.message}
        onConfirm={confirm.onConfirm}
        onCancel={confirm.close}
        variant="delete"
      />
    </MainLayout>
  );
}
