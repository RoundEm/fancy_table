import React, { Component } from 'react'
import plusSignIcon from './assets/001-add.svg'
import minusSignIcon from './assets/002-minus.svg'

// TODO: change back to functional component
export default class TodoTableRow extends Component {
  render() {
    let todo = this.props.todo

    let priorDate 
    if (this.props.index === 0) priorDate = ''
    else priorDate = this.props.dataArray[this.props.index - 1].date
    
    return (
      <tr>
        {priorDate === '' || todo.date !== priorDate
          ? <>
              <td>
                <img 
                  src={minusSignIcon} 
                  alt="Minus sign to collapse rows" 
                />
              </td>
              <td colSpan="5"></td>
            </>  

          : <>
              <td></td>
              <td>{todo.date}</td>
              <td>{todo.id}</td>
              <td>{todo.account}</td>
              <td>{todo.email}</td>
              <td>{todo.amount}</td>
            </> 
        }
      </tr>
    )
  }
}
