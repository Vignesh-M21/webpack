import React, { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation regex
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one symbol, and one number.";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // Successful login trigger
    console.log("Login successful:", formData);
    setErrors({});
    setSuccessMessage("Login successful!");
  };

  // Render input field
  const renderInput = (label, name, type) => (
    <div key={label}>
      <label htmlFor={label}>{`${label}:`}</label>
      <input
        type={type}
        name={name}
        id={label}
        value={formData[name]}
        onChange={handleChange}
        required
      />
      {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {renderInput("Email", "email", "email")}
      {renderInput("Password", "password", "password")}
      <button type="submit">Login</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
}

export default LoginForm;
