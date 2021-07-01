import React from 'react'
import {CustomButton} from "../components/custom-button/custom-button";
import {RegisterBtn} from "../components/custom-button/btn-cfg";
import {CustomSnackbar} from "../components/custom-snackbar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            toast: false,
            toastType: null,
            toastMessage: null
        }
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
        )
    }
}

export {RegisterPage}
