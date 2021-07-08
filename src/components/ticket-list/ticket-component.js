import {Card, CardGroup, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {CustomButton} from "../custom-button/custom-button";
import React, {useState} from "react";

function TicketComponent(props) {
    const [seat, setSeat] = useState(props.seats[0].name)

        return (
            <CardGroup>
            <Card className={"mt-5 mb-5"} style={{flexGrow: "2"}}>
            <Card.Body className={"pr-0"}>
                <Card.Title>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h2>{props.data.title}</h2>
                            </Col>
                            <Col>
                                <h2>{props.data.date} - {props.data.hours}</h2>
                            </Col>
                        </Row>
                    </Container>
                </Card.Title>
                <Card.Text>
                    <p style={{fontSize: "x-large"}}>Location: {props.data.locationName}</p>
                </Card.Text>
            </Card.Body>
            </Card>
            <Card className={"mt-5 mb-5"}>
                <Card.Body>
                    <Container fluid>
                        <Row>
                        <Form className={"w-100"}>
                            <Form.Group>
                                <Form.Label>Pick a seat</Form.Label>
                                <Form.Control as={"select"}
                                              onChange={event =>
                                                  setSeat(event.target.value)}
                                >
                                    {props.seats.map(seat => {
                                        return <option value={seat.name}> {seat.label}</option>
                                            })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        </Row>
                        <Row>
                            <Col style={{fontSize: "x-large"}}>
                                Cost: <strong>{props.data.ticketCost}</strong>
                            </Col>
                            <Col>
                                <CustomButton buttoncfg={props.button}
                                              onPress={() => props.handleClick(seat)}/>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            </CardGroup>
        )
}

export {TicketComponent}