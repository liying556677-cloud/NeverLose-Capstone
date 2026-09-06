import React, { useContext, useState } from "react"; 
import { AuthContext } from "../context/AuthContext";// Used to get logged-in user info
import ItemForm from "../components/item/ItemForm";
import VerificationStep from "../components/item/VerificationStep";
import ReviewStep from "../components/item/ReviewStep";
import itemApi from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function CreateItemPage() {
  const { user, loading: authLoading } = useContext(AuthContext);// Get logged-in user,loading state from AuthContext

  const [step, setStep] = useState(1);
  // Store form data across all steps
  const [form, setForm] = useState({
    nickname: "",
    description: "",
    photoUrl: "",
    verification: { enabled: false, question: "" },
  });

  const navigate = useNavigate();//Hook for navigation

  async function handleCreate() {
    try {
       const res = await itemApi.create(form);
    navigate(`/item-details/${res.data.itemId}`);
    }catch (error) {
  console.error("Error in item creation:", error);

  navigate("/error", {
    state: {
      title: "Item Creation Failed",
      message: "We couldn’t create your item. Please try again.",
      
    },
  });
}

  }

  return (
    <MainLayout username={user?.displayName || "User"}>
      <div className="max-w-xl mx-auto">
        {/* Item form */}
        {step === 1 && (
          <ItemForm form={form} setForm={setForm} next={() => setStep(2)} />
        )}
        {/* Verification step */}
        {step === 2 && (
          <VerificationStep
            form={form}
            setForm={setForm}
            next={() => setStep(3)}
            back={() => setStep(1)}
          />
        )}
       {/* Review step */}
        {step === 3 && (
          <ReviewStep
            form={form}
            back={() => setStep(2)}
            create={handleCreate}
          />
        )}
      </div>
    </MainLayout>
  );
}
