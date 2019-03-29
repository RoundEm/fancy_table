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
    for (let i = 0; i < todos.length; i++) {
      if (date === todos[i].date) {
        const updatedTodo = Object.assign({}, todos[i], {
          hidden: !todos[i].hidden
        })
        console.log('updatedTodo: ', updatedTodo)
        // TODO: something is breaking down here or the call to generateData() in comp did mount id screwing it up
        this.setState({
          todos: [ 
            ...todos.slice(0, i), 
            updatedTodo,
            ...todos.slice(i + 1)
          ]
        })
      }
    }
  }

  render() {
    console.log('State: ', this.state)
    const table = this.state.uniqueDates.map((date) => {
      return this.state.todos.map((todo, i) => {
        if (i === 0) {
          return (
            <TableRowContainer 
              date={date} 
              toggleCollapsedDates={this.toggleCollapsedDates}
              key={date}
            />
          )
        } else if (todo.date === date) {
            return (
              <TodoTableRow 
                todo={todo}
                key={todo.id}
              /> 
            )
          }
      })
    })
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
            
            {table}

          </tbody>
        </table>
      </div>
    )   
  }
}

export default App;
