import React from 'react'
import './style.css'

const LibrariesItem = ({name, count, percent, handleClick, id}) => {
  return (

        <div className="status" onClick={() => {handleClick(id)}}>
            <div className="info">
                <h1>{name}</h1>
                <h2>{count} Cards</h2>
            </div>
            <div className="progresss">
                <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                    <p>{percent}%</p>
                </div>
            </div>
        </div>
  )
}

export default LibrariesItem