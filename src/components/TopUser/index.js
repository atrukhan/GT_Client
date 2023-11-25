import React from 'react'
import './style.css'

const TopUser = ({nickname, rank, imgSrc, exp, lvl, barWidth}) => {
  return (
    <div className='top-user'>
        <img className='lazyload top-user__avatar loaded' src={imgSrc}/>
        <div className='top-user__body'>
            <div className='top-user__username'>
                <a className='link-default'>{nickname}</a>  
            </div>
            <div className='top-user__rank'>#{rank}</div>
            <div>
                <div className='top-user__exp'>{exp}</div>
                <div className='top-user__lvl'>{lvl}</div>
            </div>
            <div className='top-user__bar'>
                <div className='top-user__bar-fill' style={`width: ${barWidth}%`}></div>
            </div>
        </div>
    </div>
  )
}

export default TopUser