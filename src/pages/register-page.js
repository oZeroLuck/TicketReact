import React from 'react'
import {CustomButton} from "../components/custom-button/custom-button";
import {BackBtn, LoginBtn, RegisterBtn, SignUpBtn} from "../components/custom-button/btn-cfg";
import Form from "react-bootstrap/Form";
import {Card, Container} from "react-bootstrap";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        }

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

    handleClose() {
        this.props.close()
        this.setState({
            email: "",
            password: ""
        })
    }

    toastMe() {
        if (this.state.email === "" || this.state.password === "") {
            this.setState({toast: true, toastMessage: "email or password empty", toastType: "danger"},
                () => {
                    setTimeout(() => this.setState({toast: false}), 3000)
                })
        } else {
            this.setState({toast: true, toastMessage: this.state.email + "\n" + this.state.password, toastType: null},
                () => {
                    console.log(this.state.toast)
                    setTimeout(() => this.setState({toast: false}), 3000)
                })
            this.handleClose()
        }
    }

    flushMessage() {
        console.log(this.state.toast)
        this.setState({toastMessage: null, toastType: null})
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
                                              onChange={(event) => this.handleFormEmail(event.target.value)}
                                />
                                <Form.Control className={"mb-2"}
                                              type="password"
                                              placeholder="Password"
                                              value={this.state.password}
                                              onChange={(event) => this.handleFormPassword(event.target.value)}
                                />
                                <div className={"d-flex flex-row-reverse"}>
                                    <CustomButton buttoncfg={SignUpBtn}
                                                  onPress={() => this.props.register()}/>
                                    <div className={"ml-2"}/>
                                    <CustomButton buttoncfg={BackBtn}
                                                  onPress={() => this.props.back()}/>
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

export {RegisterPage}

/*
            <div>
                <Modal show={this.props.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <div className={"container-fluid"}>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" value={this.state.email}
                                                  placeholder="Email"
                                                  onChange={(event) => this.handleEmailInput(event.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={this.state.password}
                                                  placeholder="Password"
                                                  onChange={(event) => this.handlePasswordInput(event.target.value)}/>

                                </Form.Group>
                            </Form>
                            <div className={"d-flex flex-row-reverse"}>
                                <CustomButton buttoncfg={RegisterBtn} onPress={() => this.toastMe()}/>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
                <CustomSnackbar show={this.state.toast}
                                message={this.state.toastMessage}
                                type={this.state.toastType}
                                close={() => this.flushMessage} />
            </div>
 */
