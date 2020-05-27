import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from '../../page.module.scss';
import axios from 'axios';

class Register extends Component{
  constructor(props){
    super(props)
    this.state={
      user:"",
      password:""
    }
  }
  email = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  password = (e) => {
    this.setState({
      password:e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post('/seedUser', {
      email:this.state.email,
      password:this.state.password
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res=>{localStorage.setItem('cool-jwt', res.data)
    this.props.history.push('/protected')
  })
}
  render(){
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center' className={styles.loginheader}>
         Register
      </Header>
      <Form size='large' onSubmit={e => this.onSubmit(e)}>
        <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.email} onChange={e=>this.email(e)}/>
        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={this.state.password} onChange={e=>this.password(e)}/>
        <Button color='teal' type="submit" fluid size='large' className={styles.loginbutton}>
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Already has an account? <Link to='/login'>Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
)
  }}
  export default Register;
