

// WICIKIOnboarding.js
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import "./WICIKIOnboarding.css";

const WICIKIOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyModalValue, setCompanyModalValue] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: "",
    role: "",
    companyName: "",
    gender: "",
    birthday: { day: "", month: "", year: "" },
    bio: "",
    interests: [],
    location: {
      lat: null,
      lng: null,
      address: "",
    },
    privacy: {
      profileVisible: true,
      allowMessages: true,
      showBirthday: false,
      allowTagging: true,
      ShowAllMentors: true,
      ShowUnknownGists: true,
    },
  });

  const totalSteps = 11;
  const interestsList = [
    "Photography", "Travel", "Music", "Sports", "Reading", "Cooking", "Gaming",
    "Art", "Technology", "Fitness", "Movies", "Fashion", "Nature", "Dancing",
    "Writing", "Science"
  ];

  const updateFormData = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (interest) =>
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));

  const togglePrivacy = (setting) =>
    setFormData((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [setting]: !prev.privacy[setting] },
    }));

  // Cloudinary upload handler (no credentials, no custom headers)
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    const MAX_MB = 6;
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_MB} MB`);
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => updateFormData("profilePicture", e.target.result);
    reader.readAsDataURL(file);

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "wiciki-picture"); // unsigned preset

    setUploadLoading(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dznitipi9/image/upload",
        form,
        {
          withCredentials: false, // IMPORTANT — do not send credentials
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          },
        }
      );

      const secureUrl = res.data?.secure_url;
      if (secureUrl) {
        updateFormData("profilePicture", secureUrl);
        toast.success("Profile picture uploaded!");
      } else {
        throw new Error("No secure_url returned from Cloudinary");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err.response?.data || err.message || err);
      toast.error("Image upload failed. Try again.");
    } finally {
      setUploadLoading(false);
      setUploadProgress(0);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.profilePicture && !uploadLoading;
      case 2:
        return !!formData.role;
      case 3:
        return formData.fullName.trim().length > 0;
      case 4:
        return !!formData.gender;
      case 5:
        return formData.birthday.day && formData.birthday.month && formData.birthday.year;
      case 6:
        return !!(formData.location && formData.location.lat && formData.location.lng) || !!formData.location.address;
      default:
        return true;
    }
  };

  const [loadingthis, setloadingthis] = useState(false);

  // ---------- FIXED handleSubmit ----------
  const handleSubmit = async () => {
    try {
      setloadingthis(true);

      const token = Cookies.get("token");
      if (!token) {
        setloadingthis(false);
        alert("You are not logged in!");
        return;
      }

      // Build DOB
      const DOB = `${formData.birthday.day || ""}-${formData.birthday.month || ""}-${formData.birthday.year || ""}`;

      // Ensure presentlocation is a string. Prefer address, otherwise fallback to lat,lng.
      let presentlocation = "";
      if (formData.location && formData.location.address && String(formData.location.address).trim()) {
        presentlocation = String(formData.location.address).trim();
      } else if (formData.location && formData.location.lat && formData.location.lng) {
        presentlocation = `${formData.location.lat},${formData.location.lng}`;
      } else {
        presentlocation = ""; // send empty string (server should handle gracefully)
      }

      // Convert Interest to a JSON string to avoid server CastError when schema expects String.
      const interestPayload = Array.isArray(formData.interests) ? JSON.stringify(formData.interests) : String(formData.interests || "");

      const payload = {
        picture: formData.profilePicture || "",
        NickName: formData.fullName || "",
        Gender: formData.gender || "",
        DOB,
        BIO: formData.bio || "",
        whoareyou: formData.role || "",
        presentlocation,            // IMPORTANT: send as string
        Interest: interestPayload,  // IMPORTANT: send string (JSON) so backend won't cast error
        companyname: formData.companyName || "",
        profilevisibility: formData.privacy.profileVisible,
        allowMessages: formData.privacy.allowMessages,
        showBirthday: formData.privacy.showBirthday,
        allowTagging: formData.privacy.allowTagging,
        ShowAllMentors: formData.privacy.ShowAllMentors,
        ShowUnknownGists: formData.privacy.ShowUnknownGists,
      };

      // DEBUG: log outgoing payload so you can inspect network body
      console.log(">>> Sending payload to /decode/update:", payload);

      const res = await fetch("https://wicikibackend.onrender.com/decode/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Read and parse response safely
      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      console.log(">>> /decode/update response status:", res.status, "body:", data);

      if (res.ok) {
        toast.success("Profile updated successfully!");
        console.log("Updated user:", data.user || data);
        window.location.href = "/";
      } else {
        console.error("Update failed:", data);
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Something went wrong while updating your profile.");
    } finally {
      setloadingthis(false);
    }
  };
  // ---------- end handleSubmit ----------

  const openCompanyModal = (initialValue = "") => {
    setCompanyModalValue(initialValue);
    setShowCompanyModal(true);
  };

  const closeCompanyModal = () => {
    setShowCompanyModal(false);
    setCompanyModalValue("");
  };

  const saveCompanyName = () => {
    updateFormData("companyName", companyModalValue.trim());
    setShowCompanyModal(false);
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          location: { ...prev.location, lat, lng },
        }));

        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || "";
        if (apiKey) {
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
            );
            const data = await res.json();
            if (data && data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, lat, lng, address },
              }));
            }
          } catch (err) {
            console.error("Reverse geocode failed:", err);
          }
        }
        setLoadingLocation(false);
      },
      (error) => {
        setLoadingLocation(false);
        console.error("Geolocation error:", error);
        alert("Could not get location. Please allow location permissions or try again.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <h2 className="step-title">Welcome to WICIKI!</h2>
            <p className="step-description">
              Let's set up your profile in just a few steps. This will help you
              connect with friends and discover amazing content.
            </p>
            <div className="contain-q">
              <div className="profile-img-q" />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <h2 className="step-title">Add a Profile Picture</h2>
            <p className="step-description">Help friends recognize you by adding a profile picture.</p>
            <div className="profile-upload">
              <div className="profile-preview">
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt="Profile" />
                ) : (
                  <div className="camera-placeholder">📷</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="profile-upload"
                disabled={uploadLoading}
              />
              <label
                htmlFor="profile-upload"
                className="upload-btn"
                style={{ cursor: uploadLoading ? "not-allowed" : "pointer" }}
              >
                {uploadLoading ? `Uploading ${uploadProgress}%` : "Choose Photo"}
              </label>

              {uploadLoading && (
                <div style={{ marginTop: 8 }}>
                  <small>Uploading... {uploadProgress}%</small>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2 className="step-title">Who are you on WICIKI?</h2>
            <p className="step-description">Choose how you want to appear on the platform.</p>
            <div className="role-options">
              {[
                { key: "Company", label: "Company" },
                { key: "Mentor", label: "Mentor" },
                { key: "JobSeeker", label: "Job Seeker" },
                { key: "Other", label: "Other" },
              ].map((r) => (
                <div
                  key={r.key}
                  className={`role-option ${formData.role === r.key ? "selected" : ""}`}
                  onClick={() => {
                    updateFormData("role", r.key);
                    if (r.key === "Company") openCompanyModal(formData.companyName || "");
                  }}
                >
                  {r.label}
                </div>
              ))}
            </div>

            {formData.role === "Company" && formData.companyName && (
              <div className="company-summary">
                <strong>Company name:</strong> {formData.companyName}
                <button
                  className="edit-company-btn"
                  onClick={() => openCompanyModal(formData.companyName)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2 className="step-title">What's Your Nick Name?</h2>
            <p className="step-description">Enter your Nick Name as you'd like it to appear on your profile.</p>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={formData.fullName || ""}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your Nick Name"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2 className="step-title">Select Your Gender</h2>
            <p className="step-description">This helps us personalize your experience and connect you with relevant content.</p>
            <div className="gender-options">
              {["Male", "Female", "Others"].map((gender) => (
                <div
                  key={gender}
                  className={`gender-option ${formData.gender === gender ? "selected" : ""}`}
                  onClick={() => updateFormData("gender", gender)}
                >
                  {gender}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2 className="step-title">When's Your Birthday?</h2>
            <p className="step-description">We'll use this to celebrate with you and show age-appropriate content.</p>
            <div className="form-group">
              <div className="date-inputs">
                <select
                  className="form-input"
                  value={formData.birthday.month || ""}
                  onChange={(e) =>
                    updateFormData("birthday", { ...formData.birthday, month: e.target.value })
                  }
                >
                  <option value="">Month</option>
                  {[
                    "January", "February", "March", "April", "May", "June", "July", "August",
                    "September", "October", "November", "December"
                  ].map((month, i) => (
                    <option key={i} value={i + 1}>{month}</option>
                  ))}
                </select>

                <select
                  className="form-input"
                  value={formData.birthday.day || ""}
                  onChange={(e) =>
                    updateFormData("birthday", { ...formData.birthday, day: e.target.value })
                  }
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <select
                  className="form-input"
                  value={formData.birthday.year || ""}
                  onChange={(e) =>
                    updateFormData("birthday", { ...formData.birthday, year: e.target.value })
                  }
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h2 className="step-title">Share Your Location</h2>
            <p className="step-description">Allowing location helps WICIKI show nearby opportunities and local content.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 15 }}>
              <input
                type="text"
                className="form-input"
                value={formData.location.address || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, address: e.target.value },
                  }))
                }
                placeholder="Enter your Location (address)"
              />
            </div>

            <div className="location-actions">
              <button className="nav-btn btn-next" onClick={detectLocation} disabled={loadingLocation}>
                {loadingLocation ? "Detecting..." : "Use My Current Location"}
              </button>
            </div>

            {formData.location && formData.location.lat && formData.location.lng && (
              <div className="location-preview" style={{ marginTop: 16 }}>
                <div><strong>Latitude:</strong> {formData.location.lat}</div>
                <div><strong>Longitude:</strong> {formData.location.lng}</div>
                {formData.location.address && <div><strong>Address:</strong> {formData.location.address}</div>}
                <div style={{ marginTop: 12 }}>
                  <iframe
                    title="map"
                    src={`https://www.google.com/maps?q=${formData.location.lat},${formData.location.lng}&z=15&output=embed`}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2 className="step-title">Tell Us About Yourself</h2>
            <p className="step-description">Write a short bio to help others get to know you better.</p>
            <div className="form-group">
              <textarea
                className="form-input form-textarea"
                value={formData.bio || ""}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-content">
            <h2 className="step-title">What Are You Interested In?</h2>
            <p className="step-description">Select your interests to help us show relevant content.</p>
            <div className="interests-grid">
              {interestsList.map((interest) => (
                <div
                  key={interest}
                  className={`interest-tag ${formData.interests.includes(interest) ? "selected" : ""}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="step-content">
            <h2 className="step-title">Privacy Settings</h2>
            <p className="step-description">Choose how you want to interact with others on WICIKI.</p>
            <div className="privacy-options">
              {Object.entries(formData.privacy).map(([key, value]) => (
                <div className="privacy-item" key={key}>
                  <div style={{ fontWeight: 500 }}>{key.replace(/([A-Z])/g, " $1")}</div>
                  <div
                    className={`privacy-toggle ${value ? "active" : ""}`}
                    onClick={() => togglePrivacy(key)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="step-content">
            <h2 className="step-title">Review Your Profile</h2>
            <p className="step-description">Take a moment to review your information.</p>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Profile Picture</div>
                <div className="summary-value">
                  {formData.profilePicture ? "Added ✓" : "Not added"}
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Role</div>
                <div className="summary-value">{formData.role || "Not selected"}</div>
              </div>

              {formData.role === "Company" && (
                <div className="summary-item">
                  <div className="summary-label">Company Name</div>
                  <div className="summary-value">{formData.companyName || "Not provided"}</div>
                </div>
              )}

              <div className="summary-item">
                <div className="summary-label">Full Name</div>
                <div className="summary-value">{formData.fullName || "Not provided"}</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Gender</div>
                <div className="summary-value">{formData.gender || "Not selected"}</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Birthday</div>
                <div className="summary-value">
                  {formData.birthday.month && formData.birthday.day && formData.birthday.year
                    ? `${formData.birthday.month}/${formData.birthday.day}/${formData.birthday.year}`
                    : "Not provided"}
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Location</div>
                <div className="summary-value">
                  {formData.location && formData.location.lat
                    ? `${formData.location.lat}, ${formData.location.lng}`
                    : "Not provided"}
                  {formData.location.address ? ` — ${formData.location.address}` : ""}
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Bio</div>
                <div className="summary-value">{formData.bio || "No bio added"}</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Interests</div>
                <div className="summary-value">
                  {formData.interests.length > 0
                    ? formData.interests.join(", ")
                    : "No interests selected"}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onita">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="onboarding-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="step-container">{renderStep()}</div>

        <div className="navigation">
          {currentStep > 0 && (
            <button className="nav-btn btn-back" onClick={prevStep}>Back</button>
          )}

          {currentStep < totalSteps - 1 ? (
            <button className="nav-btn btn-next" onClick={nextStep} disabled={!canProceed()}>
              Next
            </button>
          ) : (
            <button
              className="nav-btn btn-next"
              onClick={handleSubmit}
              style={{ opacity: loadingthis && 0.6, cursor: loadingthis ? "no-drop" : "pointer" }}
              disabled={loadingthis}
            >
              {loadingthis ? "loading.." : "Complete Setup"}
            </button>
          )}
        </div>

        <button className="nav-btn btn-skip" onClick={() => (window.location.href = "/")}>
          Skip
        </button>

        {showCompanyModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Enter your Company Name</h3>
              <input
                type="text"
                className="form-input"
                placeholder="Company name"
                value={companyModalValue}
                onChange={(e) => setCompanyModalValue(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button
                  className="nav-btn btn-next"
                  onClick={() => {
                    saveCompanyName();
                  }}
                  disabled={!companyModalValue.trim()}
                >
                  Save
                </button>
                <button
                  className="nav-btn btn-back"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, companyName: "" }));
                    closeCompanyModal();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default WICIKIOnboarding;
