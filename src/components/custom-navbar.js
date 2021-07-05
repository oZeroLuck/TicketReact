import React from "react";
import {Link} from "react-router-dom";
import {Container, Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {HomeBtn, LogoutBtn, ShoppingCartBtn, SignUpBtn} from "./custom-button/btn-cfg";
import {CustomButton} from "./custom-button/custom-button";
import {ReservedArea} from "../pages/reserved-area";
import {RegisterPage} from "../pages/register-page";

class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
            showRegister: false
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister() {
        this.setState(prev => ({
            showRegister: !prev.showRegister
        }))
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand>TicketTwo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="mr-auto">
                        <Link to="/homepage">
                            <Nav.Item className="mr-2">
                                <CustomButton buttoncfg={HomeBtn}/>
                            </Nav.Item>
                        </Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning">Events</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Header>Categories</Dropdown.Header>
                                <Dropdown.Item as={Link} to="/film">Action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    <Nav className="flex flex-row-reverse">
                        <NavDropdown className={"mr-3"} id="navDrop" title="Reserved Area">
                                <div>
                                    <ReservedArea/>
                                    <hr/>
                                    <Container>
                                        <p>Don't have an account?</p>
                                        <div className={"d-flex flex-row-reverse"}>
                                            <CustomButton buttoncfg={SignUpBtn} onPress={() => this.handleRegister()}/>
                                        </div>
                                    </Container>
                                </div>
                        </NavDropdown>
                        <Link to={"/myCart"}>
                            <Nav.Item>
                                <CustomButton buttoncfg={ShoppingCartBtn}/>
                            </Nav.Item>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                <RegisterPage show={this.state.showRegister} close={this.handleRegister}/>
            </Navbar>
        );
    }
}

export {CustomNavbar}

/*
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
        this.userService = new UserService()
        this.setRegister = this.setRegister.bind(this)
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        console.log(window.sessionStorage.getItem("user"))
        if(window.sessionStorage.getItem("user") !== null) {
            this.setState({isLogged: true})
        }
    }

    login(userInfo) {
        this.userService.login(userInfo).then(response => {console.log(response)})
    }

    setRegister() {
        console.log("Called setModal")
        this.setState((previous) => {
            return (
                {showRegister: !previous.showRegister}
            )
        })
    }

    fakeLogin(input) {
        window.sessionStorage.setItem("user", input)
        this.setState(prev => ({
            isLogged: !prev.isLogged
        }))
        console.log(window.sessionStorage.getItem("user"))
    }
 */
