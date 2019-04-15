import React, { Component } from 'react';
import generateData from './dummyData'
import TodoTableRow from './TodoTableRow'
import TableRowHeader from './TableRowHeader'
// import sortIcon from './assets/sort.svg'
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
    const todoData = generateData()
    const sortedData = this.sortAlphbetically(todoData, 'accountName')
    this.setState({
      todos: sortedData
    }, this.sortByDateDescending())
  }

  sortAlphbetically = (data, sortBy) => {
    const sortedData = data.sort((a, b) => {
      const dataA = a[sortBy].toUpperCase()
      const dataB = b[sortBy].toUpperCase()
      if (dataA < dataB) return -1
      else if (dataA > dataB) return 1
      else return 0
    })
    return sortedData  
  }

  sortByDateAscending = () => {
    const sortedData = this.state.uniqueDates.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA - dateB
    })
    this.setState({
      uniqueDates: sortedData
    })
  }

  sortByDateDescending = () => {
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
    
    for (let i = 0; i < todos.length; i++) {
      if (date === todos[i].date) {
        const updatedTodo = Object.assign({}, todos[i], {
          hidden: !todos[i].hidden
        })
        // console.log('updatedTodo: ', updatedTodo)
        this.setState({
          todos: [ 
            ...todos.slice(0, i), 
            updatedTodo,
            ...todos.slice(i + 1)
          ]
        })
      }
    }
    
    for (let i = 0; i < uniqueDates.length; i++) {
      if (date === uniqueDates[i].date) {
        const toggleCollapseDate = Object.assign({}, uniqueDates[i], {
          collapsed: !uniqueDates[i].collapsed
        })
        console.log('toggleCollapseDate: ', toggleCollapseDate)
        this.setState({
          uniqueDates: [
            ...uniqueDates.slice(0, i),
            toggleCollapseDate,
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
        // render the rows with data. `[j - 1]` is necessary since we're looping over the array length + 1 to account for the containing/blankish <th> row above
        else if (todos[j - 1].date === dates[i].date) { 
          tableRows.push(
            <TodoTableRow 
              todo={todos[j - 1]}
              key={todos[j - 1].id}
              hidden={dates[i].collapsed}
            /> 
          )
        }
      }
    }

    return (
      <div className="App">
        <h1>My Amazing Table!</h1>

        <button onClick={this.sortByDateDescending}>NEW TO OLD</button>
        <button onClick={this.sortByDateAscending}>OLD TO NEW</button>
        {/* <button onClick={this.sortByAlphaAscending}>Sort Email A - Z</button> */}

        <table>
          <thead>
            <tr>
              <th id="icon-thead"></th>
              <th>DATE</th>
              <th>ID</th>
              <th>ACCOUNT NAME</th>
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
