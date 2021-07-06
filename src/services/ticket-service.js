import axios from 'axios'

class TicketService {

    getCart(id) {
        return axios.get('http://localhost:8080/cart/' + id)
    }

    getSold(id) {
        return axios.get('http://localhost:8080/soldTicket/' + id)
    }

}

export {TicketService}
