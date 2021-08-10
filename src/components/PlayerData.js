import React from 'react'

const PlayerData = ({ label, img, icon, value, style, }) => {
  return (
    <div className="player-data-view" style={ style }>
      { !!icon ?
        <div className="data-iconn"> { icon } { label } </div>
        : 
        <img alt="SLP Icon" src={ img }/>
      }
      <div className="data-label">{ value }</div>
    </div>
  )
}

export default PlayerData
