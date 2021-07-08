import React from 'react'
import {TicketService} from "../services/ticket-service";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {CustomNavbar} from "../components/custom-navbar";
import {ErrorPage} from "./error-page";
import {TicketComponent} from "../components/ticket-list/ticket-component";
import {DeleteBtn, PayButton} from "../components/custom-button/btn-cfg";
import {CustomButton} from "../components/custom-button/custom-button";

class MyCartPage extends React.Component {
    constructor(props) {
        super(props);
        this.ticketApi = new TicketService()
        this.state = {
            cart: null,
            loading: true,
            error: false,
            errorMsg: null,
            isLogged: false,
            total: 0
        }
        this.cart = [1, 2, 3, 4]
    }

    componentDidMount() {
        const cart = JSON.parse(window.sessionStorage.getItem("currentCart"))
        const currentUser = window.sessionStorage.getItem("currentUser")
        this.setState({
            cart: cart.tickets,
            isLogged: currentUser !== null,
            loading: false
        }, () => this.calculateTotal())
    }

    calculateTotal() {
        let total = 0
        this.state.cart.forEach(ticket => total += parseInt(ticket.event.ticketCost))
        console.log(total)
        this.setState({
            total: parseInt(total) + "€"
        })
    }

    receipt() {
        return (this.state.cart.map(ticket => {
                console.log(ticket.event.title)
                return (
                    <Row>
                        <Col>
                            <Row>
                                <strong>{ticket.event.title}</strong>
                            </Row>
                            <Row>
                                <p>{ticket.event.date} - {ticket.event.hours}</p>
                            </Row>
                        </Col>
                        <Col sm={3} className={"p-0"}>
                            <strong>{ticket.event.ticketCost}</strong>
                        </Col>
                    </Row>
                )
            }
        ))
    }

    render() {

        if (this.state.error) {
            return <ErrorPage errCode={this.state.errorMsg}/>
        }

        return (
            <div style={{minHeight: "100%"}}>
                <CustomNavbar/>
                <h1 className={"text-center pt-5"}>My Cart</h1>
                <Container fluid style={{backgroundColor: "#ededed"}} className={"mt-5"}>
                    {this.state.loading ?
                        <LoadingSpinner/> :
                        this.state.cart.length > 0 ?
                            <Row className={"ml-5 mr-5"}>
                                <Col sm={8}>
                                    {this.state.cart.map(ticket => {
                                        console.log([ticket.seat])
                                        return (
                                        <Row>
                                            <TicketComponent data={ticket.event}
                                                             seats={[ticket.seat]}
                                                             button={DeleteBtn}
                                                             mode={true}
                                            />
                                        </Row>
                                    )})}
                                </Col>
                                <Col style={{backgroundColor: "#c9c9c9"}}>
                                    <Card className={"total mt-3"} style={{minWidth: "80%"}}>
                                        <Card.Header>
                                            <Card.Title>Receipt (PH)</Card.Title>
                                        </Card.Header>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <Container fluid className={"ml-3"}>
                                                    {this.receipt()}
                                                </Container>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row className={"pl-3"}>
                                                    <Col className={"d-flex flex-row-reverse mr-5"}>
                                                        <h2>Total: </h2>
                                                    </Col>
                                                    <Col className={"d-flex flex-row-reverse mr-5"}>
                                                        <h2>{this.state.total}</h2>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <Card.Footer className={"d-flex flex-row-reverse"}>
                                            <CustomButton buttoncfg={PayButton}>Pay</CustomButton>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row> :
                            <Container fluid className={"pt-lg-5 pb-lg-5"}>
                                <Row className={"pt-0"}>
                                    <img src="https://i.gifer.com/4ZOQ.gif"
                                         className={"w-100"}
                                         alt="img"
                                    />
                                </Row>
                                <Row>
                                    <Col className={"text-center"}>
                                        <h1 style={{fontSize: "xxx-large"}}>
                                            Your cart is empty!
                                        </h1>
                                        <br/>
                                        <p style={{fontSize: "x-large"}}>
                                            Go buy some eh?
                                        </p>
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
