import React from 'react'
import './style.css'

const CustomButton = ({name, handleClick}) => {
  return (
    <button className='custom-btn' onClick={handleClick}>{name}</button>
  )
}

export default CustomButton