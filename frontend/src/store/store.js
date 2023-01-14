import {action, makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import API_URL from "../http";

export default class Store {
    user = {}
    isAuthenticated = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuthenticated = bool
    }

    setUser(user) {
        this.user = user
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async register(email, first_name, last_name, password) {
        try {
            const response = await AuthService.register(email, first_name, last_name, password)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            let refresh = localStorage.getItem('refreshToken')
            const response = await axios.post(`http://localhost:8001/api/token/refresh/`, {refresh})
            localStorage.setItem('accessToken', response.data.access)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }


}