import React from 'react'

const TodoTableRow = (props) => {
  const collapsed = {
    display: 'none'
  }
  
  return (
    <tr 
      key={props.todo.id}
      style={props.todo.collapsed ? collapsed : null}
    >
        <td className="empty-td"></td>
        <td>{props.todo.date}</td>
        <td>{props.todo.id}</td>
        <td>{props.todo.account}</td>
        <td>{props.todo.email}</td>
        <td>$ {props.todo.amount}</td>
    </tr>
  )
}

export default TodoTableRow
