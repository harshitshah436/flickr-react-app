import React, {Component} from 'react';
import './App.css';
import Home from './components/Home.js';
import Header from './components/Header.js';
import Photo from './components/Photo.js';
import Tag from './components/Tag.js';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/photos/tags/:id" component={Tag}/>
            <Route path="/photos/:id" component={Photo}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
