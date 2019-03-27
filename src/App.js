import React, { Component } from 'react';

import generateData from './dummyData'
import TodoTableRow from './TodoTableRow'
import './App.css';

class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({
      data: generateData()
    })
  }

  render() {
    // console.log('State: ', this.state)
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
            {this.state.data.map((todo, i, array) => (
                <TodoTableRow 
                  todo={todo}
                  index={i}
                  dataArray={array}
                  key={todo.id}
                /> 
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
