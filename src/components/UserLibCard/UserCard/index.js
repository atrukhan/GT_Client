import React, {useState} from 'react'
import styles from './styles.module.scss'

const UserCard = ({value, translation, example}) => {

  const [exampleVisability, setExampleVisability] = useState(false);

  const handleTurn = () => {
    setExampleVisability(!exampleVisability)
  }

  return (

    <div className={styles.status} onClick={() => {handleTurn()}}>

      {exampleVisability ? (
        <div className={styles.info}>
          <h3>{example}</h3>
        </div>
      ) : ( 
        <div className={styles.info}>
          <h1>{value}</h1>
          <h3>{translation}</h3>
        </div>
      )}
      
           
    </div>
   
  )
}

export default UserCard