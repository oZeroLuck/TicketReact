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

}

export {UserService}
