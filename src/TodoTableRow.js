import React from 'react'

const TodoTableRow = (props) => {
  return (
    <tr key={props.todo.id}>
        <td></td>
        <td>{props.todo.date}</td>
        <td>{props.todo.id}</td>
        <td>{props.todo.account}</td>
        <td>{props.todo.email}</td>
        <td>{props.todo.amount}</td>
    </tr>
  )
}

export default TodoTableRow
