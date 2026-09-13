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
        setLoading(true);
        setError("");

        const response = await userApi.me();

        setProfile(response.data);

        setFormData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          contactPreference:
            response.data.contactPreference || "",
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
      setError("");

      const response =
        await userApi.updateProfile(formData);

      setProfile(response.data);

      setFormData({
        name: response.data.name || "",
        phone: response.data.phone || "",
        contactPreference:
          response.data.contactPreference || "",
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Update profile error:", err);

      setError("Unable to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      contactPreference:
        profile?.contactPreference || "",
    });

    setError("");
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

  if (error && !profile) {
    return (
      <div className="text-white text-center mt-5">
        {error}
      </div>
    );
  }

  return (
    <MainLayout
      username={
        profile?.name ||
        user?.displayName ||
        "User"
      }
    >
      <div
        className="container-fluid"
        style={{ maxWidth: "1200px" }}
      >
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-white fw-bold mb-1">
            My Profile
          </h1>

          <p className="text-white-50 mb-0">
            Manage your personal information.
          </p>
        </div>

        {/* Update Error */}
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm">

          {/* Name */}
          <div className="mb-4">
            <label className="fw-semibold text-secondary mb-2 d-block">
              Name
            </label>

            {isEditing ? (
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <p className="mb-0">
                {profile?.name || "Not provided"}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="fw-semibold text-secondary mb-2 d-block">
              Email
            </label>

            <p className="mb-0">
              {profile?.email ||
                user?.email ||
                "Not provided"}
            </p>

            {isEditing && (
              <small className="text-muted">
                Email cannot be changed here.
              </small>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="fw-semibold text-secondary mb-2 d-block">
              Phone Number
            </label>

            {isEditing ? (
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <p className="mb-0">
                {profile?.phone || "Not provided"}
              </p>
            )}
          </div>

          {/* Contact Preference */}
          <div className="mb-4">
            <label className="fw-semibold text-secondary mb-2 d-block">
              Contact Preference
            </label>

            {isEditing ? (
              <select
                name="contactPreference"
                className="form-select"
                value={formData.contactPreference}
                onChange={handleChange}
              >
                <option value="">
                  Select preference
                </option>

                <option value="Email">
                  Email
                </option>

                <option value="Phone">
                  Phone
                </option>
              </select>
            ) : (
              <p className="mb-0">
                {profile?.contactPreference ||
                  "Not provided"}
              </p>
            )}
          </div>

          {/* Buttons */}
          {!isEditing ? (
            <div className="d-flex justify-content-end pt-2">
              <button
                type="button"
                className="btn btn-danger px-4 py-2"
                onClick={() => {
                  setIsEditing(true);
                  setError("");
                }}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-end gap-2 pt-2">

              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger px-4 py-2"
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