import React, { Component } from 'react'
import { getJwt } from '../Helpers/jwt';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class AuthenticatedComponent extends Component {
    constructor(props) {
        super(props);
      
    }

   
    render() {
        if (this.props.isLoggedIn === undefined) {
            return(
                <div><h1>Loading...</h1></div>
            )
        }
        else return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(AuthenticatedComponent);