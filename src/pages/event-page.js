import React from "react";
import {LoadingSpinner} from "../components/loading-spinner";
import {EventService} from "../services/event-service";
import {Col, Container, Row} from "react-bootstrap";
import {CustomNavbar} from "../components/custom-navbar";
import "./pages.css"
import {ErrorPage} from "./error-page";
import {CustomSnackbar} from "../components/custom-snackbar";
import {TicketComponent} from "../components/ticket-list/ticket-component";
import {TicketService} from "../services/ticket-service";
import {AddToCartBtn} from "../components/custom-button/btn-cfg";

class EventPage extends React.Component {

    constructor(props) {
        super(props);
        this.eventApi = new EventService();
        this.state = {
            event: null,
            loading: true,
            availableSeats: null,
            error: null,
            showSnack: false,
            snackMessage: null
        }
        this.addToCart = this.addToCart.bind(this)
        this.ticketService = new TicketService()
        this.eventService = new EventService()
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.eventApi.getEvent(id).then(result =>
            this.setState({
                event: result.data
            }, () => this.calculateSeats(id))
        ).catch(error => {
            this.setState({loading: false, error: error.message})
        })
    }

    calculateSeats(id) {
        this.eventService.getLocation(id).then(location =>
            this.ticketService.getSold(id).then(sold => {
                let available = []
                location.data.seats.map(seat => {
                    if (seat.max - sold.data[seat.name]) {
                        available.push({name: seat.name, label: seat.label})
                    }
                    return null
                })
                this.setState({
                    availableSeats: available,
                    loading: false
                })}
            ))
    }

    addToCart(seat) {
        console.log(this.state)
        const ticket = {
            event: this.state.event,
            seat: seat
        }
        let newCart = JSON.parse(window.sessionStorage.getItem("currentCart"))
        console.log(newCart)
        newCart.tickets.push(ticket)
        window.sessionStorage.setItem("currentCart", JSON.stringify(newCart))
        if (window.sessionStorage.getItem("currentUser") !== null) {
            console.log("save this to db")
        }
        const message = "Added to cart"
        this.setSnack(message)
    }

    setSnack = function(message) {
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
                        <Container style={{height: "fit-content"}}>
                            <Row>
                                <Col className={"align-content-center justify-content-center"}>
                                    <img
                                         src={this.state.event.link}
                                         alt={this.state.event.id}
                                         className={"event-image"}
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
                <div style={{height: "3.5rem", backgroundColor: "#343a40"}}/>
                <br/>
                <Container>
                    <TicketComponent
                        button={AddToCartBtn}
                        data = {this.state.event}
                        seats = {this.state.availableSeats}
                        handleClick={this.addToCart}/>
                </Container>
                <CustomSnackbar show={this.state.showSnack}
                                message={this.state.snackMessage}
                                close={this.flushSnackMessage}/>
            </div>
        )
    }
}

export {EventPage}
