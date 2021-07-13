import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {CustomNavbar} from "../components/custom-navbar";
import {CustomButton} from "../components/custom-button/custom-button";
import {ReceiptButton} from "../components/custom-button/btn-cfg";
import {Link} from "react-router-dom";
import QRCode from 'qrcode.react';

// To test QR code use this site: https://webqr.com/

class OrderSuccessPage extends React.Component {

    render() {
        return(
            <div>
                <CustomNavbar/>
                <Container>
                    <Row className={"pt-4 pb-4"}>
                        <Col className={"text-center"}>
                            <h1 style={{fontSize: "xxx-large"}}>Success</h1>
                        </Col>
                    </Row>
                </Container>
                    <Container fluid style={{backgroundColor: "#cccccc"}}>
                        <Row className={"pt-3"}>
                            <Col>
                                <Row className={"pb-1"}>
                                    <h2>Your order's QR Code</h2>
                                </Row>
                                <Row>
                                    <Card body style={{width: "fit-content", margin: "auto"}}>
                                        <QRCode value={"http://localhost:3000/receipt/" + this.props.match.params.code}
                                                size={"256"}
                                        />
                                    </Card>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"justify-content-center"}>
                                <Row>
                                    Click here to see your receipt
                                </Row>
                                <Row>
                                    <Link to={"/receipt/" + this.props.match.params.code}>
                                        <CustomButton buttoncfg={ReceiptButton}/>
                                    </Link>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
            </div>
        )
    }
}

export {OrderSuccessPage}
