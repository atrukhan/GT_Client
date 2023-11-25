import { makeAutoObservable } from "mobx";
import axios from "../api/axios";

export default class Store {

    user = {
        nickname:"",
        email:"",
        password:"",
        id:null,
        roles:[],
    }

    authType = 'login'

    isAuth = false;

    topUsers = []


    constructor(){
        makeAutoObservable(this)
    }

    setAuthType(authType){
        this.authType = authType
    }

    setAuth(isAuth){
        this.isAuth = isAuth
    }

    setUser(user){
        this.user = user
    }

    setTopUsers(users){
        this.topUsers = users
    }

    async login(email, password){
        try{
            const response = await axios.post('/api/auth/signin', {"email":email, "password":password})
            localStorage.setItem("token", response.data.token)
            this.setAuth(true)
            this.setUser({"nickname":response.data.nickname, "email": response.data.email, "id": response.data.id, "roles": response.data.roles})
            
        } catch (e) {
            console.log(e.response?.data?.message)
        }
        return this.isAuth;
    }

    async registration(nickname, email, password){
        try{
            const response = await axios.post('/api/auth/signup', {"nickname": nickname, "email": email, "password": password})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try{
            const response = await axios.post('/api/auth/logout')
            localStorage.deleteItem("token")
            this.setAuth(false)
            this.setUser({
                nickname: "",
                email: "",
                password: "",
                id: null,
                roles: [],
            })
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

   async getTopUsers(){
        try {
            const response = await axios.get('/api/users/top')
            this.setTopUsers(null)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
   }
}