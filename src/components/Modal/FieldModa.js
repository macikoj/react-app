import AddField from '../FootballField/AddField'
import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class FieldModa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show:false

        };
    }

  
 handleClose = () => {

this.setState({show:false});
}
 handleShow = () =>{

  this.setState({show:true})};
  render(){

    return (
     <div>
        <Button variant="primary" size='lg' onClick={()=>this.handleShow()}>
    {this.props.label}
        </Button>
  
        <Modal show={this.state.show} onHide={()=>this.handleClose()} >
          <Modal.Header closeButton>
  
            <Modal.Title>Dodaj boisko</Modal.Title>

          </Modal.Header>
      
          <AddField addFieldHandler={this.props.addFieldHandler}/>

        </Modal>
      </div>
    );
  }
}
  export default FieldModa