import React from 'react'

export const CInputs = ({type, name, className, value, placeholder, onClick, onChange, maxLength}) => {
  return (
    <>
    <input type={type} name={name} className={className} value={value} placeholder={placeholder} onClick={onClick} onChange={onChange} maxLength={maxLength} />
    </>
  )
}
