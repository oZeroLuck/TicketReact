import React from 'react'
import {CustomButton} from "../../components/custom-button/custom-button";
import {BackBtn, SignUpBtn} from "../../components/custom-button/btn-cfg";
import Form from "react-bootstrap/Form";
import {Card, Container} from "react-bootstrap";
import {UserService} from "../../services/user-service";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            showSnack: false,
            snackMessage: ""
        }

        this.userService = new UserService()
        this.handleClose = this.handleClose.bind(this)
    }

    handleFirstNameInput(input) {
        this.setState({
            firstName: input
        })
    }

    handleLastNameInput(input) {
        this.setState({
            lastName: input
        })
    }

    handleEmailInput(input) {
        this.setState({
            email: input
        })
    }

    handlePasswordInput(input) {
        this.setState({
            password: input
        })
    }

    checkFields() {
        if (this.state.firstName.trim() === "") {
            return false
        }
        if(this.state.lastName.trim() === "") {
            return false
        }
        if(this.state.email.trim() === "") {
            return false
        }
        return this.state.password.trim() !== "";

    }

    // Check fields
    handleRegister() {
        if (this.checkFields()) {
            const userData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            this.register(userData)
        } else {
            const snackMessage = {
                showSnack: true,
                snackMessage: "Obligatory fields empty",
                snackMode: "warning"
            }
            this.props.setSnack(snackMessage)
        }
    }


    register(newUser) {
        this.userService.registerUser(newUser).then(result => {
            const snackMode = result.error ? 'danger' : 'success'
            const snackData = {
                showSnack: true,
                snackMessage: result.message,
                snackMode: snackMode
            }
            this.props.setSnack(snackData)
            if(!result.error) {
                this.handleClose()
            }
        })
    }

    // Reset all fields before switching
    handleClose() {
        this.setState({
            email: "",
            password: "",
            fistName: "",
            lastName: ""
        }, () => this.props.back())
    }

    // Show state button
    debug() {
        console.log(this.state)
    }

    render() {
        return(
            <Container fluid={"sm"} className={"align-content-center mt-5"}>
                <Card className={"text-center"}
                      bg={"light"}
                      style={{width: "50%", margin: "auto"}}
                >
                    <Card.Body>
                        <h1><strong>Register</strong></h1>
                        <hr/>
                        <Container fluid={"sm"} style={{width: "70%"}}>
                            <Form className={"mb-2"}>
                                <Form.Control className={"mb-2 mt-2"}
                                              type="text"
                                              placeholder="First Name"
                                              value={this.state.firstName}
                                              onChange={(event) => this.handleFirstNameInput(event.target.value)}
                                />
                                <Form.Control className={"mb-2 mt-2"}
                                              type="text"
                                              placeholder="Last Name"
                                              value={this.state.lastName}
                                              onChange={(event) => this.handleLastNameInput(event.target.value)}
                                />
                                <Form.Control className={"mb-2 mt-2"}
                                              type="text"
                                              placeholder="E-Mail"
                                              value={this.state.email}
                                              onChange={(event) => this.handleEmailInput(event.target.value)}
                                />
                                <Form.Control className={"mb-2"}
                                              type="password"
                                              placeholder="Password"
                                              value={this.state.password}
                                              onChange={(event) => this.handlePasswordInput(event.target.value)}
                                />
                                <div className={"d-flex flex-row-reverse"}>
                                    <CustomButton buttoncfg={SignUpBtn}
                                                  onPress={() => this.handleRegister()}/>
                                            <div className={"ml-2"}/>
                                                <CustomButton buttoncfg={BackBtn}
                                                onPress={() => this.handleClose()}/>
                                </div>
                            </Form>
                        </Container>
                        <hr/>
                        <button onClick={() => this.debug()}>Debug</button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export {RegisterForm}
