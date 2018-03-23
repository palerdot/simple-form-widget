import React, { Component } from 'react'
import './App.css'

// required for material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import DealFrom
import Form from './components/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Deal Creation</h1>
        </header>
        <div className="App-intro">
          <MuiThemeProvider>
            <Form />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App
