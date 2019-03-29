import React from 'react'
import plusSignIcon from './assets/001-add.svg'
import minusSignIcon from './assets/002-minus.svg'

export default function TableRowContainer(props) {
  return (
    <tr id={props.date}>
        <th onClick={() => props.toggleCollapsedDates(props.date)}>
        <img 
            src={minusSignIcon} 
            alt="Minus sign to collapse rows" 
        />
        </th>
        <th>{props.date}</th>
        <th colSpan="5"></th>
    </tr> 
  )
}
