import React, { useState } from "react";
import "./WICIKIOnboarding.css"; // Your CSS file

const WICIKIOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: "",
    gender: "",
    birthday: { day: "", month: "", year: "" },
    bio: "",
    interests: [],
    privacy: {
      profileVisible: true,
      allowMessages: true,
      showBirthday: false,
      allowTagging: true,
    },
  });

  const totalSteps = 8;

  const interestsList = [
    "Photography","Travel","Music","Sports","Reading","Cooking","Gaming",
    "Art","Technology","Fitness","Movies","Fashion","Nature","Dancing",
    "Writing","Science"
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData("profilePicture", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.profilePicture;
      case 2: return formData.fullName.trim().length > 0;
      case 3: return !!formData.gender;
      case 4:
        return formData.birthday.day && formData.birthday.month && formData.birthday.year;
      default: return true;
    }
  };

  const handleSubmit = () => {
    console.log("Onboarding completed:", formData);
    alert("Welcome to WICIKI! Your profile has been created successfully.");
    window.location.href = "/";
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
              <div className="profile-img-q"></div>
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
                  <ion-icon name="camera-outline"></ion-icon>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="profile-upload"
              />
              <label htmlFor="profile-upload" className="upload-btn">Choose Photo</label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2 className="step-title">What's Your Name?</h2>
            <p className="step-description">
              Enter your full name as you'd like it to appear on your profile.
            </p>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.fullName || ""}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2 className="step-title">Select Your Gender</h2>
            <p className="step-description">
              This helps us personalize your experience and connect you with relevant content.
            </p>
            <div className="gender-options">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map((gender) => (
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

      case 4:
        return (
          <div className="step-content">
            <h2 className="step-title">When's Your Birthday?</h2>
            <p className="step-description">We'll use this to celebrate with you and show age-appropriate content.</p>
            <div className="form-group">
              <label className="form-label">Birthday</label>
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
                    "January","February","March","April","May","June",
                    "July","August","September","October","November","December"
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

      case 5:
        return (
          <div className="step-content">
            <h2 className="step-title">Tell Us About Yourself</h2>
            <p className="step-description">
              Write a short bio to help others get to know you better.
            </p>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-input form-textarea"
                value={formData.bio || ""}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        );

      case 6:
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

      case 7:
        return (
          <div className="step-content">
            <h2 className="step-title">Privacy Settings</h2>
            <p className="step-description">
              Choose how you want to interact with others on WICIKI.
            </p>
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

      case 8:
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
    <div className="onboarding-container">
      <div className="header">
        <div className="logo">WICIKI</div>
        <div className="subtitle">Create Your Profile</div>
      </div>

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
          <button className="nav-btn btn-next" onClick={handleSubmit}>
            Complete Setup
          </button>
        )}
      </div>

      <button className="nav-btn btn-skip" onClick={() => window.location.href = "/"}>
        Skip
      </button>
    </div>
  );
};

export default WICIKIOnboarding;
