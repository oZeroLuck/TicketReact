import axios from 'axios'

class TicketApi {

    getCart(id) {
        return axios.get('http://localhost:8080/cart?userId' + id)
    }

}

export {TicketApi}
