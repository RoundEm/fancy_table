import React, { Component } from 'react';
import generateData from './dummyData'
import TodoTableRow from './TodoTableRow'
import TableRowContainer from './TableRowContainer'
import './App.css';

class App extends Component {
  state = {
    todos: [],
    // TODO: get unique dates with Mongo and add them:
    uniqueDates: ['3/26/2019', '3/31/2019']
  }

  // TODO: add function to sort dates
  componentDidMount() {
    this.setState({
      todos: generateData()
    })
  }

  toggleCollapsedDates = date => {
    let todos = this.state.todos
    const toggledTodos = []
    const sliceRangeIndexes = []
    for (let i = 0; i < todos.length; i++) {
      if (date === todos[i].date) {
        const updatedTodo = Object.assign({}, todos[i], {
          hidden: !todos[i].hidden
        })
        console.log('updatedTodo: ', updatedTodo)
        toggledTodos.push(updatedTodo)
        sliceRangeIndexes.push(i)
      }
    }
    console.log('sliceRangeIndexes: ', sliceRangeIndexes)
    this.setState({
      todos: [ 
        ...todos.slice(0, sliceRangeIndexes[0]), 
        ...toggledTodos,
        ...todos.slice(sliceRangeIndexes[sliceRangeIndexes.length - 1] + 1)
      ]
    })   
  }

  render() {
    console.log('State: ', this.state)
    const todos = this.state.todos
    const dates = this.state.uniqueDates

    let tableRows = []
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < todos.length + 1; j++) {
        if (j === 0) {
          tableRows.push(
            <TableRowContainer 
              date={dates[i]} 
              toggleCollapsedDates={this.toggleCollapsedDates}
              key={dates[i]}
            />
          )
        } else if (todos[j - 1].date === dates[i]) {
          tableRows.push(
            <TodoTableRow 
              todo={todos[j - 1]}
              key={todos[j - 1].id}
            /> 
          )
        }
      }
    }
    console.log('tableRows: ', tableRows)
    // this.state.uniqueDates.forEach((date) => {
    //   for (let i = 0; i < todos.length + 1; i++) {
    //     if (i === 0) {
    //       return (
    //         <TableRowContainer 
    //           date={date} 
    //           toggleCollapsedDates={this.toggleCollapsedDates}
    //           key={date}
    //         />
    //       )
    //     } else if (todos[i].date === date) {
    //         return (
    //           <TodoTableRow 
    //             todo={todos[i]}
    //             key={todos[i].id}
    //           /> 
    //         )
    //       }
    //   }
      // return this.state.todos.map((todo, i) => {
      //   if (i === 0) {
      //     return (
      //       <TableRowContainer 
      //         date={date} 
      //         toggleCollapsedDates={this.toggleCollapsedDates}
      //         key={date}
      //       />
      //     )
      //   } else if (todo.date === date) {
      //       return (
      //         <TodoTableRow 
      //           todo={todo}
      //           key={todo.id}
      //         /> 
      //       )
      //     }
      //     else return null
      // })
    // })
    return (
      <div className="App">
        <h1>My Amazing Table</h1>

        <table>
          <thead>
            <tr>
              <th>X</th>
              <th>Date</th>
              <th>ID</th>
              <th>Account</th>
              <th>Email</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {tableRows}

          </tbody>
        </table>
      </div>
    )   
  }
}

export default App;
