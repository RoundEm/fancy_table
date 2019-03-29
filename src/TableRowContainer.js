import React from 'react'
import plusSignIcon from './assets/001-add.svg'
import minusSignIcon from './assets/002-minus.svg'

export default function TableRowContainer(props) {
  return (
    <tr id={props.date}>
        <td onClick={() => props.toggleCollapsedDates(props.date)}>
        <img 
            src={minusSignIcon} 
            alt="Minus sign to collapse rows" 
        />
        </td>
        <td>{props.date}</td>
        <td colSpan="5"></td>
    </tr> 
  )
}
