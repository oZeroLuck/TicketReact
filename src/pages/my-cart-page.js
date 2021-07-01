import React from 'react'
import {TicketApi} from "../services/ticket-api";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {CustomNavbar} from "../components/custom-navbar";
import {TicketList} from "../components/ticket-list";

class MyCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.ticketApi = new TicketApi()
        this.state = {
            cart: null,
            loading: true
        }
    }

    componentDidMount() {
        this.ticketApi.getCart(1).then(result =>
            this.setState({cart: result.data, loading: false}, () => console.log(result.data))
        )
    }

    render() {

        return(
            <div>
                <CustomNavbar/>
                <h1 className={"text-center mt-5"}>My Cart</h1>
                <Container fluid>
                    {this.state.loading ?
                        <LoadingSpinner/> :
                        <Row>
                            <Col sm={8}>
                                <TicketList route={this.props.location}/>
                            </Col>
                            <Col className={"mt-sm-5"}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Receipt (PH)</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <p>Price</p>
                                        <br/>
                                        <p>Price</p>
                                        <br/>
                                        <hr/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant={"success"}>Pay</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        )
    }
}

export {MyCartPage}
