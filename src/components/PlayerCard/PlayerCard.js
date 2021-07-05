import React from "react";
import classes from "./PlayerCard.module.css"
import Card from 'react-bootstrap/Card'
import profile from '../../images/profile.png'
import Button from 'react-bootstrap/Button'
class PlayerCard extends React.Component {

    constructor(props) {
        super(props);


        };
    
    render() {

        return (
            <div style={{float:'left'}}>
            <Card style={{ width: '380px' }}>
            <Card.Img variant="top" src={profile} />
            <Card.Body>
        <Card.Title>{this.props.player.name} {this.props.player.surname}</Card.Title>
                <Card.Text>
                <strong>Pozycja: </strong> {this.props.player.position}
                <br/>
                <strong>Numer na koszulce: </strong>{this.props.player.shirtNumber}
                
                
                </Card.Text>
                <Button variant="danger" onClick={()=>this.props.removePlayerHandler(this.props.player.id)}>Usun zawodnika </Button>
            </Card.Body>
            </Card>
            </div>
        );
    }
}

export default PlayerCard;