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

    defLib = null;
    libraries = null;
    // libraries = [{
    //     id: 1,
    //     title:"Cloth33-es2",
    //     cardsCount: 120,
    //     percent: 0,
    //     cards: [{
    //         id: 1,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 2,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 3,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     }]
    // }, {
    //     id: 2,
    //     name:"Emotions",
    //     cardsCount: 100,
    //     percent: 21,
    //     cards: [{
    //         id: 1,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 2,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 3,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     }]
    // }, {
    //     id: 3,
    //     name:"War",
    //     cardsCount: 130,
    //     percent: 81,
    //     cards: [{
    //         id: 1,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 2,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     },{
    //         id: 3,
    //         value: "Elephant",
    //         translation:"Слон",
    //         example:"111111111111111   1111111111111111111111 11111111111111111111"
    //     }]
    // }]

    cards = null;

    currentLib = -1

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

   async getDefaultLibs(callback){
        try {
            const response = await axios.post('/api/user/def_libs')
            this.defLib = response.data
            this.libraries = response.data
            this.currentLib -= 1
            if(callback != undefined)
                callback(this.currentLib)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
   }

    async getUserLibs(callback){
        try {
            const response = await axios.post('/api/user/user_libs')
            this.libraries = [...this.defLib , ...response.data]
            
            this.currentLib -= 1
            console.log(this.currentLib)
            callback(this.currentLib)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async createLib(title){
        try {
            const response = await axios.post('/api/user/user_lib_create', {"title": title})
            if(response.status == 200)
                this.libraries = [...this.libraries, {"id": response.data.id, "title": title, "learnedPercentage": response.data.learnedPercentage, "code":response.data.code, "cardsCount": response.data.cardsCount, "def": response.data.isDef}]
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async createCard(libId, value, translation){
        try {
            const response = await axios.post(`/api/user/user_lib_card_create/${libId}`, {"value": value, "transcription": null, "translation": translation, "example": null})
            if(response.status == 200)
                this.cards = [...this.cards, {"id": response.data.id, "value": value, "transcription": null, "translation": translation, "example": null}]
    
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async getCards(libId, callback){
        try {
            let response;
            if(this.libraries.filter((el) => el.id == libId)[0].def == false){
                response = await axios.post(`/api/user/user_lib_cards/${libId}`)
            }else{
               response = await axios.post(`/api/user/def_lib_cards/${libId}`) 
            }
            this.cards = response.data;
            callback()
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}