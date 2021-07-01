import React from 'react'
import {Card, CardGroup} from "react-bootstrap";
import {CustomButton} from "./custom-button/custom-button";
import {AddToCartBtn} from "./custom-button/btn-cfg";
import Form from "react-bootstrap/Form"
import "./components.css"

class TicketList extends React.Component {

    constructor(props) {
        super(props);
        this.tickets = [1, 2, 3, 4, 5]
    }

    handleClick() {
        console.log("You've added something")
    }

    render() {
        return (
            <div key={"ticket-list"}>
                {this.tickets.map(ticket => (
                    <CardGroup>
                                <Card className={"mt-5 mb-5"} style={{flexGrow: "2"}}>
                                    <Card.Body>
                                        <Card.Title>
                                            <h2>I'm random title</h2>
                                        </Card.Title>
                                        <Card.Text>
                                            {"I'm text " + ticket + "Testing longass desc .................................................................................................................................................................."}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className={"mt-5 mb-5"}>
                                    <Card.Body>
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
                                        <CustomButton buttoncfg={AddToCartBtn} onPress={() => this.handleClick()}/>
                                    </Card.Body>
                                </Card>
                    </CardGroup>
                ))}
            </div>
        )
    }
}

export {TicketList}
