import Button from 'react-bootstrap/Button';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './custom-button.css';

class CustomButton extends React.Component {

    render() {
        return (
            <Button variant={this.props.buttoncfg.customCssClass}
                onClick={this.props.onPress}>
                {this.props.buttoncfg.icon ?
                    <FontAwesomeIcon icon={this.props.buttoncfg.icon} className={"mr-2"}/> :
                    null
                }
                {this.props.buttoncfg.text ?
                    this.props.buttoncfg.text :
                    null
                }
            </Button>
        );
    }
}

export {CustomButton};
