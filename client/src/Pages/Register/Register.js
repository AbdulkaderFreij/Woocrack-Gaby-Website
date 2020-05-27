import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from '../../page.module.scss';

class Register extends Component{
  constructor(props){
    super(props)
    this.state={
      user:"",
      password:""
    }
  }
  render(){
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center' className={styles.loginheader}>
         Register
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'/>
        <Button color='teal' fluid size='large' className={styles.loginbutton}>
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
