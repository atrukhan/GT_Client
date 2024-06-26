import React, {useContext, useState, useEffect} from 'react'
import styles from './styles.module.scss'
import Header from '../../components/Header'
import MainPageContent from '../MainPageContent'
import { Context } from '../../index'
import axios from "../../api/axios";

const MainPage = () => {

  const store = useContext(Context)
  const [update, setUpdate] = useState(false);

  const [user, setUser] = useState(null)

  const checkAuth = async () => {
      try{
          const response = await axios.post('/api/user/check_auth')
          if(response.status == 200){
              return {"nickname":response.data.nickname, "email": response.data.email, "id": response.data.id}
          } else {
              return null
          }
      } catch (e) {
          console.log(e.response?.data?.message)
          return null;
      }
  }


  useEffect(() => {
    checkAuth().then(result => setUser(result))
    store.setCallbackDarkMode((v) => {setUpdate(v)})
  }, [])

  return (
    <div className={store.isDarkMode ? `${styles.body} ${styles.dark_mode_variables}` : styles.body}>
      <div className={styles.container}>
          <Header user={user}/>
          <MainPageContent user={user} setUser={setUser}/>
      </div>
    </div>
  )
}

export default MainPage