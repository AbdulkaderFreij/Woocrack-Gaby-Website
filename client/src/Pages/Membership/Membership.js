import React from 'react'
import { Card, Icon, Grid, Segment, Image, Tra } from 'semantic-ui-react'
import Packagew from "../../images/8531456_300x300.jpg";
import Cardz from "../../Pages/Membership/Cardz"
import styles from '../../page.module.scss'

import './MembershipCard.scss';

/*const GriDField = () => {
    for (let i = 0; i < 3; i++) {
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Cardz />
        </Grid.Column>
    }
}*/

const Membership = () => (
    <Segment style={{ padding: '3em 0em' }} vertical>
        <Grid centered container columns={3}>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Cardz className={styles.title} desc="first" title="5 Videos" />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Cardz desc="second" title="15 Videos" />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Cardz desc="third" title="20 Videos" />
            </Grid.Column>




        </Grid>
    </Segment>
)
/*
class Membership extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        const GriDField = () => {
            for (let i = 0; i < 3; i++) {
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Cardz />
                </Grid.Column>
            }
        }

        return (
            <Segment style={{ padding: '3em 0em' }} vertical>
                <Grid centered container columns={3}>
                    {GriDField()}
                </Grid>
            </Segment>
        )
    }
}*/


export default Membership;
