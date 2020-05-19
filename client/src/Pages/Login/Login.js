import React from 'react'
import { Button, Form, Grid, Header, Message, Segment,Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import src from "../../images/big-ben-bridge-castle-city-460672.jpg"
const Login = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' columns={2}>
    <Grid.Column style={{ maxWidth: 450 }}><Image src={src} size='big'/></Grid.Column>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to='/register'>Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

export default Login