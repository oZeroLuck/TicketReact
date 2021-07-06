import axios from 'axios'
import {Customer} from "./entities/customer";
import {LoginInfo} from "./entities/loginInfo";

class UserService {

    getUser(id) {
        return axios.get("http://localhost:8080/users/" + id)
    }

    getUsers() {
        return axios.get("http://localhost:8080/users")
    }

    login() {
        return axios.get("http://localhost:8080/login")
    }

// From here on, I'll simulate the back-end

    postUser(user) {
        return axios.post("http://localhost:8080/users", user)
    }

    postLogin(userInfo) {
        return axios.post("http://localhost:8080/login", userInfo)
            .then(success => {
                return {error: false, message: "Successfully created"}
            })
            .catch(error => {
                return {error: true, message: error.message}
            })
    }

    registerUser(user) {
        const newCustomer = new Customer(user)
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

export {UserService}
