import axios from "axios";

class EventService {

    getEvents() {
        return axios.get('http://localhost:8080/event', {timeout: 10000})
    }

    getLocation(id) {
        return axios.get('http://localhost:8080/location/' + id, {timeout: 10000})
    }

    getFeatured() {
        return axios.get('http://localhost:8080/event?featured=true', {timeout: 10000})
    }

    getEvent(id) {
        return axios.get('http://localhost:8080/event/' + id, {timeout: 10000})
    }

    getSold(id) {
        return axios.get('http://localhost:8080/soldTicket/' + id)
    }

    putSold(newValue) {
        return axios.put('http://localhost:8080/soldTicket/' + newValue.id, newValue)
    }

    subtract(ticketCount) {
        ticketCount.forEach(order => {
            this.getSold(order.ticket.id).then(res => {
                res.data[order.ticket.seat.name] += parseInt(order.count)
                this.putSold(res.data).then(success => console.log(success))
            })
        })
    }

}

export {EventService}
