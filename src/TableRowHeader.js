import React from 'react'
import plusSignIcon from './assets/001-add.svg'
import minusSignIcon from './assets/002-minus.svg'

export default function TableRowHeader(props) {
  const toggleCollapseIcon = props.dateCollapsed === true 
    ? plusSignIcon 
    : minusSignIcon

  return (
    <tr>
        <th onClick={() => props.toggleCollapsedDates(props.date)}>
        <img 
            src={toggleCollapseIcon} 
            alt="Minus sign to collapse rows" 
        />
        </th>
        <th>{props.date}</th>
        <th colSpan="5"></th>
    </tr> 
  )
}
