import React from "react";
import Modal from 'react-bootstrap/Modal'

class ShowEventModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false

        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                show: props.show,
            };
        }
    }

    render() {

        return (
            <div>


                <Modal show={this.state.show} onHide={() => this.props.onModalClose()} 
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>

                        <Modal.Title>{this.props.title}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <p>Formacja: {this.props.formation}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.eventDate}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ShowEventModal