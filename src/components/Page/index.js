import React, {useEffect, useContext, useState} from 'react'
import Aside from '../Aside';
import './style.css'
import { Context } from '../../index';
import Library from '../Libraries';

const Page = () => {

  const store = useContext(Context)
  const [update, setUpdate] = useState(1);

  useEffect(() => {
    //   store.getTopUsers()
    store.setCallbackMainComponent((v) => {setUpdate(v)})
  }, [])


  const loadMainComponent = () => {
    switch (store.mainComponent) {
      case store.mainComponents.main:
        return "";
      case store.mainComponents.library:
        return <Library/>;  
    }
  }

  return (
    <div className='page__container'>
      <Aside/>
      <main>
        {loadMainComponent()}
      </main>
      
    </div>
    
    
  )
}

export default Page