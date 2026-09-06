// hooks/useFormData.js
import { useState, useEffect } from "react";

export function useEditFormData(initialItem) {
  const [formData, setFormData] = useState({
    nickname: "",
    description: "",
    securityQuestion: "",
    status: "",
    photoUrl: "",
    photoFile: null,
    enableVarification:false
  });

  // Load initial item into form
  useEffect(() => {
    if (initialItem) {
     setFormData({
  nickname: initialItem.nickname || "",
  description: initialItem.description || "",
  securityQuestion: initialItem.verification?.question || "",
  status: initialItem.status || "",
  photoUrl: initialItem.photoUrl || "",
  photoFile: null,
  enableVarification: initialItem.verification?.enabled || false,
});

    }
  }, [initialItem]);

  // Generic text handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Photo handler
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      photo: previewUrl,
      photoUrl: file,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handlePhotoChange,
  };
}