import React from 'react'
import './components.css'
import {Alert, Fade} from "react-bootstrap";

function CustomSnackbar(props) {
    const type = "success"

    function chooseType() {
        if (props.type === null || props.type === undefined) {
            return type
        } else {
            return props.type
        }
    }

        return (
            <Fade in={props.show} onExited={() => props.close}>
                <div className={"center-me"}>
                    <Alert show={props.show} variant={chooseType()}>
                        <p>
                            {props.message}
                        </p>
                    </Alert>
                </div>
            </Fade>
        );
    }

export {CustomSnackbar}
