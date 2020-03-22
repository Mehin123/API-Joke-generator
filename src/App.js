import React, { Component } from 'react'
import './App.css';
import JokeGenerate from './JokeGenerate'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeGenerate/>
      </div>
    )
  }
}

export default App

