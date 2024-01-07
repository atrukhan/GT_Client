import React, {useState} from 'react'
import './style.css'

const CardsItem = ({value, translation, example}) => {

  const [exampleVisability, setExampleVisability] = useState(false);

  const handleTurn = () => {
    setExampleVisability(!exampleVisability)
  }

  return (

    <div className="status" onClick={() => {handleTurn()}}>

      {exampleVisability ? (
        <div className="info">
          <h2>{example}</h2>
        </div>
      ) : ( 
        <div className="info">
          <h1>{value}</h1>
          <h3>{translation}</h3>
        </div>
      )}
      
           
    </div>
   
  )
}

export default CardsItem