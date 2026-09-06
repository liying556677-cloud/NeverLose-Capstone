// hooks/useDeleteItem.js
import { useState, useCallback } from "react";
import itemApi from "../api/itemApi";

export function useDeleteItem(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteItem = useCallback(async (itemId) => {
    try {
      setLoading(true);
      setError("");

      
     await itemApi.deleteItem(itemId)
      return { ok: true };
    } catch (err) {
      console.error("Delete item error:", err);
      setError("Unable to delete item. Please try again.");
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteItem, loading, error };
}