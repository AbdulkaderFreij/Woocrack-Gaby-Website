import React, {Component} from 'react';
import axios from "axios";

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
import Protected from './Components/Protected/Protected';
import AuthenticatedComponent from './Components/AthenticatedComponent/AuthenticatedComponent.js';
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoggedIn: false,
    }
  }


  componentDidMount() {
    axios
      .get(`/verify?token=${localStorage.getItem("cool-jwt")}`)
      .then((res) => {
        debugger;
        if (res.data.status === 200) {
          this.setState({
            isLoggedIn: true,
          });
        }
      });
  }

  handleLogout() {
    localStorage.removeItem("cool-jwt");
    window.location.reload();
    this.setState({ isLoggedIn: false });
  }

  render() {
    console.log("pathame", this.props.location.pathname)
    const pathname = this.props.location.pathname
    return (
        <div className="App">
          {/* {pathname === '/admin' ? <AdminNav/> : <Navbar/>}        */}
          <Navbar handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
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
                <AuthenticatedComponent isLoggedIn={this.state.isLoggedIn}>
                <Route path="/protected" strict exact component={Protected}/>
                </AuthenticatedComponent>
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