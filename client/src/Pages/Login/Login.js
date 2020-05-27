import React, {Component} from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import styles from '../../page.module.scss'


export default class Login extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    axios.post('/getToken', {
      email:this.state.email,
      password:this.state.password
    })
    .then(res=>{localStorage.setItem('cool-jwt', res.data)
    this.props.history.push('/protected')
  })

  }
  render(){
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h1' color='red' textAlign='center'>
        WooCrack
      </Header>
      <Header as='h2' color='teal' textAlign='center' className={styles.loginheader}>
        Log-in to your account
      </Header>
      <Form onSubmit={e => this.onSubmit(e)} size='large'>
        <Segment stacked>
          <Form.Input fluid value={this.state.email} icon='user' iconPosition='left' placeholder='E-mail address' onChange={e=>this.email(e)} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={e=>this.password(e)}
          />

          <Button color='teal' type="submit" fluid size='large' className={styles.loginbutton}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to='/register'>Sign Up</Link>
      </Message>
      <Message>
      <Link to ="/">Go Back to website!</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

    }}