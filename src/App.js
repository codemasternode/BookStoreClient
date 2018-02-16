import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      array: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/books`)
      .then(respone => respone.json())
      .then(respone => this.setState({
        array: respone
      }))
    console.log(this.state.array)
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.array.map(item =>
          <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App;
