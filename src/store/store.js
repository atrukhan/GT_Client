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

    defaultLibraries = null;
    libraries = null;
    cards = null;

    libsId = []

    defaultLibraryId = -1
    userLibraryId = -1
    trainingId = -1

    authType = 'login';

    isAuth = false;

    mainComponents = {
        allLibraries: 1,
        defaultCards: 2,
        myLibraries: 3,
        userCards: 4,
        rules: 5,
        tests: 6,
        messenger: 7,
        analytic: 9,
        settings: 10,
        training: 11,
        writingTest: 12,
        choiceTest: 13,
        listenCardTest: 14,
        listenSentenceTest: 15
    }

    mainComponent = this.mainComponents.allLibraries;

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

    setLibsId(ids){
        this.libsId = ids
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

    setDefaultLibraryId(id){
        this.defaultLibraryId = id
    }

    setUserLibraryId(id){
        this.userLibraryId = id
    }

    setTrainingId(id){
        this.trainingId = id
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
            sessionStorage.setItem("token", response.data.token)
            // sessionStorage.setItem("expires_on", response.data.expires)
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
            sessionStorage.deleteItem("token")
            this.setAuth(false)
            this.setUser({
                nickname: "",
                email: "",
                password: "",
                id: null,
                roles: [],
            })
        } catch (e) {
            // console.log(e.response?.data?.message)
        }
    }

   async getDefaultLibs(callback){
    
        try {
            const response = await axios.post('/api/user/def_libs')
            this.defautlLibraries = response.data
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
            this.libraries = [...response.data]
            
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
                this.libraries = [...this.libraries, {"id": response.data.id, "title": title, "code":response.data.code, "cardsCount": response.data.cardsCount}]
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

    async getDefaultCards(libId, callback){
        try {
            let response;
           
            response = await axios.post(`/api/user/def_lib_cards/${libId}`) 
            
            this.cards = response.data;
            callback()
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    

    async getUserCards(libId, callback){
        try {
            let response;
            
            response = await axios.post(`/api/user/user_lib_cards/${libId}`)
            
            this.cards = response.data;
            callback()
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}