import React from 'react'
import {TicketService} from "../services/ticket-service";
import {Col, Container, Modal, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {CustomNavbar} from "../components/custom-navbar";
import {ErrorPage} from "./error-page";
import {TicketComponent} from "../components/ticket-list/ticket-component";
import {DeleteBtn} from "../components/custom-button/btn-cfg";
import {UserService} from "../services/user-service";
import {ReservedArea} from "./reserved-area/reserved-area";
import {EventService} from "../services/event-service";
import {ReceiptComponent} from "../components/receipt-component";

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
            total: 0,
            show: false,
            countedTickets: null
        }
        this.userService = new UserService()
        this.eventService = new EventService()
        this.checkPayment = this.checkPayment.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.createPayment = this.createPayment.bind(this)
        this.debug = this.debug.bind(this)
    }

    componentDidMount() {
        const cart = JSON.parse(window.sessionStorage.getItem("currentCart"))
        const currentUser = window.sessionStorage.getItem("currentUser")
        this.setState({
            cart: cart.tickets,
            isLogged: currentUser !== null,
            loading: false
        }, () => {
            if (this.state.cart.length > 0) {
                this.calculateTotal()
                this.countTickets()
            }
        })
    }

    calculateTotal() {
        let total = 0
        this.state.cart.forEach(ticket => total += parseInt(ticket.event.ticketCost))
        console.log(total)
        this.setState({
            total: parseInt(total) + "€"
        })
    }

    checkPayment() {
        if (this.state.isLogged) {
            const user = JSON.parse(window.sessionStorage.getItem("currentUser"))
            console.log("hi there")
            this.generateReceipt(user.id)
        } else {
            this.handleModal()
        }
    }

    generateReceipt(userId) {
        this.userService.generateReceipt(this.state.cart, userId)
            .then(success => {
                window.sessionStorage.setItem("currentCart", JSON.stringify({tickets: []}))
                this.eventService.subtract(this.state.countedTickets)
                this.props.history.push("/success/" + success.data.id)
            })
            .catch(error => {
                console.log(error)
            })
    }

    countTickets() {
        let count = []
        const cart = this.state.cart
        for (let i = 0; i < cart.length; i++) {
            console.log(i)
            const ticket = {
                id: cart[i].event.id,
                title: cart[i].event.title,
                seat: cart[i].seat,
                date: cart[i].event.date,
                hours: cart[i].event.hours,
                price: cart[i].event.ticketCost
            }
            if (count.length === 0) {
                count.push({count: 1, ticket: ticket})
            } else {
                const position = this.checkPresence(count, ticket)
                if (position !== null) {
                    count[position].count += 1
                } else {
                    count.push({count: 1, ticket: ticket})
                }
            }
        }
        this.setState({
            countedTickets: count
        })
    }

    checkPresence(array, object) {
        let i = 0
        let obj = null
        console.log(array)
        for (i; i < array.length; i++) {
            if (array[i].ticket.id === object.id && array[i].ticket.seat.name === object.seat.name) {
                obj = i
            }
        }
        return obj
    }

    createPayment() {
        this.setState({
            isLogged: true
        }, () => {
            this.handleModal()
            this.checkPayment()
        })
    }

    handleDelete(data, id) {
        const ticket = {id: id, seat: data.name}
        let index = 0
        let ret = null
        for (index; index < this.state.cart.length; index++) {
            if (this.state.cart[index].ticket.id === ticket.id && this.state.cart[index].seat.name === ticket.seat.name) {
                ret = index
            }
        }
        if (ret !== null) {
            this.state.cart.splice(ret, 1)
        }
    }

    handleModal() {
        this.setState(prev => ({
            show: !prev.show
        }))
    }

    redirectTo(place) {
        if (place.toLowerCase() === 'login') {
            this.props.history.push("/login")
        } else {
            this.props.history.push("/login/register")
        }
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
                                <p className={"mb-0"}>Seat: {ticket.seat.label}</p>
                            </Row>
                            <Row>
                                <p className={"mb-0"}>{ticket.event.date} - {ticket.event.hours}</p>
                            </Row>
                        </Col>
                        <Col sm={3} className={"p-0 my-auto"}>
                            <h3>{ticket.event.ticketCost}</h3>
                        </Col>
                    </Row>
                )
            }
        ))
    }

    debug() {
        console.log(this.state)
    }

    render() {
        if (this.state.error) {
            return <ErrorPage errCode={this.state.errorMsg}/>
        }

        return (
            <div style={{minHeight: "100%"}}>
                <CustomNavbar/>
                <button onClick={this.debug}>Debug</button>
                <h1 className={"text-center pt-5"}>My Cart</h1>
                <Container fluid style={{backgroundColor: "#ededed"}} className={"mt-5"}>
                    {this.state.loading ?
                        <LoadingSpinner/> :
                        this.state.cart.length > 0 ?
                            <Row className={"ml-5 mr-5"}>
                                <Col sm={8}>
                                    {this.state.cart.map(ticket => {
                                        return (
                                        <Row>
                                            <TicketComponent data={ticket.event}
                                                             seats={[ticket.seat]}
                                                             button={DeleteBtn}
                                                             mode={true}
                                                             id={ticket.event.id}
                                                             handleClick={this.handleDelete}
                                            />
                                        </Row>
                                    )})}
                                </Col>
                                <Col style={{backgroundColor: "#c9c9c9"}} className={"pb-4"}>
                                    {this.state.countedTickets ?
                                        <ReceiptComponent cart={this.state.countedTickets}
                                                       callBack={this.checkPayment}/> :
                                        <p>Loading</p>
                                    }
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
                <Modal show={this.state.show} onHide={() => this.handleModal()} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontSize: "xx-large"}} className={"text-centered"}>
                            You're almost done!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <ReservedArea callBack={() => this.createPayment()}/>
                        </Container>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export {MyCartPage}
/*
<Card className={"total mt-3"} style={{minWidth: "80%"}}>
                                        <Card.Header>
                                            <Card.Title>Receipt</Card.Title>
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
                                            <CustomButton buttoncfg={PayButton}
                                                          onPress={() => this.checkPayment()}
                                            />
                                        </Card.Footer>
                                    </Card>
 */
