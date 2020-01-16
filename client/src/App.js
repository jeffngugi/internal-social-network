import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import store from './store';
import { Provider } from 'react-redux';
import Routes from './components/Routes';
import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </Provider>
    )
  }
}

export default App;