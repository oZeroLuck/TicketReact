import React from "react";
import {LoadingSpinner} from "../components/loading-spinner";
import {EventApi} from "../services/event-api";
import {Col, Container, Row} from "react-bootstrap";
import {CustomNavbar} from "../components/custom-navbar";
import "./pages.css"
import {TicketList} from "../components/ticket-list";

class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.eventApi = new EventApi();
        this.state = {
            event: null,
            loading: true
        }
    }

    componentDidMount() {
        this.eventApi.getFilm(this.props.match.params.id).then(result =>
            this.setState({
                event: result.data,
                loading: false
            })
        )
    }

    render() {
        if (this.state.loading) {
            return(
                <LoadingSpinner/>
            )
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
                    <TicketList/>
                </Container>
            </div>
        )
    }
}

export {EventPage}
