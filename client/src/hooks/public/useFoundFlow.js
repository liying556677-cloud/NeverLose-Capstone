import { useState, useEffect } from "react";
import { publicApi } from "../../api/publicApi";
import { useNavigate } from "react-router-dom";

export function useFoundFlow(token) {
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoUrl, seturl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [reportData, setReportData] = useState({
    finder: { name: "", email: "", phone: "" },
    message: "",
    foundLocationText: "",
    photoUrl: "",
  });

  useEffect(() => {
    //todo: token naver change
    async function load() {
      setLoading(true);
      try {
        const res = await publicApi.getItem(token);
        setItem(res.data);
        setError(null);
      } catch (err) {
        console.error("Error loading item:", err);
        setError(err.response?.data?.message || "Item not found");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return {
    step,
    next,
    back,
    item,
    loading,
    error,
    verificationAnswer,
    setVerificationAnswer,
    photoUrl,
    seturl,
    reportData,
    setReportData,
    isSubmitting,
    setIsSubmitting,
    setError,
  };
}
