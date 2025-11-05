import { useState } from 'react'
import ComplexForm from './components/ComplexForm'
import './App.css'

export default function App() {
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
    console.log('表单已提交:', data)
  }

  return (
    <div className="app-container">
      <div className="form-section">
        <h1>Puppeteer 自动化测试表单</h1>
        <p className="subtitle">这是一个复杂的表单，用于演示 Puppeteer 的自动填表功能</p>
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
  )
}
