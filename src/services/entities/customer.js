class Customer {
    constructor(userInfo) {
        this.id = null;
        this.firstName = userInfo.firstName
        this.lastName = userInfo.lastName
        this.email = userInfo.email
        this.password = userInfo.password
        this.role = "customer"
    }
}

export {Customer}
