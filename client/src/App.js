import React, {Component} from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Themes from './Pages/Themes/Themes';
import Plugins from './Pages/Plugins/Plugins';
import ContactUs from './Pages/ContactUs/ContactUs';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import About from './Pages/About/About';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>       
            <Route path="/">
              <Navbar/>
              <div className="app_container">
                <Route path="/" strict exact component={Home} />
                <Route path="/themes" strict exact component={Themes} />
                <Route path="/plugins" strict exact component={Plugins} />
                <Route path="/contactus" strict exact component={ContactUs} />
                <Route path="/about" strict exact component={About} />
                <Footer/>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
