import React from 'react'
import './style.css'

const LibraryItem = ({name, count, percent}) => {
  return (
    <div>
        <div className="status" >
            <div className="info">
                <h3>{name}</h3>
                <h1>{count} Card</h1>
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
    </div>
  )
}

export default LibraryItem