import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {CustomButton} from "./custom-button/custom-button";
import {PayButton} from "./custom-button/btn-cfg";
import React from "react";

function ReceiptComponent(props) {
    function calculateTotal() {
        let total = 0
        props.cart.forEach(group => {
            total += group.count * parseInt(group.ticket.price)
        })
        return total
    }

    if(props.cart !== null) {
        return (
            <Card className={"total mt-3"} style={{minWidth: "80%"}}>
                <Card.Header>
                    <Card.Title>Receipt</Card.Title>
                </Card.Header>
                <ListGroup>
                    <ListGroup.Item className={"p-0 pt-1 pb-1"}>
                        <Container fluid>
                            {props.cart.map(group => {
                                    return (
                                        <Row noGutters className={"mb-1"}>
                                            <Col sm={2}>
                                                <strong>{group.count}x</strong>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <strong className={"mb-0"}>{group.ticket.title}</strong>
                                                </Row>
                                                <Row>
                                                    <p className={"mb-0"}>Seat: {group.ticket.seat.label}</p>
                                                </Row>
                                                <Row>
                                                    <p className={"mb-0"}>{group.ticket.date} - {group.ticket.hours}</p>
                                                </Row>
                                            </Col>
                                            <Col sm={3} className={"p-0 my-auto"}>
                                                <h3>{parseInt(group.ticket.price) * group.count}€</h3>
                                            </Col>
                                        </Row>
                                    )
                                }
                            )}
                        </Container>
                    </ListGroup.Item>
                    <ListGroup.Item className={"pt-1 pb-1"}>
                        <Row className={"pl-3"}>
                            <Col className={"d-flex flex-row-reverse mr-5"}>
                                <h2>Total</h2>
                            </Col>
                            <Col className={"d-flex flex-row-reverse mr-5"}>
                                <h2>{calculateTotal()}€</h2>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <Card.Footer className={"d-flex flex-row-reverse"}>
                    <CustomButton buttoncfg={PayButton}
                                  onPress={() => props.callBack()}
                    />
                </Card.Footer>
            </Card>
        )
    } else {
        return <div>Loading</div>
    }
}

export {ReceiptComponent}
