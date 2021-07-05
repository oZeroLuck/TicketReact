import React from 'react'
import {TicketService} from "../services/ticket-service";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {CustomNavbar} from "../components/custom-navbar";
import {TicketList} from "../components/ticket-list/ticket-list";
import {ErrorPage} from "./error-page";

class MyCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.ticketApi = new TicketService()
        this.state = {
            cart: null,
            loading: true,
            error: false,
            errorMsg: null
        }
        this.cart = [1, 2, 3, 4]
    }

    componentDidMount() {
        this.ticketApi.getCart(1)
            .then(result =>
                this.setState({cart: result.data, loading: false}, () => console.log(result.data)))
            .catch(error =>
                this.setState({error: true, errorMsg: error.message}))
    }

    render() {

        if(this.state.error) {
            return <ErrorPage errCode={this.state.errorMsg}/>
        }

        return(
            <div>
                <CustomNavbar/>
                <h1 className={"text-center mt-5"}>My Cart</h1>
                <Container fluid>
                    {this.state.loading ?
                        <LoadingSpinner/> :
                        <Container fluid>
                            <Row>
                                <Col sm={8}>
                                    <TicketList route={this.props.location} data={this.cart}/>
                                </Col>
                                <Col className={"mt-sm-5 pl-4"} style={{backgroundColor: "#c9c9c9"}}>
                                    <Card className={"total mt-3"}>
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
                        </Container>
                    }
                </Container>
            </div>
        )
    }
}

export {MyCartPage}
