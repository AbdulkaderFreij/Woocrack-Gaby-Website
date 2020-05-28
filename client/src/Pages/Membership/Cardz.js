import React, { useState } from 'react'
import { Card, Icon, Grid, Segment, Image, Transition, Form, Header, TransitionablePortal } from 'semantic-ui-react'
import Packagew from "../../images/8531456_300x300.jpg"
import styles from '../../page.module.scss'




const Cardz = (props) => (


  <Card className={styles.card}>
    <Image className={styles.image} src={Packagew} wrapped ui={false} />
    <Card.Content className={styles.content}>
      <Card.Header className={styles.header}>{props.title}</Card.Header>
      <Card.Meta className={styles.meta}>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description className={styles.description}>
        {props.desc}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>

  </Card>

)




export default Cardz;
