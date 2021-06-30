import axios from "axios";

class EventApi {

    getFilm(id) {
        return axios.get('http://localhost:8080/film/' + id)
    }

}

export {EventApi}
