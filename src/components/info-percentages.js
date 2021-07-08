import {Card, Col, Container, ProgressBar, Row} from "react-bootstrap";
import React from "react";

function InfoPercentages(props) {
    return (
        <Card className={"w-100 mb-1 m-2"}>
            <Card.Body style={{padding: "0.25rem 1rem"}}>
                <Container fluid>
                    <Row>
                        <Col>
                            <strong>{props.seat.label}</strong>
                        </Col>
                        <Col className={"d-flex flex-row-reverse text-center"}>
                            Remaining: {(props.seat.max - props.data.soldTicket[props.seat.name]) + '/' + props.seat.max}
                        </Col>

                    </Row>
                    <Row>
                        <Container fluid style={{padding: "0 0"}}>
                            <Card>
                                <Card.Body style={{padding: "1rem 1rem"}}>
                                    <ProgressBar striped
                                                 now={Math.ceil(100 - props.data.soldTicket[props.seat.name] * 100 / props.seat.max)}/>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export {InfoPercentages}
