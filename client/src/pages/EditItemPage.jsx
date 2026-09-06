import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItemDetails } from "../hooks/useItemDetails";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout/MainLayout";
import EditItemComponent from "../components/EditItemComponent/EditItemComponent";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

const EditItemPage = () => {
  const { id } = useParams();//Get item ID from URL 
  const [itemData, setItemData] = useState(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const { item, loading, error } = useItemDetails(id);

  useEffect(() => {
    if (item) setItemData(item);
  }, [item]);

  if (authLoading || loading) return <LoadingSpinner message="Loading..." />;

  if (!itemData) return <div>Loading...</div>;

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="px-0">
        <EditItemComponent item={itemData} />
      </div>
    </MainLayout>
  );
};

export default EditItemPage;
