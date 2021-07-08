import axios from "axios";

class EventService {

    getEvents() {
        return axios.get('http://localhost:8080/event', {timeout: 10000})
    }

    getLocation(id) {
        return axios.get('http://localhost:8080/location/' + id, {timeout: 10000})
    }

    getFeatured() {
        return axios.get('http://localhost:8080/event?featured=true', {timeout: 10000})
    }

    getEvent(id) {
        return axios.get('http://localhost:8080/event/' + id, {timeout: 10000})
    }

}

export {EventService}
