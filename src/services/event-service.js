import axios from "axios";

class EventService {

    getFilm(id) {
        return axios.get('http://localhost:8080/film/' + id, {timeout: 10000})
    }

    getEvents() {
        return axios.get('http://localhost:8080/event?', {timeout: 10000})
    }

    getLocation(id) {
        return axios.get('http://localhost:8080/location/' + id, {timeout: 10000})
    }

}

export {EventService}
