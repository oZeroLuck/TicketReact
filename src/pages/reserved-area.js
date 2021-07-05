import React from 'react'
import {Button, Container, NavDropdown} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {CustomButton} from "../components/custom-button/custom-button";
import {LoginBtn, LogoutBtn} from "../components/custom-button/btn-cfg";
import {UserService} from "../services/user-service";
import {Link, Redirect, withRouter} from "react-router-dom";

class ReservedArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            formEmail: "",
            formPassword: "",
            error: false,
            errorMsg: null,
            redirect: null
        }
        this.userService = new UserService()
        this.setUser = this.setUser.bind(this)
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

    logout() {
        console.log('Logout Works')
        window.sessionStorage.removeItem("currentUser")
        this.setState({
            isLogged: false
        })
        console.log(window.sessionStorage.getItem("currentUser"))
    };

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
                console.log(loginInfo.email)
                console.log(loginInfo.password)
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
        this.userService.getUser(id)
            .then(user => {
                window.sessionStorage.setItem("currentUser", JSON.stringify(user.data))
                this.handleLogged()
            })
    }

    handleLogged() {
        this.setState(prev => ({
            isLogged: !prev.isLogged,
            redirect: "/homepage"
        }))
    }

    debug() {
        console.log(this.state)
        this.setState({error: false, errorMsg: null})
    }

    render() {
        if (this.state.isLogged) {
            return(
                <div>
                    <Link to="/reserved/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item>
                        <CustomButton buttoncfg={LogoutBtn} onPress={() => this.logout()}/>
                    </NavDropdown.Item>
                </div>
            )
        }
        return(
            <Container>
                <Redirect to="/homepage"/>
                <strong>Login</strong>
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
                <hr/>
                <button onClick={() => this.debug()}>Debug</button>
            </Container>
        )
    }
}

export {ReservedArea}
