import React from "react";
import {CustomSnackbar} from "../components/custom-snackbar";
import {Card, Carousel, Col, Container, Row} from "react-bootstrap";
import "../components/components.css"
import "./pages.css"
import axios from "axios";
import {LoadingSpinner} from "../components/loading-spinner";
import {Link} from "react-router-dom";
import {ErrorPage} from "./error-page";
import {CustomNavbar} from "../components/custom-navbar";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnack: false,
            message: "",
            showRegister: false,
            images: null,
            loading: true,
            error: false,
            errorMsg: null,
            isLogged: false,
            currentUser: null
        };
        this.setSnack = this.setSnack.bind(this);
    }

    componentDidMount() {
        const currentUser = window.sessionStorage.getItem("currentUser")
        console.log("Current user on homepage")
        console.log(currentUser)
        if(currentUser !== null) {
            this.setState({isLogged: true, currentUser: JSON.parse(currentUser)},
                () => console.log(this.state.currentUser))
        }
        axios.get('http://localhost:8080/featured', {timeout: 10000}).then(result => {
            this.setState({
                loading: false,
                images: result.data
            }, () => console.log(this.state.images))
        }).catch(error => {
            this.setState({
                loading: false,
                error: true,
                errorMsg: error.message
            })
        })
    }

    // Use this function to test a component hook functionality
    testFunction() {
        console.log("This is test function")
    }

    setSnack(message) {
        console.log("Snack intensifies")
        this.setState({showSnack: true, message: message},
            () => {setTimeout(() => {
                this.setState({showSnack: false} )
            }, 3000)})
    }

    emptyMessage() {
        this.setState({message: null})
    }

    goThere() {
        console.log(this.props.history)
        this.props.history.push('/myCart')
    }

    render() {
        if (this.state.loading) {
            return <LoadingSpinner/>
        }
        if (this.state.error) {
            return (
                <div>
                    <Container fluid={"lg"}>
                        <ErrorPage errCode={this.state.errorMsg}/>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                <CustomNavbar/>
                <Container fluid key="Homepage">
                        <Row className={"justify-content-center pt-2 pb-2"} style={{backgroundColor: "#ffc107"}}>
                            {this.state.isLogged ? <h1>Welcome {this.state.currentUser.firstName}</h1> :
                                <h1>Welcome</h1>
                            }
                        </Row>
                    <Row className={"p-3"}>
                        <p>Buy your tickets to your favourite event at the lowest price!</p>
                    </Row>
                    <Row style={{backgroundColor: "#ffc107"}} className={"p-2"}>
                        <h3>Check our featured events!</h3>
                    </Row>
                    <Row style={{backgroundColor: "#ffc107"}}>
                        <Carousel indicators={false}>
                            {this.state.images.map((carouselItem) => {
                                return (
                                    <Carousel.Item>
                                        <Row>
                                            {carouselItem.map((event) => {
                                                return (
                                                    <Col key={event.id + event.type}>
                                                        <Link to={"/event/" + event.type + "/" + event.id}
                                                              style={{color: "black", textDecoration: "none"}}
                                                        >
                                                            <Card className={"zoom"} style={{height: "100%"}}
                                                                  onClick={() => this.setSnack("You have clicked: " + event.id)}>
                                                                <Card.Img variant={"top"} as={"img"}
                                                                          src={event.link}
                                                                          alt={event.desc}
                                                                          title={event.desc}
                                                                />
                                                                <Card.Body>
                                                                    <Card.Text>
                                                                        {event.desc}
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Carousel.Item>
                                )
                                }
                            )}
                        </Carousel>
                        <br/>
                    </Row>
                    <Row style={{height: "2rem", backgroundColor: "#ffc107"}}/>
                    <CustomSnackbar show={this.state.showSnack}
                                    message={this.state.message}
                                    close={() => this.emptyMessage()}/>
                </Container>
                {/*<button type={"button"} onClick={() => this.goThere()}>GoThere</button>*/}
            </div>
        );
    }
}

export {Homepage}
