import React from 'react'
import {CustomNavbar} from "../../components/custom-navbar";
import {UserService} from "../../services/user-service";
import {LoadingSpinner} from "../../components/loading-spinner";
import {CustomTable} from "../../components/custom-table/custom-table";
import {EventTbCfg, UserTbCfg} from "../../components/custom-table/table-cfg";
import {Container} from "react-bootstrap";
import {EventService} from "../../services/event-service";
import {LocationModal} from "../../components/location-modal";

class AdminHomepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true,
            dataSource2: null,
            location: null,
            isLoadingLocation: false,
            showMdl: false
        }
        this.userService = new UserService()
        this.eventService = new EventService()
        this.handleClicked = this.handleClicked.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {
        this.userService.getUsers().then(result =>
            this.setState({dataSource: result.data}, () =>
                this.eventService.getEvents().then(data =>
                this.setState({dataSource2: data.data, isLoading: false},
                    () => console.log(this.state.dataSource2))))
        )

    }

    handleClicked(itemId, buttonType){
        console.log("Fetching location...")
        if (buttonType.trim().toLowerCase() === "info") {
            this.setState({isLoadingLocation: true}, () =>
                this.eventService.getLocation(itemId)
                    .then(response => {
                        this.setState({
                            location: response.data,
                            isLoadingLocation: false
                        }, () => this.handleModal())
                    }).catch(error => console.log(error.message))
            )
        }
    }

    handleModal() {
        this.setState(prev => ({
            showMdl: !prev.showMdl
        }), () => console.log(this.state))
    }

    render() {
        const tableCfg = new UserTbCfg()
        if(this.state.isLoading) {
            return <>
                <CustomNavbar/>
                <LoadingSpinner/>
            </>
        }
        return (
            <div>
                <LocationModal show={this.state.showMdl}
                               close={this.handleModal}
                               data={this.state.location}
                />
                <CustomNavbar/>
                <h1 className={"text-center mt-5"}>Events list</h1>
                <Container className={"mt-xl-5"}>
                    <CustomTable dataSource={this.state.dataSource} tableCfg={tableCfg}/>
                        I'm Admin Homepage and I'm working
                </Container>
                <Container>
                    {this.state.isLoadingLocation ? <LoadingSpinner/> : null}
                    <CustomTable dataSource={this.state.dataSource2}
                                 tableCfg={EventTbCfg}
                                 parentCallback={this.handleClicked}
                    />
                </Container>
            </div>
        )
    }
}

export {AdminHomepage}
