import React, { Component } from 'react';
import generateData from './dummyData'
import TodoTableRow from './TodoTableRow'
import TableRowHeader from './TableRowHeader'
import './App.css';

class App extends Component {
  state = {
    todos: [],
    // TODO: get unique dates with Mongo and add them:
    // uniqueDates: ['3/26/2019', '3/31/2019']
    uniqueDates: [
      {date: '3/26/2019', hidden: false},
      {date: '3/31/2019', hidden: false}
    ]
  }

  // TODO: add function to sort dates prior to being rendered
  componentDidMount() {
    this.setState({
      todos: generateData()
    })
  }

  toggleCollapsedDates = date => {
    const todos = this.state.todos
    const uniqueDates = this.state.uniqueDates
    const toggledTodos = []
    const sliceRangeIndexes = []
    
    for (let i = 0; i < todos.length; i++) {
      if (date === todos[i].date) {
        const updatedTodo = Object.assign({}, todos[i], {
          hidden: !todos[i].hidden
        })
        // console.log('updatedTodo: ', updatedTodo)
        toggledTodos.push(updatedTodo)
        sliceRangeIndexes.push(i)
      }
    }
    this.setState({
      todos: [ 
        ...todos.slice(0, sliceRangeIndexes[0]), 
        ...toggledTodos,
        ...todos.slice(sliceRangeIndexes[sliceRangeIndexes.length - 1] + 1)
      ]
    })  
    
    for (let i = 0; i < uniqueDates.length; i++) {
      if (date === uniqueDates[i].date) {
        const toggledCollapse = Object.assign({}, uniqueDates[i], {
          hidden: !uniqueDates[i].hidden
        })
        // console.log('toggledCollapse: ', toggledCollapse)
        this.setState({
          uniqueDates: [
            ...uniqueDates.slice(0, i),
            toggledCollapse,
            ...uniqueDates.slice(i + 1)
          ]
        })
      }
    }
  }

  render() {
    console.log('State: ', this.state)
    const todos = this.state.todos
    const dates = this.state.uniqueDates

    let tableRows = []
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < todos.length + 1; j++) {
        // render blank row for date group header
        if (j === 0) {
          // console.log('X ', todos[i])
          tableRows.push(
            <TableRowHeader 
              date={dates[i].date} 
              toggleCollapsedDates={this.toggleCollapsedDates}
              key={dates[i].date}
              // dateCollapsed={todos[0].hidden}
            />
          )
        } 
        // render the rows with data. `[j - 1]` is necessary since we're looping over the array length + 1 to account for the <th> row above
        else if (todos[j - 1].date === dates[i].date) { 
          tableRows.push(
            <TodoTableRow 
              todo={todos[j - 1]}
              key={todos[j - 1].id}
            /> 
          )
        }
      }
    }

    return (
      <div className="App">
        <h1>My Amazing Table!</h1>
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
