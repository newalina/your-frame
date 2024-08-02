// app/components/FormWrapper.tsx
"use client"; // Indicates this component is a Client Component

import { useState } from "react";
import Form from "./Form";

interface FormData {
  title: string;
  options: string[];
  selectedImage: string;
}

const FormWrapper = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    // You can also perform other actions, like sending data to an API
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      {formData && (
        <div>
          <h2>Submitted Data</h2>
          <p>
            <strong>Title:</strong> {formData.title}
          </p>
          <p>
            <strong>Options:</strong> {formData.options.join(", ")}
          </p>
          <p>
            <strong>Selected Image:</strong> {formData.selectedImage}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormWrapper;
