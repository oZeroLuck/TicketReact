import React from 'react'
import {Card, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {CustomButton} from "../../components/custom-button/custom-button";
import {LoginBtn, RegisterBtn} from "../../components/custom-button/btn-cfg";
import {UserService} from "../../services/user-service";
import '../pages.css'
import {RegisterPage} from "./register-page";
import {CustomSnackbar} from "../../components/custom-snackbar";
import {CustomNavbar} from "../../components/custom-navbar";

class ReservedArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginMode: true,
            formEmail: "",
            formPassword: "",
            redirect: null,
            showSnack: false,
            snackMessage: null,
            snackMode: 'success',
            isLogged: false
        }
        this.userService = new UserService()
        this.setUser = this.setUser.bind(this)
        this.setMode = this.setMode.bind(this)
        this.setSnack = this.setSnack.bind(this)
        this.flushMessage = this.flushMessage.bind(this)
    }

    componentDidMount() {
        if (window.sessionStorage.getItem("currentUser") !== null) {
            this.setState({isLogged: true})
        }
    }

    // Login Methods
    handleFormEmail(input) {
        this.setState({
            formEmail: input
        })
    }

    handleFormPassword(input) {
        this.setState({
            formPassword: input
        })
    }

    handleLogin() {
        let dontClose = false;
        if (this.state.formEmail === "") {
            console.log("E-mail empty")
            dontClose = true;
        }
        if (this.state.formPassword === "") {
            console.log("Password empty")
            dontClose = true;
        }
        if (!dontClose) {
            this.login()
        }
    }

    login() {
        this.userService.login()
            .then(users => users.data.map(loginInfo => {
            if (loginInfo.email === this.state.formEmail && loginInfo.password === this.state.formPassword) {
                this.setUser(loginInfo.id);
                return true;
            } else {
                this.setState({
                        showSnack: true,
                        snackMessage: "Error: email or password aren't valid!",
                        snackMode: "danger"
                    }, () => setTimeout(() => this.setState(prev => ({
                    showSnack: !prev.showSnack,
                })), 3000))
                return true;
            }
        }))
            .catch(error => {
                this.setState({
                    showSnack: true,
                    snackMessage: error.message,
                    snackMode: "danger"
                }, () => setTimeout(() => this.setState(prev => ({
                    showSnack: !prev.showSnack,
                })), 3000))
            })
    }

    setUser(id) {
        console.log("Setting user...")
        this.userService.getUser(id)
            .then(user => {
                window.sessionStorage.setItem("currentUser", JSON.stringify(user.data))
                console.log("Pushing mycart")
                if(user.role === "customer") {
                    this.props.history.goBack()
                } else {
                    this.props.history.push("/admin/homepage")
                }
            })
    }

    // Snack message flush after closing
    flushMessage() {
        this.setState({
            snackMessage: null
        })
    }

    // Snack data Setting
    setSnack(snackData) {
        this.setState({
            showSnack: snackData.showSnack,
            snackMessage: snackData.snackMessage,
            snackMode: snackData.snackMode
        }, () => setTimeout(() => this.setState(prev => ({
            showSnack: !prev.showSnack,
        })), 3000))
    }

    // Login / Register Switcher
    setMode() {
        console.log("Setting login mode")
        this.setState(prev => ({
            loginMode: !prev.loginMode,
            formEmail: "",
            formPassword: "",
        }))
    }

    // Show state button
    debug() {
        console.log(this.state)
    }

    render() {
        if (this.state.isLogged) {
            return (
                <div>
                    <h1>You're already logged!</h1>
                </div>
            )
        }
        if (this.state.loginMode) {
            return(
                <>
                    <CustomNavbar/>
                    <Container fluid={"sm"} className={"align-content-center mt-5"}>
                        <Card className={"text-center"}
                              bg={"light"}
                              style={{width: "50%", margin: "auto"}}
                        >
                            <Card.Body>
                                <h1><strong>Login</strong></h1>
                                <hr/>
                                <Container fluid={"sm"} style={{width: "70%"}}>
                                    <Form className={"mb-2"}>
                                        <Form.Control className={"mb-2 mt-2"}
                                                      type="text"
                                                      placeholder="E-Mail"
                                                      value={this.state.formEmail}
                                                      onChange={(event) => this.handleFormEmail(event.target.value)}
                                        />
                                        <Form.Control className={"mb-1"}
                                                      type="password"
                                                      placeholder="Password"
                                                      value={this.state.formPassword}
                                                      onChange={(event) => this.handleFormPassword(event.target.value)}
                                        />
                                        <div className={"d-flex flex-row-reverse"}>
                                            <CustomButton buttoncfg={LoginBtn} onPress={() => this.handleLogin()}/>
                                        </div>
                                    </Form>
                                </Container>
                                <hr/>
                                <p>Don't have an account?</p>
                                <CustomButton buttoncfg={RegisterBtn} onPress={() => this.setMode()}/>
                                <hr/>
                                <button onClick={() => this.debug()}>Debug</button>
                            </Card.Body>
                        </Card>
                        <CustomSnackbar show={this.state.showSnack}
                                        message={this.state.snackMessage}
                                        type={this.state.snackMode}
                                        close={() => this.flushMessage()}
                        />
                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <RegisterPage back={() => this.setMode()}
                                  setSnack={this.setSnack}
                    />
                    <CustomSnackbar show={this.state.showSnack}
                                    message={this.state.snackMessage}
                                    type={this.state.snackMode}
                                    close={() => this.flushMessage()}
                    />
                </>
            )
        }
    }
}

export {ReservedArea}
