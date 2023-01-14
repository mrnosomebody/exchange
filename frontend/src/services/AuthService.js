import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('api/token/', {email, password})
    }

    static async register(email, first_name, last_name, password) {
        return $api.post('api/users/', {email, first_name, last_name, password})
    }
}
