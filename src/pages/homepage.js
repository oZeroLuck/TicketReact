import {Get} from "react-axios";
import React from "react";
import {CustomNavbar} from "../components/custom-navbar";
import {CustomSnackbar} from "../components/custom-snackbar";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import "../components/components.css"
import "./pages.css"
import {images} from "./temp-images";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnack: false,
        };
        this.images = images;
        this.setSnack = this.setSnack.bind(this);
    }

    setSnack(message) {
        this.setState({showSnack: true, message: message},
            () => {setTimeout(() => {
                this.setState({showSnack: false} )
            }, 3000)})
    }

    emptyMessage() {
        this.setState({message: null})
    }

    render() {
        return (
            <div>
            <div key="Homepage" className="vertical-center-absolute">
                <CustomNavbar/>
                <Carousel>
                    {this.images.map((carouselItem) => {
                        return(
                            <Carousel.Item>
                                <Row>
                                    {carouselItem.map((event) => {
                                        return(
                                            <Col key={event.id}>
                                                <img src={event.link}
                                                     className="d-block w-100 zoom"
                                                     alt={event.desc}
                                                     title={event.desc}
                                                     onClick={() => this.setSnack("You have clicked: " + event.id)}
                                                />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Carousel.Item>
                        )
                        }
                    )}
                </Carousel>
                <Container fluid>
                    {/*<Get url="http://localhost:8080/users">
                        {(error, response, isLoading, makeRequest) => {
                            if (error) {
                                return (<div>Something bad happened: {error.message}
                                    <button onClick={() => makeRequest({params: {reload: true}})}>Retry</button>
                                </div>)
                            } else if (isLoading) {
                                return (<div>Loading...</div>)
                            } else if (response !== null) {
                                return (<div>{response.data.map(user => (
                                    <div key={user.id}>{user.firstName}</div>
                                ))}
                                    <p>Hello</p>
                                    <button onClick={() => makeRequest({params: {refresh: true}})}>Refresh</button>
                                </div>)
                            }
                            return (<div>Default message before request is made.</div>)
                        }}
                    </Get>*/}
                </Container>
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
