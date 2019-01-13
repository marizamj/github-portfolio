import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <header className="app__header">
            <h1>GitHub Portfolio</h1>
          </header>
          <Route exact path="/" component={null} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
