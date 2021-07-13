import {Card, Col, Container, Modal, ProgressBar, Row} from "react-bootstrap";
import {ErrorPage} from "../pages/error-page";
import React from "react";
import "./components.css"
import {InfoPercentages} from "./info-percentages";

function InfoModalComponent(props) {
    const data = props.data
    if (data.error) {
        return(
            <Modal centered show={props.show}
                   onHide={() => props.close()}
                   dialogClassName={"modal-90w"}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Error
                    </Modal.Title>
                    <Modal.Body>
                        <Container fluid>
                            <ErrorPage errcode={data.errorMsg}/>
                        </Container>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        )}
    return (
        <Modal centered show={props.show}
               onEnter={() => console.log(props.data)}
               onHide={() => props.close()}
               dialogClassName={"modal-90w"}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Event sale Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col className={"p-0 mr-4"} style={{display: "flex"}}>
                            <img src={data.imagePath}
                                 className={"small-img"}
                                 alt={"image"}
                            />
                        </Col>
                        <Col>
                            <Container>
                                <Card body className={"p-0"}>
                                    <Row style={{margin: "0 0"}}>
                                        <Col className={"text-center"}>
                                            <h3>Tickets Numbers</h3>
                                        </Col>
                                    </Row>
                                    {data.location.seats.map(seat => {
                                        return (
                                            <Row>
                                                <InfoPercentages seat={seat} data={data}/>
                                            </Row>
                                        )
                                    })}
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export {InfoModalComponent}
