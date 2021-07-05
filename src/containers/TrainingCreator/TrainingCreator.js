import React from "react";
import DatePicker from "react-datepicker";
import {withAlert} from "react-alert"
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import API from '../../API'
import {connect} from 'react-redux'
import TrainerList from '../../components/TrainerList/TrainerList'
import moment from 'moment';
import classes from './TrainingCreator.module.css'
import PlayerList from '../../components/PlayerList/PlayerList'

class TrainingCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          playersList:[],
          selectedPlayersList:[],
          startTime:new Date().setHours(7,0 ),
          endTime:new Date().setHours(8, 0),
          endTime:null,
          Name:null,
          selectedTrainer:null,
          selectedfieldPart:1,
          selectedPlayer:null,
          trainerList:[],
          selectedGroup:'Napastnicy',
          selectedTrainersList:[],
          selectedFootbalField:null,
          footballFieldList:[],
          excludedTimesPlayers:[],
          excludedTimesTrainers:[],
          excludedTimesFields:[],
          finalExculdedTimes:[],
          endTimeMaxTime:new Date().setHours(21,0),
          endTimeMinTime:new Date().setHours(7,0),
        };
      }
      upd=()=>{
        API.get('players/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {

            this.setState( { playersList: response.data } );
        } )
        .catch( error => {
          
        } );
        API.get('trainers/simpletrainers/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {
            this.setState({selectedTrainer:response.data[0].id})
            this.setState( { trainerList: response.data } );
        } )
        .catch( error => {
          
        } );
        API.get('FootballFields/simplefootballfields/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {
            this.setState({selectedFootbalField:response.data[0].id})
            this.setState( { footballFieldList: response.data } );
        } )
        .catch( error => {
          
        } );
        API.get('Trainings/excludedtimesplayers/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {
            this.setState( {excludedTimesPlayers: response.data } );
        } )
        .catch( error => {
          
        } );
        API.get('Trainings/excludedtimestrainers/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {
            this.setState( {excludedTimesTrainers: response.data } );
        } )
        .catch( error => {
          
        } );
        API.get('Trainings/excludedtimesfields/',{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
        .then( response => {
            this.setState( {excludedTimesFields: response.data },()=>{this.getTimeIntervals()} );
        } )
        .catch( error => {
          
        } );
      }
      componentDidMount=()=>{

        this.upd()

      }
      newMaxDate=()=>{
        var found=false;
        for(var i=0; i< this.state.finalExculdedTimes.length&& !found;i++){
          console.log(this.state.finalExculdedTimes[i])
          if(moment(this.state.finalExculdedTimes[i])>moment(this.state.startTime)){
            this.setState({endTimeMaxTime:this.state.finalExculdedTimes[i]})
            this.setState({endTimeMinTime:moment(this.state.startTime).add(15, 'm').toDate()})
           found =true
          }
          
        }
        if(!found){
          this.setState({endTimeMaxTime:new Date().setHours(21,0)})
          this.setState({endTimeMinTime:moment(this.state.startTime).add(15, 'm').toDate()})
        }

      }
      removeTrainerHandler=(id)=>{
        let updatedTrainers=this.state.selectedTrainersList.slice(0);
        
        updatedTrainers=updatedTrainers.filter((trainer)=>{
     
          return id!=trainer.id
        }
        )
        this.setState({selectedTrainersList:updatedTrainers},()=>{  this.getTimeIntervals()})

      }
      onStartTimeChange=(date)=>{
          this.setState({startTime:date},()=>{    this.getTimeIntervals();})
          this.setState({endTime:date})
      
      }
      onNameChangeHandler=(event)=>{
      this.setState({Name:event.target.value})
      }
      onEndTimeChange=(date)=>{
        this.setState({endTime:date})
    }
    onFootballFieldChange=(event)=>{
        this.setState({selectedFootbalField:event.target.value},()=>{  this.getTimeIntervals()})
    }
    addTrainerHandler=()=>{
      let UpdatedSelectedTrainersList=this.state.selectedTrainersList.slice(0);
    let trainer=this.state.trainerList.find(x => x.id ==this.state.selectedTrainer );
    if(UpdatedSelectedTrainersList.map((trainer)=>{
     return trainer.id
    }).indexOf(this.state.selectedTrainer)==-1)
  {
    UpdatedSelectedTrainersList.push(trainer)
    this.setState({selectedTrainersList:UpdatedSelectedTrainersList},()=>{  this.getTimeIntervals()});

  }

    }
    addPlayerHandler=()=>{
     


      let UpdatedSelectedPlayersList=this.state.selectedPlayersList.slice(0);
      let player=this.state.playersList.find(x => x.id ===this.state.selectedPlayer );
     
      if(UpdatedSelectedPlayersList.map((player)=>{
       return player.id
      }).indexOf(this.state.selectedPlayer)==-1)
    {
      UpdatedSelectedPlayersList.push(player)
      this.setState({selectedPlayersList:UpdatedSelectedPlayersList},()=>{  this.getTimeIntervals()});
    }
  
    }
    submitTraining=()=>{
      var trainerIds=[]
      this.state.selectedTrainersList.forEach(element => {
        trainerIds.push(element.id)
      });
      var playerIds=[]
      this.state.selectedPlayersList.forEach(element => {
       playerIds.push(element.id)
      });
      const DTO={

        Name:this.state.Name,
        StartTime:moment(this.state.startTime).add(1,'hour'),
        EndTime:moment(this.state.endTime).add(1,'hour'),
        PartUsed:this.state.selectedfieldPart,
        FootballFieldId:this.state.selectedFootbalField,
        TrainersIds:trainerIds,
        PlayersIds:playerIds
        
      }
      API.post('trainings/',  DTO,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json', 'Content-Type': 'application/json' } })
      .then(res => {

        this.props.alert.success("Utworzono trening")
        var updatedExcludedTimesPlayers=[...this.state.excludedTimesPlayers]
        var updatedExcludedTimesTrainers=[...this.state.excludedTimesTrainers]
        var updatedExcludedTimesFields=[...this.state.excludedTimesFields]
        DTO.PlayersIds.forEach(pId=>{
          updatedExcludedTimesPlayers.push({startDate:DTO.StartTime._i,endDate:DTO.EndTime._i,id:pId})
        })
        DTO.TrainersIds.forEach(tId=>{
          updatedExcludedTimesTrainers.push({startDate:DTO.StartTime._i,endDate:DTO.EndTime._i,id:tId})
        })
        updatedExcludedTimesFields.push({startDate:DTO.StartTime,endDate:DTO.EndTime._i,id:DTO.FootballFieldId._i,part:DTO.PartUsed})
   
        this.setState({excludedTimesPlayers:updatedExcludedTimesPlayers})
        this.setState({excludedTimesTrainers:updatedExcludedTimesTrainers})
        this.setState({excludedTimesFields:updatedExcludedTimesFields},()=>{    this.getTimeIntervals();})
     
      })

      .catch( error => {
        this.props.alert.error("Nie udało się utworzyć treningu")
      } );
      
    }
    removePlayerHandler=(id)=>{
       let updatedPlayers=this.state.selectedPlayersList.slice(0);
        
        updatedPlayers=updatedPlayers.filter((player)=>{
          return id!=player.id
        }
        )
        this.setState({selectedPlayersList:updatedPlayers},()=>{  this.getTimeIntervals()})

    }

  getTimeIntervals=()=>{    
    var intervalSet= new Set();
    this.state.selectedPlayersList.forEach((player)=>{
      this.state.excludedTimesPlayers.forEach(excluded=>{

        if(player.id==excluded.id&&  moment(excluded.startDate).format('D')==moment(this.state.startTime).format('D')){
          var x=moment(excluded.endDate).diff(excluded.startDate,'minutes');
          while(x>0){intervalSet.add(moment(excluded.endDate).subtract(x,'minutes').toDate())
        x-=15;
        }
        }
      })
    })
    this.state.selectedTrainersList.forEach((trainer)=>{
      this.state.excludedTimesTrainers.forEach(excluded=>{

        if(trainer.id==excluded.id &&  moment(excluded.startDate).format('D')==moment(this.state.startTime).format('D')){

          var x=moment(excluded.endDate).diff(excluded.startDate,'minutes');
          while(x>0){intervalSet.add(moment(excluded.endDate).subtract(x,'minutes').toDate())
        x=x-15;
        }
        }
      })
    })
    if(this.state.selectedfieldPart==1){
      this.state.excludedTimesFields.forEach(excluded=>{

        if(this.state.selectedFootbalField==excluded.id&&  moment(excluded.startDate).format('D')==moment(this.state.startTime).format('D')){
          var x=moment(excluded.endDate).diff(excluded.startDate,'minutes');
          while(x>0){intervalSet.add(moment(excluded.endDate).subtract(x,'minutes').toDate())
        x-=15;
        }
        }
      })
    }else{
      this.state.excludedTimesFields.forEach(excluded=>{
        if(this.state.selectedFootbalField==excluded.id &&excluded.part==1&&  moment(excluded.startDate).format('D')==moment(this.state.startTime).format('D')){
          var x=moment(excluded.endDate).diff(excluded.startDate,'minutes');
          while(x>0){intervalSet.add(moment(excluded.endDate).subtract(x,'minutes').toDate())
        x-=15;
        }
        }
      })
    }
var zzz=Array.from(intervalSet).sort(function(a,b){
  return moment(a) - moment(b)
})
console.log(zzz)
    this.setState({finalExculdedTimes:zzz},()=>{this.newMaxDate();});
  }
  addPlayerGroupHandler=()=>{
    let UpdatedSelectedPlayersList=this.state.selectedPlayersList.slice(0);
    let players=this.state.playersList.slice(0)
    switch(this.state.selectedGroup){
      case 'Napastnicy':
          players=players.filter(x => {return x.position =='Napastnik' });
          break;
      case 'Obrońcy':
        
          players=players.filter(x => {return x.position =='Obrońca' });
          break;
      case 'Pomocnicy':
          players=players.filter(x => {return x.position =='Pomocnik' });
          break;
      case 'Bramkarze':
          players= players.filter(x => {return x.position =='Bramkarz' }); 
          break;
      default:players=this.state.playersList.slice(0)
      break;
  }
    players.forEach((player)=>{

      
    if (UpdatedSelectedPlayersList.indexOf(player)==-1) UpdatedSelectedPlayersList.push(player);
  });
  this.setState({selectedPlayersList:UpdatedSelectedPlayersList},()=>{  this.getTimeIntervals()});


  }
  onSelectPlayerChange=(event)=>{
    this.setState({selectedPlayer:event.value})
    
  }

  onSelectedGroupChange=(event)=>{
    this.setState({selectedGroup:event.target.value})
  }
  onSelectedTrainerChange=(event)=>{
    
    this.setState({selectedTrainer:parseInt(event.target.value)})

  }
  onFootballFieldPartChange=(event)=>{
    this.setState({selectedfieldPart:event.target.value},()=>{  this.getTimeIntervals()})
  }
      render() {

        const playersDisplay =this.state.playersList.map(player=>{
            return (
              {value: player.id,label:player.shirtNumber+' '+player.name+' '+player.surname}
              )

        })
        const trainerDisplay =this.state.trainerList.map(trainer=>{
          return (
            <option value={trainer.id}>{trainer.name+' '+trainer.surname}</option>
            )
          })
        const footballFieldDisplay =
        this.state.footballFieldList.map(footballfield=>{
          return (
            <option value={footballfield.id}>{footballfield.name+' '+footballfield.type}</option>
            )           
      })

          return(
            
            <div className={classes.rootContainer}>
                <div className={classes.boxContainer}>

              
                <div className={classes.individualBox}>

                <Form.Control size="lg" type="text" placeholder="Nazwa treningu" onChange={this.onNameChangeHandler} value={this.state.Name} />
                <br/>
                <Select

                    onChange={this.onSelectPlayerChange}
                    options={playersDisplay}
                    
                    
                />
                <Button variant="primary"  disabled={this.state.selectedPlayer==null?true:false} onClick={this.addPlayerHandler} >
                Dodaj pojedyńczo zawodnika 
                </Button>
                </div>
             
                
               
                <Form.Group controlId="exampleForm.ControlSelect1">
                
                <Form.Label>Wybierz grupę treningową:</Form.Label>
                <Form.Control as="select" onChange={this.onSelectedGroupChange} >
                <option>Napastnicy</option>
                <option>Pomocnicy</option>
                <option>Obrońcy</option>
                <option>Bramkarze</option>
                <option>Wszyscy</option>


                </Form.Control>
                                <Button variant="primary" style={{width:'200px'}} onClick={this.addPlayerGroupHandler}>
                Dodaj Zawodników
                </Button>
                </Form.Group>
                

                <Form.Label>Dodaj trenerów:</Form.Label>
                <Form.Control as="select" onChange={this.onSelectedTrainerChange} >
                {trainerDisplay}

                </Form.Control>
                
              
                
                <Button variant="primary"  disabled={this.state.selectedTrainer==null?true:false}  style={{width:'200px',margin:'13px'}} onClick={this.addTrainerHandler}>
                Dodaj Trenera
                </Button>
              
            
                Wybierz boisko
                <Form.Control as="select" onChange={this.onFootballFieldChange}>
                {footballFieldDisplay}
                </Form.Control>
                Wybierz część boiska
                <Form.Control as="select" onChange={this.onFootballFieldPartChange} value={this.state.fieldPart}>
                <option>1</option>
                <option>0.5</option>

                </Form.Control>
    
                <div className={classes.separtor}>
                Godzina i data rozpoczęcia:
                <DatePicker
                selected={this.state.startTime}
                onChange={this.onStartTimeChange}
                showTimeSelect
                minTime={new Date().setHours(7,0)}
                maxTime={new Date().setHours(21,0)}
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy/MM/dd HH:mm "
                excludeTimes={Array.from(this.state.finalExculdedTimes)}
                />
                </div>
                <div className={classes.separtor}>
                Godzina i data zakończenia:
                <DatePicker
                includeDates={ [this.state.startTime]}
                minTime={this.state.endTimeMinTime}
                maxTime={this.state.endTimeMaxTime}
                selected={this.state.endTime}
                onChange={this.onEndTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy/MM/dd HH:mm "
                />
                </div>
                <Button className={classes.buttonCreate} onClick={this.submitTraining} variant="success" >Zorganizuj trening</Button>
            </div>
            <div className={classes.separtor}>
            <PlayerList players={this.state.selectedPlayersList} onIconClick={this.removePlayerHandler}/>
            <TrainerList trainers={this.state.selectedTrainersList} onIconClick={this.removeTrainerHandler}/>
            </div>
            </div>
          );
      }
}
const mapStateToProps=state=>{
  return{ 
    token: state.auth.token
  }
}
export default connect(mapStateToProps) (withAlert()(TrainingCreator));