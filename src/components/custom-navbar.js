import React from "react";
import {Link} from "react-router-dom";
import {Dropdown, Nav, Navbar} from "react-bootstrap";
import {HomeBtn, ProfileBtn, ShoppingCartBtn} from "./custom-button/btn-cfg";
import {CustomButton} from "./custom-button/custom-button";

class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("currentUser") !== null) {
            this.setState({isLogged: true})
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
                            <Link to={"/profile"} className={"ml-2"}>
                                <CustomButton buttoncfg={ProfileBtn}/>
                            </Link> :
                            <Link to={"/login"} className={"ml-2"}>
                                <CustomButton buttoncfg={ProfileBtn}/>
                            </Link>
                        }
                        <Link to={"/myCart"}>
                            <Nav.Item>
                                <CustomButton buttoncfg={ShoppingCartBtn}/>
                            </Nav.Item>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export {CustomNavbar}
