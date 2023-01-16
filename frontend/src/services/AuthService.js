import $api from "../http";
import axios from "axios";

export default class AuthService {
    static async login(email, password) {
        return $api.post('api/token/', {email, password})
    }

    static async register(email, first_name, last_name, password) {
        return axios.post('http://localhost:8001/api/users/', {email, first_name, last_name, password})
    }
}
