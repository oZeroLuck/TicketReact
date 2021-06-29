import {Get} from "react-axios";
import React from "react";
import {CustomNavbar} from "../components/custom-navbar";
import {CustomSnackbar} from "../components/custom-snackbar";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../components/components.css"

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnack: false,
        };
        this.images = [[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], [[11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]];
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
            <div key="Homepage">
                <CustomNavbar/>
                <Carousel>
                    {this.images.map(carouselItem => {
                        return (
                            <Carousel.Item>
                                {carouselItem.map(firstRow => {
                                    return (
                                        <Row>
                                            {firstRow.map(row => {
                                                return (
                                                    <Col>
                                                        <img key={row}
                                                             alt={"Image n" + row}
                                                             className="d-block w-100 zoom"
                                                             src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                                                             onClick={() => this.setSnack('Nice click on img n: ' + row)}
                                                        />
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    )
                                })}
                            </Carousel.Item>
                        )
                    })}
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
                <CustomSnackbar show={this.state.showSnack}
                                message={this.state.message}
                                close={() => this.emptyMessage()}/>
            </div>
        );
    }
}

export {Homepage}
