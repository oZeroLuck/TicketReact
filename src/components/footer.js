import {Container, Row} from "react-bootstrap";

function Footer() {
    return (
        <Container fluid>
            <Row style={{backgroundColor: "#343a40", color: "white"}}
                 className={"pt-3 pl-4 pr-4"}
            >
                <p>Text text text</p>
            </Row>
        </Container>
    )
}

export {Footer}
