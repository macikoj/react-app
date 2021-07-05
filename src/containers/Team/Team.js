import React from "react";
import FieldModa from '../../components/Modal/FieldModa'
import ReactApexChart from "react-apexcharts";
import classes from "./Team.module.css"
import PlayerList from '../../components/PlayerList/PlayerList'
import API from '../../API'
import PlayerCard from '../../components/PlayerCard/PlayerCard'
import Button from 'react-bootstrap/Button'
import Moda from '../../components/Modal/Moda'
import { withAlert } from 'react-alert'
class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            simplePlayersList:[],
            selectedPlayer:null,
            playerAverage:null,
            positionAverage:null,
            options: {
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'	
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ['transparent']
                },
                xaxis: {
                  categories: ['Liczba podań ', 'Celne podania', 'Liczba wślzigów', 'Udane wślizgi', 'Liczba strzałów', 'Strzały celne', 'Strzały zablokowane', 'Asysty', 'Straty','Faule','Żółte','Czerwone','Obronione strzały','Stracone bramki','Minuty zagrane'],
                },
                yaxis: {
                   // logarithmic: true,
                   // forceNiceScale:true,
                   labels: {
                   formatter: function(val) {
                    return val.toFixed(2);
                  }
                  }
                  },
       
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return  val
                    }
                  }
                }
              },
              series: [{
                name: 'Średnia zawodnika ',
                data: []
              }, {
                name: 'Średnia zawodników na tej pozycji',
                data: []

              }, {
  
              }],


        };
    }
    componentDidMount = () => {

        API.get('players/', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {

                this.setState({ simplePlayersList: response.data });
            })
            .catch(error => {
            })
    }
    removePlayerHandler=(id)=>{

      API.delete(`players/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
    })
        .then(response => {
       
          var updatedPlayers=[...this.state.simplePlayersList]
          for( var i = 0; i < updatedPlayers.length; i++){ 
            if ( updatedPlayers[i].id === id) {
              updatedPlayers.splice(i, 1); 
            }
            this.props.alert.success("Usunięto zaowdnika")
         }

          this.setState({simplePlayersList:updatedPlayers})
          this.setState({selectedPlayer:null})
        })
        .catch(err => {
          this.props.alert.error("Nie udało się usunąć zawodnika")
        })   
        

    }
    onPlayerClick=(player)=>{

       

        API.get(`PlayerStatstics/statisticsTeamAverage/${player.position}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then(response => {
               
       
               const updat={
                name: 'Średnia na pozycji ',

                 data:[
               response.data.totalPasses,response.data.succesfulPasses,response.data.totalTackles,response.data.succesfulTackles,response.data.totalShots,response.data.succesfulShots,
                response.data.shotsBlocked,response.data.assists,response.data.ballsLost,response.data.foulsCommited,response.data.yellowCards,response.data.redCards,
                response.data.shorsDefended,response.data.goals_lost,response.data.minutesPlayed]
                
                }
                // ,{
                //     name: 'Średnia zawodnika ',
                //     data:[
                //         response.data.totalPasses,response.data.succesfulPasses,response.data.totalTackles,response.data.succesfulTackles,response.data.totalShots,response.data.succesfulShots,
                //         response.data.shotsBlocked,response.data.assists,response.data.ballsLost,response.data.foulsCommited,response.data.yellowCards,response.data.redCards,
                //         response.data.shorsDefended,response.data.goals_lost,response.data.minutesPlayed]
                // }
                this.setState({positionAverage:updat})

    
            })
            .catch(err => {
      
            })   
            API.get(`PlayerStatstics/statisticsAverage/${player.id}`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const updat={
                        name: 'Średnia zawodnika ',
        
                         data:[
                       response.data.totalPasses,response.data.succesfulPasses,response.data.totalTackles,response.data.succesfulTackles,response.data.totalShots,response.data.succesfulShots,
                        response.data.shotsBlocked,response.data.assists,response.data.ballsLost,response.data.foulsCommited,response.data.yellowCards,response.data.redCards,
                        response.data.shorsDefended,response.data.goals_lost,response.data.minutesPlayed]
                         }
                    this.setState({playerAverage:updat})
                })
                .catch(err => {
          
                })   
                this.setState({selectedPlayer:player})

    }
    addFieldHandler=(orderForm)=>{
      var addData = {
        Name: orderForm.name.value,
        Type: orderForm.type.value,
        Adress: orderForm.adress.value,

  
  
      }
      API.post('FootballFields',addData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
    })
        .then(response => {
          this.props.alert.success("Dodano boisko")
  

        })
        .catch(err => {
          this.props.alert.error("Nie udało się dodać boiska")
        })   
    }
    registerPlayerHandler=(orderForm)=>{
       
        var regData = {
            Name: orderForm.name.value,
            Surname: orderForm.surname.value,
            ShirtNumber: orderForm.shirtNumber.value,
            EmailAdresss: orderForm.email.value,
            Paswsword: orderForm.password.value,
           Position:orderForm.position.value
      
      
          }

          API.post('players/register',regData,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then(response => {
              this.props.alert.success("Zarejestrowano nowego zawodnika")
      

            })
            .catch(err => {
              this.props.alert.error("Nie udało się dodać nowego zawodnika")
            })   
            
          

    }
    render() {
       
        var series=  [{
            name: 'Średnia zawodnika ',
            data: []
          }, {
            name: 'Średnia zawodników na tej pozycji',
            data: []

          }, {

          }]
          if(this.state.positionAverage&&this.state.playerAverage){
              series=[this.state.positionAverage,this.state.playerAverage]
          }
        let card=null;
        if(this.state.selectedPlayer!=null) card= <PlayerCard player={this.state.selectedPlayer} removePlayerHandler={this.removePlayerHandler}/>;
        return (
            <div className={classes.rootContainer}>
                <div className={classes.boxContainer}>
                    {card}
                    <div className={classes.list}>
                        <PlayerList players={this.state.simplePlayersList} onPlayerClick={this.onPlayerClick}noIcon={true} scroolable={true}/>
                    </div>
                </div>
                <div className={classes.box}>
                <div style={{margin:'20px'}}>
                  <Moda registerPlayerHandler={this.registerPlayerHandler} label={"Dodaj zawodnika"}  />
                </div>
                <div style={{margin:'20px'}}>
                  <FieldModa addFieldHandler={this.addFieldHandler} label={"Dodaj boisko"}  />
                </div>
                </div>
                <div className={classes.boxContainer}>
                   
                    
            <div id="chart">
              <ReactApexChart  options={this.state.options} series={series} type="bar" height="750" />
            </div>
                 </div>


            </div>
        );
    }
}

export default withAlert() (Team);