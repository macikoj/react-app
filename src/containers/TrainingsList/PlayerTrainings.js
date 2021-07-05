import React from "react";
import moment from 'moment';
import API from '../../API'
import leftArrow from '../../images/leftArrow.png'
import TrainingDay from "../../components/TrainingDay/TrainingDay"
import classes from './TrainingsList.module.css'

import Spinner from '../../components/UI/Spinner/Spinner'

class PlayerTrainings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        trainingTimes:[],
        selectedWeek:moment(),
        mon:[],
        tue:[],
        wen:[],
        thi:[],
        fri:[],
        sat:[],
        loading: true
        };
        
      }
    componentDidMount=()=>{
       
      API.get(`trainings/playerTimes/${this.state.selectedWeek.format('YYYY-MM-DD')}/`,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then( response => {

        var monu=[]
        var tueu=[]
        var wenu=[]
        var thiu=[]
        var friu=[]
        var satu=[]
          this.setState( { trainingTimes: response.data },()=>{


            response.data.forEach((training)=>{

              switch(moment(training.startTime).day()){
                case 1:

                    monu.push(training)

                  break;
                  case 2:

                    tueu.push(training)
                    break;
                    case 3:
                      wenu.push(training)
                      break;
                      case 4:
                        thiu.push(training)
                        break;
                        case 5:
                          friu.push(training)
                          break;
                          case 6:
                            satu.push(training)
                            break;
              }



            
            })
           this.setState({mon:monu})
            this.setState({tue:tueu})
            this.setState({wen:wenu})
            this.setState({thi:thiu})
            this.setState({fri:friu})
            this.setState({sat:satu})
            this.setState({loading:false})
            
        } )
    
          } )
        
      .catch( error => {
        
      } );
      
    }
    componentDidUpdate=(prevProps, prevState)=>{
     
      if(this.state.selectedWeek!==prevState.selectedWeek){

        API.get(`trainings/playerTimes/${this.state.selectedWeek.format('YYYY-MM-DD')}/`,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }).then( response => {
          var monu=[]
          var tueu=[]
          var wenu=[]
          var thiu=[]
          var friu=[]
          var satu=[]
            this.setState( { trainingTimes: response.data },()=>{


              response.data.forEach((training)=>{
  
                switch(moment(training.startTime).day()){
                  case 1:

                      monu.push(training)

                    break;
                    case 2:
                      tueu.push(training)
                      break;
                      case 3:
                        wenu.push(training)
                        break;
                        case 4:
                          thiu.push(training)
                          break;
                          case 5:
                            friu.push(training)
                            break;
                            case 6:
                              satu.push(training)
                              break;
                }



              
              })
              this.setState({mon:monu})
              this.setState({tue:tueu})
              this.setState({wen:wenu})
              this.setState({thi:thiu})
              this.setState({fri:friu})
              this.setState({sat:satu})
              this.setState({loading:false})
              
          } )

  
            } )
          
        .catch( error => {
          
        } );

    
      }  }
    addOneWeek=()=>{
        this.setState({loading:true})
      var x=moment(this.state.selectedWeek)
      this.setState({selectedWeek:x.add(7,'days')})
    }
    subOneWeek=()=>{
        this.setState({loading:true})
     var  x=moment(this.state.selectedWeek)
      this.setState({selectedWeek:x.subtract(7,'days')})

    }
    render(){

      let range=
      
      <div className={classes.pan}>
        <br/>
        <h5>{moment(this.state.selectedWeek).subtract(moment(this.state.selectedWeek).day(), 'day').format("YYYY-MM-DD")} - {moment(this.state.selectedWeek).add(7-moment(this.state.selectedWeek).day(), 'day').format("YYYY-MM-DD")}</h5>
      </div>
       var z =      <div>
      <TrainingDay trainings={this.state.mon}/>
      <TrainingDay trainings={this.state.tue}/>
      <TrainingDay trainings={this.state.wen}/>
      <TrainingDay trainings={this.state.thi}/>
      <TrainingDay trainings={this.state.fri}/>
      <TrainingDay trainings={this.state.sat}/>

   
    </div>

     if(this.state.mon.length==0 &&this.state.sat.length==0 &&this.state.fri.length==0 &&this.state.thi.length==0 
      &&this.state.wen.length==0 &&this.state.tue.length==0 ){
      
        
      z=<h5>Nie masz żadnych treningów w tym tygodniu</h5>}
      if(this.state.loading){
        z=<Spinner/>
      }
      return(

           

        <div className={classes.center} >
          <div className={classes.wrapper} >
          <img src={leftArrow} className={classes.left} alt={"lewa strzałka"} onClick={this.subOneWeek}/> 
          {range}
          <img src={leftArrow} className={classes.right} alt={"prawa strzałka"} onClick={this.addOneWeek}/> 
          </div>

          <div className={classes.boxContainer}>
          {z}

          </div>


        </div>
     

    )

    }

  }
  export default PlayerTrainings;