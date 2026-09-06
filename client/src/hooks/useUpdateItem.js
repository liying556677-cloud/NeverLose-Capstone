import { useState } from "react";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";
export function useUpdateItem(itemId) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateItem = async (data) => {
    setLoading(true);
    try {
      return await itemApi.updateItem(itemId, data);
    } 
    catch(error)
    {
      navigate("/error", {
    state: {
      title: "Item updation Failed",
      message: "We couldn’t update your item. Please try again.",
      
    },
  });
    }
    finally {
      setLoading(false);
    }
  };

  return { updateItem, loading };
}