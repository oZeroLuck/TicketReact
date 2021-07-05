import React from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import Form from "react-bootstrap/Form";
import {CustomButton} from "../components/custom-button/custom-button";
import {CancelBtn, HollowEditBtn, SaveBtn} from "../components/custom-button/btn-cfg";
import {UserService} from "../services/user-service";
import {ErrorPage} from "./error-page";
import {CustomSnackbar} from "../components/custom-snackbar";

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.userService = new UserService()
        this.state = {
            editMode: false,
            editCfg: HollowEditBtn,
            currentFirstName: null,
            currentLastName: null,
            currentEmail: null,
            currentPassword: null,
            loading: true,
            errorMsg: null,
            showSnack: false,
            snackMessage: null,
            snackMode: 'success'
        }
        this.currentUser = JSON.parse(window.sessionStorage.getItem("currentUser"))
        this.flushMessage = this.flushMessage.bind(this)
    }

    componentDidMount() {
        if (this.currentUser !== null) {
            this.userService.getUser(this.currentUser.id).then(user =>
                this.setState({
                    currentFirstName: user.data.firstName,
                    currentLastName: user.data.lastName,
                    currentEmail: user.data.email,
                    currentPassword: user.data.password,
                    loading: false
                })
            ).catch(error => this.setState({
                errorMsg: error.message
            }))
        }
    }

    handleEdit() {
        let cfg
        if(this.state.editMode) {
            cfg = HollowEditBtn
            this.setState({
                currentFirstName: this.currentUser.firstName,
                currentLastName: this.currentUser.lastName,
                currentEmail: this.currentUser.email,
                currentPassword: this.currentUser.password
            })
        } else {
            cfg = CancelBtn
        }
        this.setState(prev => ({
            editMode: !prev.editMode,
            editCfg: cfg
        }))
    }

    onFirstNameChange(input) {
        this.setState({
            currentFirstName: input
        })
    }

    onLastNameChange(input) {
        this.setState({
            currentLastName: input
        })
    }

    onEmailChange(input) {
        this.setState({
            currentEmail: input
        })
    }

    onPasswordChange(input) {
        // TODO: create a password change method
    }

    userDataEquals(newData) {
        return !(this.currentUser.id !== newData.id ||
            this.currentUser.firstName !== newData.firstName ||
            this.currentUser.lastName !== newData.lastName ||
            this.currentUser.email !== newData.email);

    }

    save() {
        console.log("Saved!")
        // Temporary Save to see if it works...
        const userData = {
            id: this.currentUser.id,
            firstName: this.state.currentFirstName,
            lastName: this.state.currentLastName,
            email: this.state.currentEmail,
        }
        if (this.userDataEquals(userData)) {
            this.setState({
                currentUser: userData,
                editMode: false,
                editCfg: HollowEditBtn,
                snackMessage: "No changes made",
                snackMode: "warning"
            }, () => this.handleSnack())
        } else {
            this.setState({
                currentUser: userData,
                editMode: false,
                editCfg: HollowEditBtn,
                snackMessage: "Changes saved!",
                snackMode: 'success'
            }, () => this.handleSnack())
        }
    }

    handleSnack() {
        console.log("HandlingSnack")
        this.setState(prev => ({
            showSnack: !prev.showSnack
        }), () => setTimeout(() =>
            this.setState(prev => ({
                showSnack: !prev.showSnack
            })), 3000))}

    flushMessage() {
        this.setState({
            snackMessage: null,
        })
    }

    back() {
        this.props.history.goBack()
    }

    render() {
        if (this.state.loading) {
            return <LoadingSpinner/>
        }
        if (this.state.errorMsg) {
            return <ErrorPage errCode={this.state.errorMsg}/>
        }
        return(
            <div className="h-100">
                <Container fluid={"sm"} className={"align-content-center mt-3"}>
                        <Card>
                            <Card.Header className={"text-center"}>
                                <Card.Title><h1>Profile</h1></Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Container>
                                    <Form>
                                        <Row>
                                            <Col className={"mr-5"}>
                                                <Form.Group>
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control type={"text"}
                                                                  disabled={!this.state.editMode}
                                                                  className={"mr-5"}
                                                                  value={this.state.currentFirstName}
                                                                  onChange={(event) =>
                                                                      this.onFirstNameChange(event.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control type={"text"}
                                                                  disabled={!this.state.editMode}
                                                                  placeholder={"Last Name"}
                                                                  value={this.state.currentLastName}
                                                                  onChange={(event) =>
                                                                      this.onLastNameChange(event.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={"mr-5"}>
                                                <Form.Group>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type={"text"}
                                                                  disabled={!this.state.editMode}
                                                                  placeholder={"First Name"}
                                                                  value={this.state.currentEmail}
                                                                  onChange={(event) =>
                                                                      this.onEmailChange(event.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col/>
                                        </Row>
                                    </Form>
                                </Container>
                            </Card.Body>
                            <Card.Footer>
                                <div className={"d-flex flex-row-reverse"}>
                                    <CustomButton buttoncfg={this.state.editCfg} onPress={() => this.handleEdit()}/>
                                    {this.state.editMode ?
                                        <div className={"mr-2"}>
                                            <CustomButton buttoncfg={SaveBtn} onPress={() => this.save()}/>
                                        </div> : null
                                    }
                                </div>
                            </Card.Footer>
                        </Card>
                </Container>
                <CustomSnackbar message={this.state.snackMessage}
                                show={this.state.showSnack}
                                close={() => this.flushMessage()}
                                type={this.state.snackMode}
                />
            </div>
        )
    }
}

export {ProfilePage}
