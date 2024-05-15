import React, { useState } from 'react'
import styles from './styles.module.scss'

const TrainingCard = ({ style, value, translation }) => {

  const [exampleVisability, setExampleVisability] = useState(false);

  const handleTurn = () => {
    setExampleVisability(!exampleVisability)
  }

  return (

    <div className={styles.tinder__card} style={style}>
      <h3>Card 1</h3>
      <p>This is a demo for Tinder like swipe cards</p>
    </div>

  )
}

export default TrainingCard