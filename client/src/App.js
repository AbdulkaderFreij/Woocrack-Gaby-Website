import React, {Component} from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Themes from './Pages/Themes/Themes';
import Plugins from './Pages/Plugins/Plugins';
import ContactUs from './Pages/ContactUs/ContactUs';
import Navbar from './Components/Navbar/Navbar';
import { Route, Switch, withRouter } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Membership from './Pages/Membership/Membership';
import AdminNav from './Admin/Components/AdminNav/AdminNav';
import Ngoform from './Pages/NGO Form/Ngoform';
import AdminApp from './Admin/Components/AdminApp/AdminApp'
import './App.css'
class App extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render() {
    console.log("pathame",this.props.location.pathname)
    const pathname=this.props.location.pathname
    return (
        <div className="App">
          {/* {pathname === '/admin' ? <AdminNav/> : <Navbar/>}        */}
          <Navbar/>
          <Switch>
            <Route path="/">
              <div className="app_container">
                <Route path="/" strict exact component={Home} />
                <Route path="/themes" strict exact component={Themes} />
                <Route path="/plugins" strict exact component={Plugins} />
                <Route path="/contactus" strict exact component={ContactUs} />
                <Route path="/login" strict exact component={Login}/>
                <Route path="/register" strict component={Register}/>
                <Route path="/membership" strict exact component={Membership}/>
                <Route path="/ngoform" strict exact component={Ngoform}/>
                <Footer/>
                <Route path='/admin'>
                  <AdminApp/>
                </Route>
                {/* {pathname !== '/admin' ? <Footer/> : null}   */}
              </div>
            </Route>
          </Switch>
        </div>
     
    );
  }
}

export default withRouter(App)