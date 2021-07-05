import React from "react";
import moment from 'moment';
import API from '../../API'
import classes from "./TrainingDay.module.css"
import { render } from "@testing-library/react";
class TrainingDay extends React.Component {

  constructor(props) {
    super(props);
    
    };
  
render(){
  var z= this.props.trainings.sort(function(a,b){
    return new Date(a.startTime) - new Date(b.startTime);
  });
    let list=z.map(training=>{

        return(
            <div className={'gg'} key={training.id} >
            <p key={training.id} ><strong>{training.name}</strong>
            <br/> {moment(training.startTime).format("YYYY-MM-DD HH:mm")} - {moment(training.endTime).format("HH:mm")}</p>
            </div>
            
            );
    })

    let x=null
    if(this.props.trainings.length!=0){
    switch(moment(this.props.trainings[0].startTime).day()){
        case 1:
          x="Poniedziałek";
          break;
          case 2:
            x="Wtorek";
            break;
            case 3:
                x="Środa";
              break;
              case 4:
                x="Czwartek";
                break;
                case 5:
                    x="Piątek";
                  break;
                  case 6:
                    x="Sobota";
                    break;
      }
    }
     
    let content=<div className={classes.center}>
      <h3>{x}</h3>
      {list}
      </div>;
    if(this.props.trainings.length == 0)content=null;
    return (
      <div>
  {content}
  </div>
      );
    }
}
export default TrainingDay;