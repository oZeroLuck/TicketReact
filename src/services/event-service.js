import axios from "axios";

class EventService {

    getFilm(id) {
        return axios.get('http://localhost:8080/film/' + id, {timeout: 10000})
    }

}

export {EventService}
