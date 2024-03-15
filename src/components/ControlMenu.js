import React from 'react'

function ControlMenu({ formOption, onChange, value }) {
  return (
    <select
      className="ControlMenu"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {formOption.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default ControlMenu
