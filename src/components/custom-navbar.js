import React from "react";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {HomeBtn, CarBtn, LogoutBtn, LoginBtn, SignUpBtn} from "./custom-button/btn-cfg";
import {CustomButton} from "./custom-button/custom-button";

class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    login() {
        console.log('Login Works')
        this.setState({
            isLogged: true
        })
    }

    logout() {
        console.log('Logout Works')
        this.setState({
            isLogged: false
        })
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand>TicketTwo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="mr-auto">
                        <Link to="/reserved/home">
                            <Nav.Item className="mr-2">
                                <CustomButton buttoncfg={HomeBtn}/>
                            </Nav.Item>
                        </Link>
                        <Link to="/reserved/carPark">
                            <Nav.Item>
                                <CustomButton buttoncfg={CarBtn}/>
                            </Nav.Item>
                        </Link>
                    </Nav>
                    <Nav className="flex flex-row-reverse">
                        <NavDropdown className={"mr-3"} id="navDrop" title="Reserved Area">
                            {this.state.isLogged ?
                                <div>
                                    <Link to="/reserved/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item>
                                        <CustomButton buttoncfg={LogoutBtn} onPress={() => this.logout()}/>
                                    </NavDropdown.Item>
                                </div>
                            :
                                <div>
                                    <Container>
                                        <strong>Login</strong>
                                        <Form className={"mb-2"}>
                                            <Form.Control controlId="email"
                                                          className={"mb-2 mt-2"}
                                                          type="text"
                                                          placeholder="E-Mail"
                                            />
                                            <Form.Control controlId="password"
                                                          className={"mb-1"}
                                                          type="password"
                                                          placeholder="Password"
                                            />
                                            <div className={"d-flex flex-row-reverse"}>
                                                <CustomButton buttoncfg={LoginBtn} onPress={() => this.login()}/>
                                            </div>
                                        </Form>
                                    </Container>
                                    <hr/>
                                    <Container>
                                        <p>Don't have an account?</p>
                                        <div className={"d-flex flex-row-reverse"}>
                                            <CustomButton buttoncfg={SignUpBtn}/>
                                        </div>
                                    </Container>
                                </div>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export {CustomNavbar}
