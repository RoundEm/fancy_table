import React, { Component } from 'react';
import generateData from './dummyData'
import TodoTableRow from './TodoTableRow'
import TableRowHeader from './TableRowHeader'
import sortIcon from './assets/sort.svg'
import './App.css';

class App extends Component {
  state = {
    todos: [],
    // TODO: get unique dates with Mongo and add them
    uniqueDates: [
      {date: '4/2/2019', collapsed: false},
      {date: '3/26/2019', collapsed: false},
      {date: '3/31/2019', collapsed: false}
    ]
  }
  componentDidMount() {
    this.setState({
      todos: generateData()    
    }, this.sortTodosByDateDescending())
  }

  sortTodosByDateAscending = () => {
    const sortedData = this.state.uniqueDates.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA - dateB
    })
    this.setState({
      uniqueDates: sortedData
    })
  }
  sortTodosByDateDescending = () => {
    const sortedData = this.state.uniqueDates.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB - dateA
    })
    this.setState({
      uniqueDates: sortedData
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
          collapsed: !todos[i].collapsed
        })
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
        const toggledCollapseDate = Object.assign({}, uniqueDates[i], {
          collapsed: !uniqueDates[i].collapsed
        })
        this.setState({
          uniqueDates: [
            ...uniqueDates.slice(0, i),
            toggledCollapseDate,
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
          tableRows.push(
            <TableRowHeader 
              date={dates[i].date} 
              toggleCollapsedDates={this.toggleCollapsedDates}
              key={dates[i].date}
              dateCollapsed={dates[i].collapsed}
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

        <button onClick={this.sortTodosByDateDescending}>Sort Newest to Oldest</button>
        <button onClick={this.sortTodosByDateAscending}>Sort Oldest to Newest</button>

        <table>
          <thead>
            <tr>
              <th id="icon-thead"></th>
              <th>DATE</th>
              <th>ID</th>
              <th>ACCOUNT</th>
              <th>EMAIL</th>
              <th>AMOUNT</th>
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
