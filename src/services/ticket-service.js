import axios from 'axios'

class TicketService {

    getSold(id) {
        return axios.get('http://localhost:8080/soldTicket/' + id)
    }

}

export {TicketService}
