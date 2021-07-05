import React from "react";
import {LoadingSpinner} from "../components/loading-spinner";
import {EventService} from "../services/event-service";
import {Col, Container, Row} from "react-bootstrap";
import {CustomNavbar} from "../components/custom-navbar";
import "./pages.css"
import {TicketList} from "../components/ticket-list/ticket-list";
import {ErrorPage} from "./error-page";
import {CustomSnackbar} from "../components/custom-snackbar";

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.eventApi = new EventService();
        this.state = {
            event: null,
            loading: true,
            error: null,
            showSnack: false,
            snackMessage: null
        }
        this.setSnack = this.setSnack.bind(this)
    }

    componentDidMount() {
        this.eventApi.getFilm(this.props.match.params.id).then(result =>
            this.setState({
                event: result.data,
                loading: false
            })
        ).catch(error => {
            this.setState({loading: false, error: error.message})
        })
    }

    setSnack(childData) {
        console.log("Event-page setSnack!")
        console.log(childData)
        const message = "Ticket id: " + childData.id + "\nTicket seat: " + childData.seat
        this.setState(prev => ({
            showSnack: !prev.showSnack, snackMessage: message
        }), () => {
            console.log(this.state.showSnack)
            setTimeout(() => this.setState(prev => ({
                showSnack: !prev.showSnack
            }), () => console.log(this.state.showSnack)), 3000)
        })
    }

    flushSnackMessage() {
        this.setState({snackMessage: null})
    }

    render() {
        if (this.state.loading) {
            return(
                <LoadingSpinner/>
            )
        }

        if (this.state.error) {
            return <ErrorPage errCode={this.state.error}/>
        }

        return (
            <div style={{backgroundColor: "#c9c9c9"}}>
                <CustomNavbar/>
                <Container fluid>
                    <Row style={{backgroundColor: "black"}}>
                        <Container>
                            <Row>
                                <Col className={"align-content-md-center"}>
                                    <img
                                         src={this.state.event.link}
                                         alt={this.state.event.id}
                                         style={{padding: 20}}
                                         />
                                </Col>
                                <Col className={"white-text"}
                                     style={{padding: 40}}
                                >
                                    <Row>
                                        <h1>{this.state.event.title}</h1>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <p>{this.state.event.desc}</p>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <CustomNavbar/>
                <br/>
                <Container>
                    <TicketList route={this.props.location} onButtonPress={this.setSnack}/>
                </Container>
                <CustomSnackbar show={this.state.showSnack}
                                message={this.state.snackMessage}
                                close={this.flushSnackMessage}/>
            </div>
        )
    }
}

export {EventPage}
