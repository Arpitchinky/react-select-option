import React, { Component } from 'react';
import './App.css';
import Category from './Components/Categorie';
import Navhead from './Components/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';
//Switch, Route, Link
//import AddCategory from "./Components/AddCat"
//import Name from "./Components/Mobile";
//import Products from './Components/EditTable';
//import PersonList from './Components/PersonList';
//import PersonInput from './Components/PInput';


class App extends Component {
  render() {
    return (
      <Router>
     <div className="App">
      
     <Navhead/>
       <Category/>
   {/* <ul>
     <li><Link to="/add">AddCategory</Link></li>
     
   </ul>
   <hr/>
<Switch>
  <Route exact path="/add" component={AddCategory}></Route>
  </Switch>        */}
       {/* <Name/> */}
 

       </div>
       </Router>
      
    );
  }
}

export default App;
