import React, {useEffect, useContext} from 'react'
import './style.css'
import AsidePanel from '../AsidePanel'
import TopUser from '../TopUser'
import { Context } from '../../index';

const Page = () => {

  const store = useContext(Context)

  useEffect(() => {
      store.getTopUsers()
  }, [])


  return (
    <div className='page'>
        <div className='page__inner'>
            <div className='container container_offset'>
                <div className='aside aside_right home-sidebar'>
                    <AsidePanel styleName={'top-user-list'}> 
                      {store.topUsers.map((object, i) => <TopUser nickname={object.nikname} rank={i+1}  key={i} />)}
                    </AsidePanel>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page