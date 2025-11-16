import { useState } from "react";
import "./App.css";
import ComplexForm from "./components/ComplexForm";

export default function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("表单已提交:", data);
  };

  return (
    <div className="app-container">
      <div className="form-section">
        <h1>Puppeteer 自动化测试表单</h1>
        <ComplexForm onSubmit={handleFormSubmit} />
      </div>

      {formData && (
        <div className="result-section">
          <h2>提交结果</h2>
          <div className="result-content">
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
