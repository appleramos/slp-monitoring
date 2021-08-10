import React from 'react'

const Axie = ({ data }) => {
  const {
    image='',
    id,
    name
  } = data
  return (
    <div className="axie-container" key={ id }>
      <div>
        <div>
          <a href={ `https://marketplace.axieinfinity.com/axie/${id}` } target="_blank">#{id}</a>
        </div>
        <div className="font-weight-bold">{name}</div>
      </div>
      <img src={ image } alt="Axie img" className="axie-img"/>
    </div>
  )
}

export default Axie
