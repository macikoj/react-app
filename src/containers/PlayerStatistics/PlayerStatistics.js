import React from "react";
import classes from './PlayerStatistics.module.css'
import PlayerStatisticsTable from './PlayerStatisticsTable/PlayerStatisticsTable'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import API from '../../API'
import zIndex from "@material-ui/core/styles/zIndex";
class PlayerStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList:[],
            playerStats:[],
            selectedPlayer:null

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
        onRowAdd=(data)=>{
            
            data.playerId=this.state.selectedPlayer

            var newdata=[...this.state.playerStats]
            newdata.push(data)
            this.setState({playersStats:newdata})
            API.post('PlayerStatstics/',  data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json', 'Content-Type': 'application/json' } })
            .then(res => {
            })
        }
        onRowDelete=(id)=>{
            API.delete(`PlayerStatstics/${id}/`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json', 'Content-Type': 'application/json' } })
            .then(res => {
            })
        }

        onRowUpdate=(data)=>{
            API.put(`PlayerStatstics/${data.id}/`,data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json', 'Content-Type': 'application/json' } })
            .then(res => {
            })
        }
        onSelectedPlayerChange=(event)=>{
    
            this.setState({selectedPlayer:event.value});

            API.get(`PlayerStatstics/${event.value}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then( response => {
                this.setState( { playerStats: response.data } );

            } )
            .catch( error => {
              
            } );
        }
    render() {
        const playersDisplay =this.state.playersList.map(player=>{
            return (
              {value: player.id,label:player.shirtNumber+' '+player.name+' '+player.surname}
              )

        })


        return (

            <div className={classes.rootContainer}>
                <div className={classes.boxContainer}>






                    <br />
                    <div style={{width:'300px', zIndex:300}}>
                    <Select

                        onChange={this.onSelectedPlayerChange}
                        options={playersDisplay}


                    />
                                        </div>
                    <div className={classes.wrapper}>
                    <PlayerStatisticsTable onRowAdd={this.onRowAdd} onRowUpdate={this.onRowUpdate} onRowDelete={this.onRowDelete} dataa={this.state.playerStats} />
                    </div>
                </div>
            </div>

        )
    }
}
export default PlayerStatistics;