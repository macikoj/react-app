import React from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import classes from './TeamComposition.module.css'
import API from '../../API'
import Container from './Container'
class TeamComposition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList:[]
        };
      }
      componentDidMount=()=>{

        API.get('players/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {

            this.setState( { playersList: response.data } );
        } )
        .catch( error => {
          
        } );
    }
      render(){
        return (
            <div className={classes.rootContainer}>

                <DndProvider backend={HTML5Backend}>
					<Container players={this.state.playersList}/>
				</DndProvider>

        </div>
            );

      }
      }
export default TeamComposition
