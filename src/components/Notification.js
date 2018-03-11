import React from 'react'

const Notification = ({message}) => {
    const divStyle = {
        color: 'darkgreen',
        background: 'lightgreen',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
  if (message === '') {
    return null
  }
  return(
    <div style={divStyle} className='notificaton'>
      { message }
    </div>
  )
}

export default Notification