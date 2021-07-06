import {Container, Row} from "react-bootstrap";
import {CustomNavbar} from "../components/custom-navbar";
import React from "react";

function ErrorPage(props) {
        return (
            <>
                <CustomNavbar/>
                <Container fluid={"lg"}>
                    <Row className={"justify-content-center mb-4"}>
                        <img src={"https://media.giphy.com/media/nVTa8D8zJUc2A/giphy.gif"}
                             alt={"Error gif"}
                        />
                    </Row>
                    <Row className={"justify-content-center"}>
                        <h1 style={{fontSize: "xxx-large"}}>Oh No</h1>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <h1>It seems that you've encountered a problem!</h1>
                    </Row>
                    <Row className={"justify-content-center mb-3"}>
                        <h1>{props.errCode}</h1>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <p style={{textAlign: "center"}}>You might want to refresh the page to try again</p>
                    </Row>
                    <Row className={"justify-content-center"}>
                        <p>Maybe contact the site admin?</p>
                    </Row>
                </Container>
            </>
        )
}

export {ErrorPage}
