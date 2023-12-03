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

    // libraries = [{}];
    libraries = [{
        name:"Clothes",
        cardsCount: 120,
        percent: 0
    }, {
        name:"Emotions",
        cardsCount: 100,
        percent: 21
    }, {
        name:"War",
        cardsCount: 130,
        percent: 81
    }]

    authType = 'login';

    isAuth = false;

    topUsers = [];

    mainComponents = {
        main: 1,
        chat: 2,
        library: 3,
    }

    mainComponent = this.mainComponents.main;

    isDarkMode = false;

    callbackDarkMode = [() => {},];
    callbackMainComponent = [() => {},];

    setCallbackDarkMode(callback){
        this.callbackDarkMode = [...this.callbackDarkMode, callback];
    }
    setCallbackMainComponent(callback){
        this.callbackMainComponent = [...this.callbackMainComponent, callback];
    }

    setMainComponent(mainComponent){
        this.mainComponent = mainComponent;
        this.callbackMainComponent.forEach((element) => element(this.mainComponent));
    }


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

    setDarkMode(isDarkMode){
        this.isDarkMode = isDarkMode
        this.callbackDarkMode.forEach((element) => element(this.isDarkMode));
    }

    setLibraries(libraries){
        this.libraries = libraries
    }

    addLibrary(library){
        this.libraries = [...this.libraries, library]
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