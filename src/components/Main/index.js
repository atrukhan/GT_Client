import React, {useContext, useState, useEffect} from 'react'
import Header from '../../components/Header'
import Page from '../Page'
import { Context } from '../../index'

const Main = () => {

  const store = useContext(Context)
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    store.setCallbackDarkMode((v) => {setUpdate(v)})
  }, [])

  return (
    <div className={store.isDarkMode ? 'body dark-mode-variables' : 'body'}>
      <div className='container'>
          <Header/>
          <Page />
      </div>
    </div>
  )
}

export default Main