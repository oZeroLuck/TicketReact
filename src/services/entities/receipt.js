class Receipt {
    constructor(ticketIds, userId) {
        this.id = null
        this.userId = userId
        this.cart = ticketIds
    }

    generateId() {
        let orderId = ''
        while(orderId.length < 16) {
            let additional = Math.floor(Math.random() * 36).toString(36)
            if (Math.floor(Math.random() * 2) === 1 && /^[a-z]/.test(additional)) {
                additional = additional.toUpperCase()
            }
            orderId += additional
        }
        return orderId
    }

    setId(id) {
        this.id = id
    }

}
export {Receipt}
