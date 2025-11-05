import { useState } from 'react'
import './ComplexForm.css'

export default function ComplexForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    // 基本信息
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',

    // 工作信息
    experience: '',
    startDate: '',
    interests: []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestsChange = (e) => {
    const { value, checked } = e.target
    setFormData(prev => {
      const interests = checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value)
      return {
        ...prev,
        interests
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      birthDate: '',
      experience: '',
      startDate: '',
      interests: []
    })
  }

  return (
    <form onSubmit={handleSubmit} className="complex-form">
      {/* 基本信息部分 */}
      <fieldset>
        <legend>基本信息</legend>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">名字 *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              placeholder="请输入名字"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">姓氏 *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              placeholder="请输入姓氏"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">邮箱 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="请输入邮箱地址"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">电话 *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="请输入电话号码"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthDate">出生日期</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">性别</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">-- 请选择 --</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* 工作信息部分 */}
      <fieldset>
        <legend>工作信息</legend>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="experience">工作经验</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option value="">-- 请选择 --</option>
              <option value="0-1">0-1年</option>
              <option value="1-3">1-3年</option>
              <option value="3-5">3-5年</option>
              <option value="5+">5年以上</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">开始日期</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>兴趣爱好</label>
          <div className="checkbox-group">
            {[
              { id: 'coding', label: '编程' },
              { id: 'design', label: '设计' },
              { id: 'writing', label: '写作' },
              { id: 'music', label: '音乐' },
              { id: 'sports', label: '运动' }
            ].map(item => (
              <label key={item.id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={formData.interests.includes(item.id)}
                  onChange={handleInterestsChange}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* 按钮部分 */}
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          提交表单
        </button>
        <button type="reset" className="btn btn-secondary" onClick={handleReset}>
          重置表单
        </button>
      </div>
    </form>
  )
}
