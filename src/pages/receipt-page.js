import {UserService} from "../services/user-service";
import React from 'react'
import {CustomNavbar} from "../components/custom-navbar";
import {Container, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {ErrorPage} from "./error-page";

class ReceiptPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: null,
            isLogged: false,
            isLoading: true,
            error: false,
            errorMsg: null,
            idMatch: false
        }
        this.userService = new UserService()
    }

    componentDidMount() {
        const user = JSON.parse(window.sessionStorage.getItem("currentUser"))
        const code = this.props.match.params.code
        if (user !== null) {
            this.userService.getUser(user.id)
                .then(u => {
                    this.userService.getReceipt(code)
                        .then(success => {
                            let receipt = null
                            if (success.data.userId === u.data.id) {
                                receipt = success.data
                            }
                            this.setState({
                                receipt: receipt,
                                isLoading: false,
                                isLogged: true,
                                idMatch: success.data.userId === u.data.id
                            })
                        })
                        .catch(error => this.setState({
                            isLoading: false,
                            error: true,
                            errorMsg: error.message
                        }))
                })
                .catch(error => {
                    console.log(error)
                    if (error.response !== undefined && error.response.status === 404) {
                        this.setState({
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false,
                            error: true,
                            errorMsg: error.message
                        })
                    }
                })
        } else {
            this.setState({
                isLoading: false
            })
        }

    }

    render() {
        if (this.state.isLoading) {
            return(
                <div>
                    <CustomNavbar/>
                    <LoadingSpinner/>
                </div>
            )
        }
        if (this.state.error) {
            return(
                <div>
                    <CustomNavbar/>
                    <ErrorPage errcode={this.state.errorMsg}/>
                </div>
            )
        }
        if (this.state.isLogged) {
            return (
                <div>
                    <CustomNavbar/>
                    <Container>
                        <h1>I'm working</h1>
                        <Row>Receipt data</Row>
                        {this.state.idMatch ?
                            <Row>
                                {this.state.receipt.id}
                            </Row> :
                            <Row>
                                Error 404
                            </Row>
                        }
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <CustomNavbar/>
                    <Container>
                        <h1>Pls login</h1>
                    </Container>
                </div>
            )
        }
    }
}

export {ReceiptPage}
