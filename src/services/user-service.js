import axios from 'axios'

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

    postUser(user) {
        return axios.post("http://localhost:8080/users", user)
    }

    postLogin(userInfo) {
        return axios.post("http://localhost:8080/login", userInfo)
    }

    registerUser(user) {
        console.log("Temporary :")
        console.log(user)
    }

}

export {UserService}
