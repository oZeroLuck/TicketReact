import React from "react";
import {CustomNavbar} from "../components/custom-navbar";
import {CustomSnackbar} from "../components/custom-snackbar";
import {Carousel, Col, Row} from "react-bootstrap";
import "../components/components.css"
import "./pages.css"
import axios from "axios";
import {LoadingSpinner} from "../components/loading-spinner";
import {Link} from "react-router-dom";
import {RegisterPage} from "./register-page";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnack: false,
            message: "",
            showRegister: false,
            images: null,
            loading: true
        };
        this.setSnack = this.setSnack.bind(this);
        this.setModal = this.setSnack.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/featured').then(result => {
            this.setState({
                loading: false,
                images: result.data
            }, () => console.log(this.state.images))
        })
    }

    testFunction() {
        console.log("This is test function")
    }

    setRegister() {
        console.log("Called setModal")
        this.setState((previous) => {
            return (
                {showRegister: !previous.showRegister}
            )
        })
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

    render() {
        if (this.state.loading) {
            return <LoadingSpinner/>
        }
        return (
            <div className={"homepage"}>
                <RegisterPage show={this.state.showRegister} close={() => this.setRegister()}/>
            <div key="Homepage" className="vertical-center-absolute">
                <CustomNavbar callBack={() => this.setRegister()}/>
                <Carousel>
                    {this.state.images.map((carouselItem) => {
                        return (
                            <Carousel.Item>
                                <Row>
                                    {carouselItem.map((event) => {
                                        return (
                                            <Col key={event.id + event.type}>
                                                <Link to={"/event/" + event.type + "/" + event.id}>
                                                    <img src={event.link}
                                                         className="d-block w-100 zoom"
                                                         alt={event.desc}
                                                         title={event.desc}
                                                         onClick={() => this.setSnack("You have clicked: " + event.id)}
                                                    />
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
            </div>
                <CustomSnackbar show={this.state.showSnack}
                                message={this.state.message}
                                close={() => this.emptyMessage()}/>
            </div>
        );
    }
}

export {Homepage}
