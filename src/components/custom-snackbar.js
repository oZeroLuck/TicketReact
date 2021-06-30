import React from 'react'
import './components.css'
import {Alert, Fade} from "react-bootstrap";

function CustomSnackbar(props) {

        return (
            <Fade in={props.show} onExited={() => props.close}>
                <div className={"center-me"}>
                    <Alert show={props.show} variant="success">
                        <p>
                            {props.message}
                        </p>
                    </Alert>
                </div>
            </Fade>
        );
    }

export {CustomSnackbar}
