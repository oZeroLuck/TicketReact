import axios from 'axios'
import {Customer} from "./entities/customer";
import {LoginInfo} from "./entities/loginInfo";
import {Receipt} from "./entities/receipt";

class UserService {

    getUser(id) {
        return axios.get("http://localhost:8080/users/" + id)
    }

    login() {
        return axios.get("http://localhost:8080/login")
    }

    updateUserInfo(userInfo) {
        return axios.put("http://localhost:8080/users/" + userInfo.id, userInfo).then(
            _ => this.putLogin(userInfo)
        )
    }

    getReceipt(id) {
        return axios.get("http://localhost:8080/receipt/" + id)
    }

    postReceipt(receipt) {
        return axios.post("http://localhost:8080/receipt", receipt, {timeout: 10000})
    }

    setReceipt(receipt) {
        let flag = true
        while(flag) {
            const id = receipt.generateId()
            this.getReceipt().catch(error => {
                if (error.code === 404) {
                    receipt.setId(id)
                    flag = false
                }
            })
        }
        return receipt
    }

    generateReceipt(cart, userId) {
        let receipt = new Receipt(cart, userId)
        receipt = this.setReceipt(receipt)
        return this.postReceipt(receipt)
    }

// From here on, I'll simulate the back-end

    putLogin(userInfo) {
        const loginInfo = new LoginInfo(userInfo)
        return axios.put("http://localhost:8080/login/" + userInfo.id, loginInfo)
    }

    postUser(user) {
        return axios.post("http://localhost:8080/users", user)
    }

    postLogin(userInfo) {
        return axios.post("http://localhost:8080/login", userInfo)
            .then(_ => {
                return {error: false, message: "Successfully registered"}
            })
            .catch(error => {
                return {error: true, message: error.message}
            })
    }

    registerUser(user) {
        const newCustomer = new Customer(user)
        return this.checkUser(newCustomer).then(result => {
                if (result.message) {
                    return {error: true, message: result.message}
                } else if(result) {
                    return {error: true, message: "Email already registered"}
                } else {
                    return this.postUser(newCustomer)
                        .then(success => {
                                const loginInfo = new LoginInfo(success.data)
                                return this.postLogin(loginInfo)
                            }
                        ).catch(error => {
                            return {error: true, message: error.message}
                        })
                }
            }
        )
    }

    checkUser(userInfo) {
        return this.login().then(res => {
            let error = false
            res.data.map(
                loginInfo => {
                    if (loginInfo.email === userInfo.email) {
                        error = true
                    }})
                return error
        }).catch(_ => { return {message: "Something went wrong"}})
    }

    // Cart managing (It's supposed to be back end)

}

export {UserService}
