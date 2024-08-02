"use client";

import React, { useState } from "react";

interface FormProps {
  onSubmit: (data: {
    title: string;
    options: string[];
    selectedImage: string;
  }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      title,
      options: options.split(",").map((opt) => opt.trim()),
      selectedImage,
    };

    // Optionally call onSubmit with the form data
    onSubmit(formData);

    // Send form data to the API
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter frame title"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Options (comma separated):
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="e.g. yes, no, maybe"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Select Image URL:
          <input
            type="text"
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
