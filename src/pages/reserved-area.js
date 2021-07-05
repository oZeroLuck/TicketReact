import React from 'react'
import {Card, Container, NavDropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {CustomButton} from "../components/custom-button/custom-button";
import {LoginBtn, LogoutBtn, RegisterBtn, SignUpBtn} from "../components/custom-button/btn-cfg";
import {UserService} from "../services/user-service";
import {Link} from "react-router-dom";
import './pages.css'
import {RegisterPage} from "./register-page";

class ReservedArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginMode: true,
            formEmail: "",
            formPassword: "",
            error: false,
            errorMsg: null,
            redirect: null
        }
        this.userService = new UserService()
        this.setUser = this.setUser.bind(this)
        this.setMode = this.setMode.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        console.log("Hello, I'm reserved area!")
        console.log("Current sessionStorage: " + window.sessionStorage.getItem("currentUser"))
        console.log("The !== null is: " + (window.sessionStorage.getItem("currentUser") !== null))
        if (window.sessionStorage.getItem("currentUser") !== null) {
            this.setState({isLogged: true})
        }
        console.log("Current state: " + this.state.isLogged)
    }

    handleFormEmail(input) {
        this.setState({
            formEmail: input
        }, () => console.log("Email input: " + this.state.formEmail))
    }

    handleFormPassword(input) {
        this.setState({
            formPassword: input
        }, () => console.log("Password input: " + this.state.formPassword))
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
                        error: true,
                        errorMsg: "Error: email or password aren't valid!"
                    })
                return true;
            }
        }))
            .catch(error => {
                this.setState({
                    error: true,
                    errorMsg: error.message
                })
            })
    }

    setUser(id) {
        console.log("Setting user...")
        this.userService.getUser(id)
            .then(user => {
                window.sessionStorage.setItem("currentUser", JSON.stringify(user.data))
                this.handleLogged()
                console.log("Pushing mycart")
                this.props.history.push('/myCart')
            })
    }

    handleLogged() {
        this.setState(prev => ({
            formEmail: "",
            formPassword: ""
        }))
    }

    handleRegister(newUser) {
        console.log("Registered :")
        console.log(newUser)
    }

    setMode() {
        console.log("Setting login mode")
        this.setState(prev => ({
            loginMode: !prev.loginMode
        }))
    }

    debug() {
        console.log(this.state)
        this.setState({error: false, errorMsg: null})
    }

    render() {
        if (this.state.loginMode) {
            return(
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
                </Container>
            )
        } else {
            return (
                <RegisterPage back={() => this.setMode} register={() => this.handleRegister} />
            )
        }
    }
}

export {ReservedArea}
