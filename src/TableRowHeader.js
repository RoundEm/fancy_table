import React from 'react'
import plusSignIcon from './assets/001-add.svg'
import minusSignIcon from './assets/002-minus.svg'

export default function TableRowHeader(props) {
  const toggleCollapseIcon = props.dateCollapsed === true 
    ? plusSignIcon 
    : minusSignIcon

  return (
    <tr className={!props.dateCollapsed ? 'date-header-bgColor' : ''}>
        <th 
          onClick={() => props.toggleCollapsedDates(props.date)}
          className={`collapse-icon ${props.dateCollapsed ? 'date-header-bgColor' : ''}`}
        >
          <img 
              src={toggleCollapseIcon} 
              alt="Icon that toggles collapse of row group" 
          />
        </th>
        <th class="date-header">{props.date}</th>
        <th colSpan="5"></th>
    </tr> 
  )
}
