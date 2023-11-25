import React, { useContext, useEffect } from 'react'
import { Context } from '../../index';
import './style.css'

const AsidePanel = ({styleName, title, children}) => {

    

  return (
    <div className={`aside__panel paper ${styleName}`}>
        <h3 className='aside__title'>
            <span className="aside__title-inner">{title}</span>
        </h3>   
        <div className='aside__content'>
            {/* {store.topUsers.map((object, i) => <TopUser nickname={object.nikname} rank={i+1}  key={i} />)} */}
            {children}
        </div>
    </div>
  )
}

export default AsidePanel