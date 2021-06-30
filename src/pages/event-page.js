import React from "react";
import {LoadingSpinner} from "../components/loading-spinner";
import {EventApi} from "../services/event-api";
import {Col, Container, Row} from "react-bootstrap";
import {CustomButton} from "../components/custom-button/custom-button";
import {AddToCartBtn} from "../components/custom-button/btn-cfg";
import {CustomNavbar} from "../components/custom-navbar";
import "./pages.css"

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
            <div className={"bg-transparent"}>
                <CustomNavbar/>
                <br/>
                <Container fluid>
                    <Row className={"justify-content-center"}>
                        <h1>{this.state.event.title}</h1>
                    </Row>
                    <Row>
                        <Col className={"align-content-center"}>
                            <img src={this.state.event.link}
                                 alt={this.state.event.id}
                                 />
                        </Col>
                        <Col>
                            <Row>
                                <p>Some text placeholder</p>
                            </Row>
                            <Row>
                                <p>{this.state.event.desc}</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <p>Some form here</p>
                        <div className={"d-flex flex-row-reverse"}>
                            <CustomButton buttoncfg={AddToCartBtn} onPress={() => console.log("Add to cart works!")}/>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}

export {EventPage}
