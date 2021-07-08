import React from 'react'
import {CustomNavbar} from "../../components/custom-navbar";
import {LoadingSpinner} from "../../components/loading-spinner";
import {CustomTable} from "../../components/custom-table/custom-table";
import {EventTbCfg} from "../../components/custom-table/table-cfg";
import {Container} from "react-bootstrap";
import {EventService} from "../../services/event-service";
import {TicketService} from "../../services/ticket-service";
import {InfoModalComponent} from "../../components/info-modal-component";

class AdminHomepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingLocation: false,
            showMdl: false,
            modalData: null
        }
        this.eventService = new EventService()
        this.ticketSercive = new TicketService()
        this.handleClicked = this.handleClicked.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    componentDidMount() {
        this.eventService.getEvents().then(data =>
            this.setState({dataSource: data.data, isLoading: false},
                () => console.log(this.state.dataSource)))

    }

    getImage(id) {
        const event = this.state.dataSource.find(ev => ev.id === id)
        console.log("image link :" + event.link)
        return event.link
    }

    handleClicked(itemId, buttonType){
        console.log("Fetching location..." + itemId)
        if (buttonType.trim().toLowerCase() === "info") {
            this.setState({isLoadingLocation: true}, () =>
                this.eventService.getLocation(itemId)
                    .then(response => {
                        this.ticketSercive.getSold(itemId)
                            .then(tickets => {
                                const path = this.getImage(itemId)
                                this.setState({
                                    isLoadingLocation:false,
                                    modalData: {
                                        imagePath: path,
                                        location: response.data,
                                        soldTicket: tickets.data,
                                        error: false,
                                        errorMsg: null
                                    }
                                }, () => this.handleModal())})
                            .catch(error => {
                                this.setState({
                                    isLoadingLocation:false,
                                    modalData: {
                                        imagePath: null,
                                        location: null,
                                        soldTicket: null,
                                        error: true,
                                        errorMsg: error.message
                                    }
                                }, () => this.handleModal())})
                    }).catch(error => {
                        this.setState({
                            isLoadingLocation:false,
                            modalData: {
                                location: null,
                                soldTicket: null,
                                error: true,
                                errorMsg: error.message
                            }
                }, () => this.handleModal())})
            )
        }
    }

    handleModal() {
        this.setState(prev => ({
            showMdl: !prev.showMdl
        }), () => {
            if (!this.state.showMdl) {
                this.setState({
                    modalData: null
                })
            }
        })
    }

    render() {
        if(this.state.isLoading) {
            return <>
                <CustomNavbar/>
                <LoadingSpinner/>
            </>
        }
        return (
            <div style={{height: "100%"}} className={"mb-5"}>
                {this.state.modalData ?
                    <InfoModalComponent show={this.state.showMdl}
                                        close={this.handleModal}
                                        data={this.state.modalData}/> : null}
                <CustomNavbar/>
                <h1 className={"text-center mt-5 mb-5"}>Events list</h1>
                <Container>
                    {this.state.isLoadingLocation ? <LoadingSpinner/> : null}
                    <CustomTable dataSource={this.state.dataSource}
                                 tableCfg={EventTbCfg}
                                 parentCallback={this.handleClicked}
                    />
                </Container>
            </div>
        )
    }
}

export {AdminHomepage}
