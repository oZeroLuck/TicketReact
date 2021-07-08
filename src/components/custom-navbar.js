import React from "react";
import {Link} from "react-router-dom";
import {Dropdown, Nav, Navbar} from "react-bootstrap";
import {AdministrationBtn, HomeBtn, ProfileBtn, ShoppingCartBtn} from "./custom-button/btn-cfg";
import {CustomButton} from "./custom-button/custom-button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            isAdmin: null
        }
    }

    componentDidMount() {
        const user = JSON.parse(window.sessionStorage.getItem("currentUser"))
        if(user !== null) {
            this.setState({isLogged: true, isAdmin: user.role === "admin"})
        }
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
                        {this.state.isLogged ?
                            <Dropdown className={"ml-2"}>
                                <Dropdown.Toggle variant={'warning'}>
                                    <FontAwesomeIcon icon={faUserCircle}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={"mr-xl-5"} align={"right"}>
                                    <Dropdown.Item as={Link} to={"/profile"}>
                                        Profile
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> :
                            <Link to={"/login"} className={"ml-2"}>
                                <CustomButton buttoncfg={ProfileBtn}/>
                            </Link>
                        }
                        {this.state.isAdmin ?
                            <Link to={"/admin/homepage"}>
                                <CustomButton buttoncfg={AdministrationBtn}/>
                            </Link> :
                            <Link to={"/myCart"}>
                                <Nav.Item>
                                    <CustomButton buttoncfg={ShoppingCartBtn}/>
                                </Nav.Item>
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export {CustomNavbar}
