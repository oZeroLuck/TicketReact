import React from 'react'
import {EventService} from "../services/event-service";
import {CustomNavbar} from "../components/custom-navbar";
import {Container, Row} from "react-bootstrap";
import {LoadingSpinner} from "../components/loading-spinner";
import {ErrorPage} from "./error-page";
import {CustomTable} from "../components/custom-table/custom-table";
import {EventTbCfg} from "../components/custom-table/table-cfg";

class EventListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: null,
            isLoading: true,
            error: false,
            errorMsg: null
        }
        this.eventService = new EventService()
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.eventService.getEvents()
            .then(res => this.setState({
                eventList: res.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error: true,
                errorMsg: error.message,
                isLoading: false
            }))
    }

    handleClick(id, buttonLabel) {
        this.props.history.push("/event/" + id)
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <CustomNavbar/>
                    <Container fluid={"xl"}>
                        <LoadingSpinner/>
                    </Container>
                </div>
            )
        }
        if (this.state.error) {
            return (
                <div>
                    <CustomNavbar/>
                    <Container fluid={"xl"}>
                        <ErrorPage errcode={this.state.errorMsg}/>
                    </Container>
                </div>
            )
        }
        return(
            <div>
                <CustomNavbar/>
                <Container fluid={"xl"} className={"mt-lg-5 mb-lg-5"}>
                    <CustomTable dataSource={this.state.eventList}
                                 tableCfg={EventTbCfg}
                                 parentCallback={this.handleClick}
                    />
                </Container>
            </div>
        )
    }
}

export {EventListPage}
