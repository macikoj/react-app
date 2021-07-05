
import React from "react";
import Modal from 'react-bootstrap/Modal'
import RegisterEvent from '../../../components/RegisterEvent/RegisterEvent'

class RegisterEventModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show:false

        };
    }
    static getDerivedStateFromProps(props, state) {
      if (props.show !== state.show) {
        return {
          show:props.show,
        };
      }
    }
  

  render(){

    return (
     <div>

  
        <Modal show={this.state.show} onHide={()=>this.props.onModalClose()} >
          <Modal.Header closeButton>
  
            <Modal.Title>Dodaj rozgrywkę</Modal.Title>

          </Modal.Header>
      
          <RegisterEvent teamCompositions={this.props.teamCompositions} addEvent={this.props.addEvent}/>
       
        </Modal>
      </div>
    );
  }
}
  export default RegisterEventModal