import React from 'react'
import classes from './button.module.css'
const Button = ({ type, name, onClick, disabled }) => {
  return (
    <button
      className={type === 'SORT' ? [classes.button, classes.sort].join(' ') : [classes.button, classes.newArray].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button