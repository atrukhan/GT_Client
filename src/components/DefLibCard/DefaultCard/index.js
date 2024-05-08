import React, {useState} from 'react'
import './style.css'

const DefaultCard = ({value, translation, example}) => {

  const [exampleVisability, setExampleVisability] = useState(false);

  const handleTurn = () => {
    setExampleVisability(!exampleVisability)
  }

  return (

    <div className="status" onClick={() => {handleTurn()}}>

      {exampleVisability ? (
        <div className="info">
          <h3>{example}</h3>
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

export default DefaultCard