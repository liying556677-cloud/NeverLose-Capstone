import { useState, useEffect, useContext } from "react";
import itemApi from "../api/itemApi";
import { AuthContext } from "../context/AuthContext";

export function useItemDetails(id) {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;     // wait for Firebase
    if (!user) return;           // no user → no request
    if (!id) return;

    async function load() {
      setLoading(true);
      try {
        const res = await itemApi.getItemById(id);
        setItem(res);
        setError("");
      } catch (err) {
        setError("Item not found.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, user, authLoading]);   // <— FIXED

  return { item, loading, error };
}