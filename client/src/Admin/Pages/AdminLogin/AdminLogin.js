 
import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from '../../../page.module.scss'

const AdminLogin = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h1' color='red' textAlign='center'>
        WooCrack
      </Header>
      <Header as='h2' color='teal' textAlign='center' className={styles.loginheader}>
        Admin Login
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

          <Button color='teal' fluid size='large' className={styles.loginbutton}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
      <Link to ="/">Go Back to website!</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

export default AdminLogin