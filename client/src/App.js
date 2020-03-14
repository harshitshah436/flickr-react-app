import React, {Component} from 'react';
import './App.css';
import Home from './components/Home.js';
import Header from './components/Header.js';
import Photo from './components/Photo.js';
import Tag from './components/Tag.js';
import Sort from './components/Sort.js';
import SortDesc from './components/SortDesc.js';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/photos/tags/:id" component={Tag}/>
            <Route exact path="/photos/sort/asc" component={Sort}/>
            <Route exact path="/photos/sort/asc/:id" component={Sort}/>
            <Route exact path="/photos/sort/desc" component={SortDesc}/>
            <Route exact path="/photos/sort/desc/:id" component={SortDesc}/>
            <Route path="/photos/:id" component={Photo}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
