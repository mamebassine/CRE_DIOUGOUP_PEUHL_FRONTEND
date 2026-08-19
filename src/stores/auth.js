import {defineStore} from "pinia";
import authService from "../services/authService";

export const useAuthStore = defineStore("auth",{

    state:()=>({

        token:localStorage.getItem("token") || null,

        user:JSON.parse(localStorage.getItem("user")) || null

    }),

    getters:{

        isAuthenticated:(state)=>!!state.token

    },

    actions:{

        async login(form) {

    try {

        const response = await authService.login(form);

        this.token = response.data.access_token;
        this.user = response.data.user;

        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        return response;

    } catch (error) {

        throw error;

    }

},

        async register(form){

            return await authService.register(form);

        },

        

async profile() {

    try {

        const response = await authService.profile();


        // récupérer le vrai user
        this.user = response.data.user 
            ? response.data.user 
            : response.data;


        localStorage.setItem(
            "user",
            JSON.stringify(this.user)
        );


        return response;


    } catch (error) {


        throw error;


    }

},





        async logout() {

    try {

        await authService.logout();

    } catch (error) {

        console.log("Erreur lors de la déconnexion :", error);

    }

    this.token = null;
    this.user = null;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

}

    }

});