 import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminNav from '../AdminNav/AdminNav';
import AdminLogin from '../../Pages/AdminLogin/AdminLogin';
import AdminThemes from '../../Pages/AdminThemes/AdminThemes';

class Appadmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true,
		};
	}

	render() {
		return (
			<>
				{
					this.state.loggedIn ? (
                        <Switch>                       
                        <Route path='/admin'>
                        <AdminNav/>
                        <Route path="/admin/feature" component={AdminThemes} />
                        </Route>
                        </Switch>
					) : <Route path="/admin" component={AdminLogin} />
				}
			</>
		)
	}
}

export default Appadmin;