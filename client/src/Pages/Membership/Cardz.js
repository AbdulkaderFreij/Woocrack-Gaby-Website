import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Packagew from '../../images/8531456_300x300.jpg'
import styles from '../../page.module.scss'


const Cardz = (props) => (
    
    
    <Card className={`${styles.card} membership-card`}>
      <div className="car-inner">
        <div className="front-content">
          <Image className={styles.image} src={Packagew} wrapped ui={false}/>
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
              <Icon name='user'/>
              22 Friends
            </a>
          </Card.Content>
        </div>
        
        <div className="back-content">
          <Image className={styles.image} src={Packagew} wrapped ui={false}/>
          <Card.Content className={styles.content}>
            <Card.Header className={styles.header}>{props.title}</Card.Header>
            <Card.Meta className={styles.meta}>
              <span className='date'>Joined in 202215</span>
            </Card.Meta>
            <Card.Description className={styles.description}>
              {props.desc}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user'/>
              1112 Friends
            </a>
          </Card.Content>
        </div>
      </div>
    
    </Card>

)


export default Cardz;
