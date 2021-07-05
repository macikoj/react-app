import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import API from '../../API'
 import st from'./st.module.css'
import interactionPlugin from "@fullcalendar/interaction"; 
import moment from 'moment'
import {withAlert} from 'react-alert'

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import RegisterEventModal from "./EventModal/RegisterEventModal";
import ShowEventModal from "./EventModal/ShowEventModal";
class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    showModal:false,
    showEvent:false,
    title:null,
    formation:null,
    showEventDate:null,
    teamCompositions:[],
    selectedDate:moment(),
    calendarWeekends: true,
    calendarEvents: []
  };
  onModalClose=()=>{
    this.setState({showModal:false})
  }
  onModalEventClose=()=>{
    this.setState({showEvent:false})
  }
  componentDidMount = () => {
  API.get('teamcompositions/getsimpleteamcompositions', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {


      this.setState({teamCompositions:response.data})
      
      })

      .catch(error => {

      });
      API.get(`calendarEvents/getevents/${moment().format("YYYY-MM-DD")}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
      .then(response => {

       var events=[];

        response.data.forEach((e)=>{
           var d={
              title:e.title+" formacja: "+e.teamCompositionName,
              start:moment(e.dateStart).format("YYYY-MM-DD")
              }
              events.push(d)
        })
        this.setState({calendarEvents:events})
      })
      .catch(error => {

      });
  }
 showEventHandler=(info)=>{
    const title=info.event.title.split("formacja: ")[0]
    const formation=info.event.title.split("formacja: ")[1]
    this.setState({showEvent:true})
    this.setState({title:title})
    this.setState({formation:formation})
    this.setState({showEventDate:moment(info.event._instance.range.start).format("YYYY-MM-DD")})
  }
  render() {


    return (
      <div className={st.demoapp}>

        <div className={st.demoapptop} />
        <div className={st.demoappcalendar}>
          <RegisterEventModal show={this.state.showModal} teamCompositions={this.state.teamCompositions} onModalClose={this.onModalClose} addEvent={this.addEvent}/>
          <ShowEventModal show={this.state.showEvent} title={this.state.title} eventDate={this.state.showEventDate} formation={this.state.formation} onModalClose={this.onModalEventClose} />
          <FullCalendar
            defaultView="dayGridMonth"
            allDaySlot={true}

          
            timeGridEventMinHeight='44'
            eventBackgroundColor='aqua'
            header={{
              left: "prev,next",
              center: "title",
              right: ""
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={(info) => this.showEventHandler(info)}
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      calendarWeekends: !this.state.calendarWeekends
    });
  };
  addEvent=(form)=>{
    
    
    var data={
     
      title:form.name.value,
      dateStart:this.state.selectedDate,
      teamCompositionId:form.position.value
      
      
    }
    var compName = this.state.teamCompositions.find(obj => {
      return obj.value == form.position.value
    })
    var d=new Date(this.state.selectedDate)
    d.setDate(d.getDate() + 1)
    var calendarEvent={
      title:form.name.value+" formacja: "+compName.displayValue,
      start:d.toISOString().slice(0,10)
    }

    API.post('calendarEvents',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    .then(response => {
      var calendarEventsUpdated=[...this.state.calendarEvents]
      calendarEventsUpdated.push(calendarEvent)
      this.setState({calendarEvents:calendarEventsUpdated})
      this.props.alert.success("Dodano nową rozgrywkę")
    })
    .catch(error => {
      this.props.alert.error("Nie udało się dodać rozgrywki")
      
    });


  }

  handleDateClick=arg=>{
    this.setState({selectedDate:arg.date})
    this.setState({showModal:true})

    
  
      

    
  };

}
export default withAlert() (Calendar);