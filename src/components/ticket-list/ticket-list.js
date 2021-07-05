import React from 'react'
import {Card, CardGroup} from "react-bootstrap";
import {CustomButton} from "../custom-button/custom-button";
import {AddToCartBtn, DeleteBtn} from "../custom-button/btn-cfg";
import Form from "react-bootstrap/Form"
import "../components.css"

class TicketList extends React.Component {

    constructor(props) {
        super(props);
        this.tickets = [1, 2, 3, 4, 5]
        this.state = {
            selectedSeat: "Front",
            button: null,
            loading: true,
            tickets: props.data
        }
    }

    componentDidMount() {
        if (this.props.route.pathname === "/myCart") {
            this.setState(
                {
                    button: DeleteBtn,
                    loading: false
                })
        } else {
            this.setState({button: AddToCartBtn, loading: false})
        }
    }

    handleChange(input) {
        this.setState({selectedSeat: input})
    }

    handleClick(input) {
        const ticket = {
            id: input, seat: this.state.selectedSeat
        }
        this.props.onButtonPress(ticket)
    }

    render() {
        if(this.state.loading) {
            return null
        }
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
                                                <Form.Control as={"select"}
                                                              value={this.state.selectedSeat}
                                                              onChange={event =>
                                                                  this.handleChange(event.target.value)}
                                                >
                                                    <option value={"Front"}>Front</option>
                                                    <option value={"Center"}>Center</option>
                                                    <option value={"Back"}>Back</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                        <CustomButton buttoncfg={this.state.button}
                                                      onPress={() => this.handleClick(ticket)}/>
                                    </Card.Body>
                                </Card>
                    </CardGroup>
                ))}
            </div>
        )
    }
}

export {TicketList}
