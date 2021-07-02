import axios from 'axios'

class TicketApi {

    getCart(id) {
        return axios.get('http://localhost:8080/cart?user_id=2') //+ id)
    }

}

export {TicketApi}
