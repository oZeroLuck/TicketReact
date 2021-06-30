import React from 'react'
import {Card, Col, Row} from "react-bootstrap";
import {CustomButton} from "./custom-button/custom-button";
import {AddToCartBtn} from "./custom-button/btn-cfg";
import Form from "react-bootstrap/Form";

class TicketList extends React.Component {

    constructor(props) {
        super(props);
        this.tickets = [1, 2, 3, 4, 5]
    }

    render() {
        return (
            <div>
                {this.tickets.map(ticket => (
                    <Card className={"mt-5 mb-5"}>
                        <Card.Body>
                            <Row>
                                <Col md={10}>
                                    <Card.Title>
                                        <h2>I'm random title</h2>
                                    </Card.Title>
                                    <Card.Text>
                                        {"I'm text " + ticket + "Testing longass desc .................................................................................................................................................................."}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Row>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Pick a seat</Form.Label>
                                                <Form.Control as={"select"}>
                                                    <option>Front</option>
                                                    <option>Center</option>
                                                    <option>Back</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row>
                                        <CustomButton buttoncfg={AddToCartBtn}/>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        )
    }
}

export {TicketList}
