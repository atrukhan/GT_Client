import React, {useState, useContext} from 'react'
import styles from './styles.module.scss'
import { Context } from '../../../index';
import axios from "../../../api/axios";

const AddCard = ({handleClick}) => {

  return (
   
    <div className={styles.add} onClick={() => { handleClick(true)}}>
          <div>
            <h1>+</h1>
          </div>
    </div>
  )
}

export default AddCard