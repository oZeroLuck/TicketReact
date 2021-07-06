import React from 'react'
import {Modal} from "react-bootstrap";
import {TicketService} from "../services/ticket-service";

class LocationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.data,
            soldTicket: null
        }
        this.ticketService = new TicketService()
    }

    componentDidMount() {
        console.log(this.ticketService.getSold(this.state.location.id))
    }

    fetchData() {
        console.log(this.ticketService.getSold(this.state.location.id))
    }

    render() {
        return (
            <Modal centered show={this.props.show}
                   onEntering={this.fetchData()}
                   onHide={() => this.props.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Title
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {JSON.stringify(this.props.data)}
                </Modal.Body>
            </Modal>
        )
    }
}

export {LocationModal}
