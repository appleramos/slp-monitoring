import React from 'react'

const Stat = ({ label, icon, value, }) => {
  return (
    <div className="axie-stat">
      <div className="stat-label">{ label }</div>
      <div style={{ display: 'flex' }}>
        <div className="icon-container"><img src={ icon } alt={ label }/></div>
        <div>{ value }</div>
      </div>
    </div>
  )
}

export default Stat
