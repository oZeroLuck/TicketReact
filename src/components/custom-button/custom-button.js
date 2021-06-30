import Button from 'react-bootstrap/Button';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './custom-button.css';

class CustomButton extends React.Component {

    render() {
        console.log("Hi, I'm rendering this button: " + this.props.buttoncfg.text)
        return (
            <Button variant={this.props.buttoncfg.customCssClass}
                onClick={this.props.onPress}>
                {this.props.buttoncfg ?
                    <FontAwesomeIcon icon={this.props.buttoncfg.icon}/> :
                    null
                }
                {this.props.buttoncfg.text}
            </Button>
        );
    }
}

export {CustomButton};
