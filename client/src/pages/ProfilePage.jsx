import React, { useContext, useEffect, useState } from "react";

import userApi from "../api/userApi";

import MainLayout from "../layouts/MainLayout/MainLayout";

import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contactPreference: "",
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await userApi.me();

        setProfile(response.data);

        setFormData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          contactPreference: response.data.contactPreference || "",
        });
      } catch (err) {
        console.error("Load profile error:", err);

        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
  try {
    const response = await userApi.updateProfile(formData);

    setProfile(response.data);

    setIsEditing(false);
  } catch (err) {
    console.error("Update profile error:", err);

    setError("Unable to update profile.");
  }
};

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="text-white text-center mt-5">
        Please log in first.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center mt-5">
        {error}
      </div>
    );
  }

  return (
    <MainLayout username={profile?.name || user?.displayName || "User"}>
      <div className="container py-4">
        <h2 className="text-white fw-bold mb-4">
          My Profile
        </h2>

        <div className="card p-4 shadow-sm">

          <div className="mb-3">
            <strong>Name</strong>

            {isEditing ? (
              <input
                type="text"
                name="name"
                className="form-control mt-1"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <div>{profile?.name || "Not provided"}</div>
            )}
          </div>

          <div className="mb-3">
            <strong>Email</strong>

            <div>
              {profile?.email || user?.email || "Not provided"}
            </div>
          </div>

          <div className="mb-3">
            <strong>Phone Number</strong>

            {isEditing ? (
              <input
                type="text"
                name="phone"
                className="form-control mt-1"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <div>{profile?.phone || "Not provided"}</div>
            )}
          </div>

          <div className="mb-3">
            <strong>Contact Preference</strong>

            {isEditing ? (
              <select
                name="contactPreference"
                className="form-select mt-1"
                value={formData.contactPreference}
                onChange={handleChange}
              >
                <option value="">Select preference</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            ) : (
              <div>
                {profile?.contactPreference || "Not provided"}
              </div>
            )}
          </div>

          {!isEditing ? (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);

                  setFormData({
                    name: profile?.name || "",
                    phone: profile?.phone || "",
                    contactPreference:
                      profile?.contactPreference || "",
                  });
                }}
              >
                Cancel
              </button>

              <button 
               className="btn btn-success"
               onClick={handleSave}
               >
                Save Changes
            </button>
            
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;