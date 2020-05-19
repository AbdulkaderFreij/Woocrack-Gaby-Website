import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Register = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Register
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name'/>
        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'/>
        <Button color='teal' fluid size='large'>
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

export default Register;